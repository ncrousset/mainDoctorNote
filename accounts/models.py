import os, binascii
from django.utils import timezone
from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    reset_password_token = models.CharField(
        blank=True, null=True, max_length=50)
    reset_password_datetime = models.DateTimeField(blank=True, null=True)

    def reset_password(self):
        token = self._generate_token()
        self.reset_password_token = token
        self.reset_password_datetime = timezone.now()
        self.save()
        return token

    def get_absolute_url(self):
        return reverse("account", kwargs={"pk": self.pk})

    def _generate_token(self):
        length = 20
        return binascii.hexlify(os.urandom(length)).decode()[0:length]

    def __str__(self):
        return self.username
