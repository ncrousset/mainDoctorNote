from django.db.models.base import Model
from rest_framework import serializers
from .models import Patient


class PatientSerialize(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id', 'first_name', 'last_name', 'birth_date', 'email',
                  'insurance', 'idd', 'phone', 'sex', 'next_appointment', 'user_id')
