from django.http import response
from django.test import TestCase, Client
from django.contrib.auth import authenticate, get_user_model
from django.urls import reverse
from api.models import Patient
from django.test.client import MULTIPART_CONTENT, BOUNDARY, encode_multipart
from faker import Faker
import random
from django.utils import timezone

from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


def create_patients_for_test(user):
    faker = Faker()
    Patient.objects.create(
        first_name=faker.first_name(),
        last_name=faker.last_name(),
        birth_date=faker.date_of_birth(
            tzinfo=None, minimum_age=0, maximum_age=80),
        email=faker.email(),
        insurance=random.randrange(1000000, 9999999),
        idd=random.randrange(1000000, 9999999),
        phone=faker.phone_number()[:12],
        sex=random.choice(['m', 'f', 'o']),
        next_appointment=timezone.datetime(2050, 1, 30, 10, 0, 0),
        user_id=user
    )


class PatientListTest(TestCase):

    def setUp(self):

        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        self.client = APIClient(enforce_csrf_checks=False)

        response = self.client.post(reverse('login'), {
            'username': 'testuser', 'password': 'test'
        })

        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + response.data['token'])

        self.patient = Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            next_appointment=timezone.datetime(2050, 1, 30, 10, 0, 0),
            user_id=self.user
        )

        for _ in range(20):
            create_patients_for_test(self.user)

    def test_user_can_see_list_patient(self):
        response = self.client.get(reverse('patients'))
        self.assertEqual(response.status_code, 200)

    def test_user_can_filter_patients(self):
        response = self.client.get(reverse('patients') + '?q=acosta')
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['first_name'], self.patient.first_name)

    def test_user_can_get_for_page(self):
        response = self.client.get(reverse('patients') + '?p=1')
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 10)

        response = self.client.get(reverse('patients') + '?p=3')
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(len(data), 1)

    def test_list_order_by_next_appointment(self):
        Patient.objects.create(
            first_name='Pancho',
            last_name='Villa',
            birth_date='2021-05-18',
            email='natanael926@gmail.com',
            insurance='454555',
            idd='545456',
            phone='5454545',
            sex='m',
            next_appointment=timezone.now(),
            user_id=self.user
        )

        response = self.client.get(reverse('patients') + '?p=1')
        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertEqual(data[0]['first_name'], 'Pancho')


#     def test_user_can_create_a_patient(self):
#         data = {
#             'first_name': 'Pedro',
#             'last_name': 'Lopez',
#             'birth_date': '2001-02-15',
#             'email': 'estephany@gmail.com',
#             'insurance': '121542',
#             'idd': '45545',
#             'phone': '80954855',
#             'sex': 'm',
#             'next_appointment': '2021-11-20'
#         }

#         response = self.client.post(reverse('patients'), data)

#         self.assertEqual(response.status_code, 201)


# class PatientDetailTest(TestCase):

#     def setUp(self):

#         self.user = get_user_model().objects.create_user(
#             username='testuser',
#             email='testuser@gmail.com',
#             password='test'
#         )

#         self.client = Client(enforce_csrf_checks=False)
#         self.client.login(username='testuser', password='test')

#         self.patient = Patient.objects.create(
#             first_name='Natanael',
#             last_name='Acosta',
#             birth_date='2021-05-18',
#             email='natanael926@gmail.com',
#             insurance='454555',
#             idd='545456',
#             phone='5454545',
#             sex='m',
#             next_appointment='2021-05-18',
#             user_id=self.user
#         )

#     def test_user_can_see_detail_patient(self):
#         response = self.client.get(
#             reverse('patient', kwargs={"pk": self.patient.id})
#         )

#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data['first_name'], 'Natanael')
#         self.assertEqual(response.data['last_name'], 'Acosta')
#         self.assertEqual(response.data['birth_date'], '2021-05-18')

#     def test_user_can_edit_patient(self):

#         data = {
#             'first_name': 'Pedro 2',
#             'last_name': 'Lopez',
#             'birth_date': '2001-02-15',
#             'email': 'estephany@gmail.com',
#             'insurance': '121542',
#             'idd': '45545',
#             'phone': '80954855',
#             'sex': 'm',
#             'next_appointment': '2021-11-20'
#         }

#         url = '/api/patients/' + str(self.patient.id) + '/'
#         response = self.client.put(url,
#                                    content_type=MULTIPART_CONTENT,
#                                    data=encode_multipart(BOUNDARY, data),)

#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data['first_name'], 'Pedro 2')
