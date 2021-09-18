from django.db.models.base import Model
from rest_framework import serializers
from .models import Patient
from django.contrib.auth.models import User


class PatientSerialize(serializers.ModelSerializer):

    def validate(self, data):
        if data.get('user_id', None) == None:
            data['user_id'] = User.objects.last()

        return data

    class Meta:
        model = Patient
        fields = ('id', 'first_name', 'full_name', 'last_name', 'birth_date', 'email',
                  'insurance', 'idd', 'phone', 'sex', 'next_appointment', 'deleted',
                  'deleted_date', 'user_id')
        extra_kwargs = {'user_id': {'required': False}}
        validators = []
