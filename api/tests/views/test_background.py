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


class BackgroundListCreateTest(TestCase):
    
    def setUp(self):

        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = client_local()

        self.patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            user_id=self.user
        )

        Background.objects.create(
            title='test',
            content='test',
            date='1922-12',
            patient=self.patient
        )

    def test_user_get_list_background(self):

        url = '/api/patient/' + str(self.patient.id ) + '/background'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['data'][0]['title'], 'test')

    def test_the_list_background_order_by_date(self):

        Background.objects.create(
            title='test last',
            content='test',
            date='2015-12',
            patient=self.patient
        )

        url = '/api/patient/' + str(self.patient.id ) + '/background'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(data['data'][0]['title'], 'test last')

    def test_user_cannot_see_background_on_patient_was_deleted(self):
        patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            deleted=True,
            user_id=self.user
        )

        Background.objects.create(title='test', content='test', date='2015-12', patient=patient)

        url = '/api/patient/' + str(patient.id ) + '/background'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 400)

    def test_user_cannot_see_background_deleted(self):
        patient = Patient.objects.create(
            first_name='Natanael', last_name='Acosta', sex='m', user_id=self.user
        )

        Background.objects.create(title='test', content='test', date='2015-12', deleted=True, patient=patient)

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
        patient = Patient.objects.create(
            first_name='Natanael', last_name='Acosta', 
            sex='m', user_id=self.user, deleted=True
        )

        url = '/api/patient/' + str(patient.id ) + '/background'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 400)

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

        data = {
            'title': 'Test Update',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.put(self.background.get_absolute_url(), data)

        background = Background.objects.get(pk=self.background.id)

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
