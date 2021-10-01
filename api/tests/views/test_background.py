from api.views import background
from datetime import date
from django.http import response
from django.test import TestCase, Client
from django.contrib.auth import authenticate, get_user_model
from django.urls import reverse
from api.models import Patient, Background
from django.test.client import MULTIPART_CONTENT, BOUNDARY, encode_multipart
from faker import Faker
import random

from django.utils import timezone

from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


def client_local():

    client = APIClient(enforce_csrf_checks=True)

    response = client.post(reverse('login'), {
        'username': 'testuser', 'password': 'test'
    })

    client.credentials(
        HTTP_AUTHORIZATION='Token ' + response.data['token'])

    return client

def create_patient(user, deleted=False):
     return Patient.objects.create(
            first_name='Natanael', last_name='Acosta', 
            sex='m', user_id=user, deleted=deleted)

def create_background(patient, deleted=False, date='2019-12'):
    return Background.objects.create(
            title= 'title', content='content',
            date=date, patient=patient, deleted=deleted)

class BackgroundListCreateTest(TestCase):
    
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = client_local()

        self.patient = create_patient(self.user)
        create_background(self.patient)

    def test_user_get_list_background(self):
        url = '/api/patient/' + str(self.patient.id ) + '/background'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['data'][0]['title'], 'title')

    def test_the_list_background_order_by_date(self):
        create_background(self.patient, date='2020-12')

        url = '/api/patient/' + str(self.patient.id ) + '/background'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(data['data'][0]['date'], '2020-12')

    def test_user_cannot_see_background_on_patient_was_deleted(self):
        patient = create_patient(self.user, True)
        create_background(patient)

        url = '/api/patient/' + str(patient.id ) + '/background'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 400)

    def test_user_cannot_see_background_deleted(self):
        patient = create_patient(self.user)
        create_background(patient, True)

        url = '/api/patient/' + str(patient.id ) + '/background'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(data['total'], 0)

    def test_user_can_add_background(self):

        url = '/api/patient/' + str(self.patient.id ) + '/background'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)

    def test_if_patient_was_deleted_cannot_add_background(self):
        patient = create_patient(self.user, True)

        url = '/api/patient/' + str(patient.id ) + '/background'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 400)

    # def test_validate_format_of_date(self):
    #     """ The validate format are YYYY-MM and YYYY"""
    #     url = '/api/patient/' + str(self.patient.id ) + '/background'

    #     data = {
    #         'title': 'Pedro',
    #         'content': 'Lopez',
    #         'date': '2001-02-15'
    #     }

    #     response = self.client.post(url, data)

    #     self.assertEqual(response.status_code, 201)
        
    #     pass

class BackgroundDetailTest(TestCase):
    
    def setUp(self):

        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        other_user = get_user_model().objects.create_user(
            username='other',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = client_local()

        self.patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            sex='m',
            user_id=self.user
        )

        other_patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            sex='m',
            user_id=other_user
        )

        self.background = Background.objects.create(
            title='test',
            content='test',
            date='1922-12',
            patient=self.patient
        )

        self.other_background = Background.objects.create(
            title='test',
            content='test',
            date='1922-12',
            patient=other_patient
        )

    def test_user_can_update_background(self):

        background = create_background(create_patient(self.user))

        data = {'title': 'Test Update', 'content': 'Lopez', 'date': '2001-02-15'}
        response = self.client.put(background.get_absolute_url(), data)

        background = Background.objects.get(pk=background.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(background.title, 'Test Update')

    def test_user_can_delete_background(self):
        response = self.client.delete(self.background.get_absolute_url())

        background = Background.objects.get(pk=self.background.id)

        self.assertEqual(response.status_code, 204)
        self.assertTrue(background.deleted)

    def test_only_owner_user_of_patient_can_update(self):
        data = { 'title': 'Test Update', 'content': 'Lopez', 'date': '2001-02-15'}

        response = self.client.put(self.other_background.get_absolute_url(), data)

        self.assertEqual(response.status_code, 400)

    def test_only_owner_user_of_patient_can_delete(self):
        response = self.client.delete(self.other_background.get_absolute_url())

        self.assertEqual(response.status_code, 400)

    def test_if_patient_was_deleted_cannot_update_background(self):
        background = create_background(create_patient(self.user, True))

        data = {
            'title': 'Test Update',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.put(background.get_absolute_url(), data)

        self.assertEqual(response.status_code, 400)

    def test_if_background_was_deleted_cannot_update(self):
        background = create_background(create_patient(self.user), True)

        data = {
            'title': 'Test Update',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.put(background.get_absolute_url(), data)

        self.assertEqual(response.status_code, 400)

    def test_if_patient_was_deleted_cannot_delete_background(self):
        background = create_background(create_patient(self.user), True)

        response = self.client.delete(background.get_absolute_url())

        self.assertEqual(response.status_code, 400)

    