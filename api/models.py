from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User


class Patient(models.Model):
    SEX = (
        ('m', 'masculine'),
        ('f', 'feminine'),
        ('o', 'other'),
    )

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField(blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    insurance = models.CharField(max_length=20, blank=True, null=True)
    idd = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    sex = models.CharField(max_length=15, choices=SEX)
    next_appointment = models.DateTimeField(blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    deleted = models.BooleanField(default=False, blank=True, null=True)
    deleted_date = models.DateTimeField(blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @property
    def full_name(self):
        """Returns the patient's full name"""
        return f"{self.first_name} {self.last_name}"

    @property
    def sex_title(self):
        """Return the sex explicit ('male', 'feminine', 'other')"""

        sex_title = {'m': 'masculine',
                     'f': 'feminine',
                     'o': 'other'}

        if self.sex != '':
            return sex_title[self.sex]

        return ''

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return reverse("patient", kwargs={"pk": self.pk})


class Background(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    date = models.CharField(max_length=10, blank=True, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
   
    deleted = models.BooleanField(default=False, blank=True, null=True)
    deleted_date = models.DateTimeField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    # def get_absolute_url(self):
    #     return reverse("patient-background", kwargs={"pk": self.pk})
