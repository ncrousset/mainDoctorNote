from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PatientSerialize
from .models import Patient


class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerialize
    queryset = Patient.objects.all()
