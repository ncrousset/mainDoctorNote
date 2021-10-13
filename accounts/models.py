from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    reset_password_token = models.CharField(blank=True, null=True, max_length=50)
    reset_password_datetime =models.DateField(blank=True, null=True)

    def get_absolute_url(self):
        return reverse("account", kwargs={"pk": self.pk})

    def __str__(self):
        return self.username