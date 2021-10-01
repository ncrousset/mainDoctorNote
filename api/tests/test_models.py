from django.db import models
from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import MedicalStudy, MedicalTreatment, Patient, Background, MedicalHistory
from django.urls import reverse

def create_user():
    return get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test')

def create_patient(user):
    return Patient.objects.create(
            first_name='Natanael',
            last_name='Acosta',
            sex='m',
            user_id=user)

class PatientTest(TestCase):

    def setUp(self):
        self.patient = create_patient(create_user())

    def test_object_name_is_last_name_comma_first_name(self):
        expected_object_name = f'{self.patient.first_name} {self.patient.last_name}'
        self.assertEquals(expected_object_name, str(self.patient))

    def test_get_absolute_url(self):
        self.assertEqual(self.patient.get_absolute_url(),
                         reverse('patient', kwargs={"pk": self.patient.id}))

    def test_get_sex_title(self):
        sex_title = {'m': 'masculine',
                     'f': 'feminine',
                     'o': 'other'}

        if self.patient.sex == '':
            expected = ''
        else:
            expected = sex_title[self.patient.sex]

        self.assertEqual(expected, self.patient.sex_title)

    def test_get_full_name(self):
        self.assertEqual(
            f'{self.patient.first_name} {self.patient.last_name}', self.patient.full_name)


class BackgroundTest(TestCase):
    def setUp(self):
        self.background = Background.objects.create(
            title='Background title',
            content='Hola ',
            patient=create_patient(create_user())
        )

    def test_object_name_is_title(self):
        self.assertEquals(self.background.title, 'Background title')

    def test_get_absolute_url(self):
        self.assertEqual(self.background.get_absolute_url(), 
        '/api/patient/background/' + str(self.background.id))

class MedicalHistoryTest(TestCase):
    def setUp(self):
        self.medical_history = MedicalHistory.objects.create(
            title='Medical history',
            content='Hola ',
            patient=create_patient(create_user())
        )

    def test_object_name_is_title(self):
        self.assertEquals(self.medical_history.title, 'Medical history')

    def test_get_absolute_url(self):
        self.assertEqual(self.medical_history.get_absolute_url(), 
        '/api/patient/medical-history/' + str(self.medical_history.id))

class MedicalStudyTest(TestCase):
    def setUp(self):
        self.medical_study = MedicalStudy.objects.create(
            title='Medical study',
            content='Hola ',
            patient=create_patient(create_user())
        )

    def test_object_name_is_title(self):
        self.assertEquals(self.medical_study.title, 'Medical study')

    def test_get_absolute_url(self):
        self.assertEqual(self.medical_study.get_absolute_url(), 
        '/api/patient/medical-study/' + str(self.medical_study.id))


class MedicalTreatmentTest(TestCase):
    def setUp(self):
        self.medical_treatment = MedicalTreatment.objects.create(
            title='Medical treatment',
            content='Hola ',
            patient=create_patient(create_user())
        )

    def test_object_name_is_title(self):
        self.assertEquals(self.medical_treatment.title, 'Medical treatment')

    def test_get_absolute_url(self):
        self.assertEqual(self.medical_treatment.get_absolute_url(), 
        '/api/patient/medical-treatment/' + str(self.medical_treatment.id))