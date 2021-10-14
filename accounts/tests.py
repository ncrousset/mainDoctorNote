from django.test import TestCase
from django.contrib.auth import get_user_model

def create_user():
    return get_user_model().objects.create_user(
            username='testuser',
            email='testuser@gmail.com',
            password='test')

class CustomUser(TestCase):
    def setUp(self):
        self.user = create_user()

    # def test_get_absolute_url(self):
    #     self.assertEqual(self.user.get_absolute_url(),
    #                      'api/auth/user/')

    def test_object_name_is_username(self):
        self.assertEqual(
            self.user.username, str(self.user))
