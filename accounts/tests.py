from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from django.urls import reverse

from django.contrib.auth import authenticate

def create_user(username = 'testuser', email = 'testuser@gmail.com', is_active=1):
    return get_user_model().objects.create_user(
            username=username,
            email=email,
            password='test',
            is_active=is_active)

def client_local():

    client = APIClient(enforce_csrf_checks=True)

    response = client.post(reverse('login'), {
        'username': 'testuser', 'password': 'test'
    })

    client.credentials(
        HTTP_AUTHORIZATION='Token ' + response.data['token'])

    return client

class CustomUserTest(TestCase):
    def setUp(self):
        self.user = create_user()

    # def test_get_absolute_url(self):
    #     self.assertEqual(self.user.get_absolute_url(),
    #                      'api/auth/user/')

    def test_object_name_is_username(self):
        self.assertEqual(
            self.user.username, str(self.user))

    def test_reset_password(self):
        token = self.user.reset_password()
        self.assertEqual(token, self.user.reset_password_token)

class ResetPasswordAPITest(TestCase):
    def setUp(self):
        self.user = create_user()

    def test_user_can_reset_password(self):
        data = {
            'email': 'testuser@gmail.com'
        }

        response = self.client.post(reverse('reset_password'), data)
        self.assertEqual(response.status_code, 200)

    def test_reset_password_email_invalid(self):
        data = {
            'email': 'testuser@gm'
        }

        response = self.client.post(reverse('reset_password'), data)
        self.assertEqual(response.status_code, 400)

    def test_cannot_reset_password_user_inactive(self):
        create_user('test', 'test@gmail.com', 0)
        
        data = {
            'email': 'test@gmail.com'
        }

        response = self.client.post(reverse('reset_password'), data)

        data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(data, 'There is no user with this email')

    def test_validate_token_reset_password(self):
        token = self.user.reset_password()

        response = self.client.get( reverse("token_validate", kwargs={"token": token}))
        
        self.assertEqual(response.status_code, 200)


class ChangerPasswordAPITest(TestCase):
    def setUp(self):
        self.user = create_user()

    def test_user_can_changer_password(self):
        token = self.user.reset_password()

        data = {
            'email': 'testuser@gmail.com',
            'token': token,
            'password': 'secret'
        }

        response = self.client.post(reverse('changer_password'), data)
        self.assertEqual(response.status_code, 200)

        self.assertTrue(authenticate(username='testuser', password='secret'))

    def test_changer_password_email_invalid(self):
        data = {
            'email': 'testuser@gm'
        }

        response = self.client.post(reverse('changer_password'), data)
        self.assertEqual(response.status_code, 400)

        
