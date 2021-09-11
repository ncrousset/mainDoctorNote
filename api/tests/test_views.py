from django.http import response
from django.test import TestCase, Client
from django.contrib.auth import authenticate, get_user_model
from django.urls import reverse
from api.models import Patient
from django.test.client import MULTIPART_CONTENT, BOUNDARY, encode_multipart


class PatientListTest(TestCase):

    def setUp(self):

        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = Client(enforce_csrf_checks=False)
        self.client.login(username='testuser', password='test')

        self.patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            next_appointment='2021-05-18',
            user_id=self.user
        )

    def test_user_can_see_list_patient(self):
        response = self.client.get(reverse('patients'))
        self.assertEqual(response.status_code, 200)

    def test_user_can_create_a_patient(self):
        data = {
            'first_name': 'Pedro',
            'last_name': 'Lopez',
            'birth_date': '2001-02-15',
            'email': 'estephany@gmail.com',
            'insurance': '121542',
            'idd': '45545',
            'phone': '80954855',
            'sex': 'm',
            'next_appointment': '2021-11-20'
        }

        response = self.client.post(reverse('patients'), data)

        self.assertEqual(response.status_code, 201)


class PatientDetailTest(TestCase):

    def setUp(self):

        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = Client(enforce_csrf_checks=False)
        self.client.login(username='testuser', password='test')

        self.patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            next_appointment='2021-05-18',
            user_id=self.user
        )

    def test_user_can_see_detail_patient(self):
        response = self.client.get(
            reverse('patient', kwargs={"pk": self.patient.id})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], 'Natanael')
        self.assertEqual(response.data['last_name'], 'Acosta')
        self.assertEqual(response.data['birth_date'], '2021-05-18')

    def test_user_can_edit_patient(self):

        data = {
            'first_name': 'Pedro 2',
            'last_name': 'Lopez',
            'birth_date': '2001-02-15',
            'email': 'estephany@gmail.com',
            'insurance': '121542',
            'idd': '45545',
            'phone': '80954855',
            'sex': 'm',
            'next_appointment': '2021-11-20'
        }

        url = '/api/patients/' + str(self.patient.id) + '/'
        response = self.client.put(url,
                                   content_type=MULTIPART_CONTENT,
                                   data=encode_multipart(BOUNDARY, data),)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], 'Pedro 2')
