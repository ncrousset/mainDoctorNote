from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .models import Patient, Background, MedicalHistory, MedicalStudy
from django.contrib.auth.models import User

class MedicalStudySerialize(serializers.ModelSerializer):
    class Meta:
        model = Background
        fields = ('id', 'title' , 'content', 'date', 'patient', 'deleted', 'deleted_date')
        extra_kwargs = {'patient': {'required': False}}

    def create(self, validated_data):
        return Background.objects.create(**validated_data)

class BackgroundSerialize(serializers.ModelSerializer):
    class Meta:
        model = Background
        fields = ('id', 'title' , 'content', 'date', 'patient', 'deleted', 'deleted_date')
        extra_kwargs = {'patient': {'required': False}}

    def create(self, validated_data):
        return Background.objects.create(**validated_data)

class MedicalHistorySerialize(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ('id', 'title' , 'content', 'date', 'patient', 'deleted', 'deleted_date')
        extra_kwargs = {'patient': {'required': False}}


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
