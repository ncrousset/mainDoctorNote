from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Patient, Background
from django.urls import reverse


class PatientTest(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        Patient.objects.create(
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
        self.patient = Patient.objects.last()

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
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test'
        )

        Patient.objects.create(
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
    
        Background.objects.create(
            title='Background title',
            content='Hola ',
            patient=Patient.objects.last()
        )

        self.background = Background.objects.last()

    def test_object_name_id_title(self):
        self.assertEquals(self.background.title, 'Background title')

    def test_get_absolute_url(self):
        self.assertEqual(self.background.get_absolute_url(), 
        '/api/patient/background/' + str(self.background.id))
