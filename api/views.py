from django.db.models.query import QuerySet
from rest_framework import viewsets, status, permissions
from .serializers import PatientSerialize
from .models import Patient
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from django.views.decorators.csrf import csrf_exempt
# from braces.views import CsrfExemptMixin

from django.http import Http404


class PatientList(APIView):
    """
    List all patient, or create a new patient
    """
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, format=None):
        patients = Patient.objects.all()
        serializer = PatientSerialize(patients, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PatientSerialize(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientDetail(APIView):
    """
    Retrieve, update or delete patient instance
    """
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_object(self, pk):
        try:
            return Patient.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        patient = self.get_object(pk)
        serializer = PatientSerialize(patient)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        patient = self.get_object(pk)
        serializer = PatientSerialize(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        patient = self.get_object(pk)
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
