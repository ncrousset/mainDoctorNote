from django.http import response
from api.views import medical_history, patient
from rest_framework.test import APIClient

from api.models import Patient, MedicalHistory

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

def client_local():

    client = APIClient(enforce_csrf_checks=True)

    response = client.post(reverse('login'), {
        'username': 'testuser', 'password': 'test'
    })

    client.credentials(
        HTTP_AUTHORIZATION='Token ' + response.data['token'])

    return client

def create_user(username = 'testuser', email='email'):
    return get_user_model().objects.create_user(
            username=username,
            email=email,
            password='test')

def create_patient(user, deleted=False):
     return Patient.objects.create(
            first_name='Natanael', last_name='Acosta', 
            sex='m', user=user, deleted=deleted)

def create_medical_history(patient, deleted=False, date='2019-12-30'):
    return MedicalHistory.objects.create(
            title= 'title', content='content',
            date=date, patient=patient, deleted=deleted)


class MedicalHistoryListCreateTest(TestCase):
    
    def setUp(self):
        self.user = create_user()
        self.client = client_local()

        self.patient = create_patient(self.user)
        create_medical_history(self.patient)

    def test_user_get_list_medical_history(self):
        url = '/api/patient/' + str(self.patient.id ) + '/medical-history'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['data'][0]['title'], 'title')

    def test_the_list_medical_history_order_by_date(self):
        create_medical_history(self.patient, date='2021-09-30')

        url = '/api/patient/' + str(self.patient.id ) + '/medical-history'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(data['data'][0]['date'], '2021-09-30')

    def test_user_cannot_see_medical_history_on_patient_was_deleted(self):
        patient = create_patient(self.user, True)
        create_medical_history(patient)

        url = '/api/patient/' + str(patient.id ) + '/medical-history'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 400)

    def test_user_cannot_see_medical_history_deleted(self):
        patient = create_patient(self.user)
        create_medical_history(patient, True)

        url = '/api/patient/' + str(patient.id ) + '/medical-history'
        response = self.client.get(url)

        data = response.json()

        self.assertEqual(data['total'], 0)

    def test_user_can_add_medical_history(self):

        url = '/api/patient/' + str(self.patient.id ) + '/medical-history'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)

    def test_if_patient_was_deleted_cannot_add_medical_history(self):
        patient = create_patient(self.user, True)

        url = '/api/patient/' + str(patient.id ) + '/medical-history'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 400)

    def test_only_owner_user_of_patient_can_see_list(self):
        """
        The user can only view their patients
        """
        user = get_user_model().objects.create_user(
            username='testuser_2',
            email='testuser_2@gmail.com',
            password='test'
        )

        patient = create_patient(user)

        url = '/api/patient/' + str(patient.id ) + '/medical-history'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 400)

    
    def test_only_owner_user_of_patient_can_add(self):
        patient = create_patient(create_user('other', 'other@gmail.com'))

        url = '/api/patient/' + str(patient.id ) + '/medical-history'

        data = {
            'title': 'Pedro',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)


class MedicalHistoryDetailTest(TestCase):
    
    def setUp(self):
        self.user = create_user()
        # self.other_user = create_user()

        self.client = client_local()

        # self.patient = create_patient(self.user)

    def test_user_can_update(self):
        medical_history = create_medical_history(create_patient(self.user))

        data = {
            'title': 'Test Update', 
            'content': 'Lopez', 
            'date': '2001-02-15'
        }
        response = self.client.put(medical_history.get_absolute_url(), data)

        medical_history = MedicalHistory.objects.get(pk=medical_history.id)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(medical_history.title, 'Test Update')

    def test_user_can_delete(self):
        medical_history = create_medical_history(create_patient(self.user))
        response = self.client.delete(medical_history.get_absolute_url())

        medical_history = MedicalHistory.objects.get(pk=medical_history.id)

        self.assertEqual(response.status_code, 204)
        self.assertTrue(medical_history.deleted)

    def test_only_owner_user_of_patient_can_update(self):
        patient = create_patient(create_user('other', 'other@gmail.com'))
        medical_history = create_medical_history(patient)

        data = { 'title': 'Test Update', 'content': 'Lopez', 'date': '2001-02-15'}

        response = self.client.put(medical_history.get_absolute_url(), data)

        self.assertEqual(response.status_code, 400)

    def test_only_owner_user_of_patient_can_delete(self):
        patient = create_patient(create_user('other', 'other@gmail.com'))
        medical_history = create_medical_history(patient)

        response = self.client.delete(medical_history.get_absolute_url())

        self.assertEqual(response.status_code, 400)

    def test_if_patient_was_deleted_cannot_update(self):
        medical_history = create_medical_history(create_patient(self.user, True))

        data = {
            'title': 'Test Update',
            'content': 'Lopez',
            'date': '2001-02-15'
        }

        response = self.client.put(medical_history.get_absolute_url(), data)

        self.assertEqual(response.status_code, 400)

    def test_if_patient_was_deleted_cannot_delete(self):
        medical_history = create_medical_history(create_patient(self.user, True))

        response = self.client.delete(medical_history.get_absolute_url())

        self.assertEqual(response.status_code, 400)

