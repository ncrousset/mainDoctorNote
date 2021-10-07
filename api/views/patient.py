from typing import OrderedDict

from django.db.models.query import QuerySet
from django.contrib.postgres.search import SearchVector, SearchQuery
from django.core.paginator import Paginator
from django.db.models import Q

from rest_framework import status, permissions
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import PatientSerialize
from api.models import Patient

from django.http import Http404, HttpResponse
import datetime

from faker import Faker
from django.contrib.auth.models import User
import random

from collections import OrderedDict 


def faker_patients_for_test(self):
    faker = Faker()

    user = User.objects.last()

    for _ in range(100):

        Patient.objects.create(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            birth_date=faker.date_of_birth(
                tzinfo=None, minimum_age=0, maximum_age=80),
            email=faker.email(),
            insurance=random.randrange(1000000, 9999999),
            idd=random.randrange(1000000, 9999999),
            phone=faker.phone_number()[:12],
            sex=random.choice(['m', 'f', 'o']),
            user_id=user
        )

    return HttpResponse("ok")


class PatientList(generics.ListAPIView):
    LIMIT_PAGE = 18
    serializer_class = PatientSerialize
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        if 'q' in request.GET and len(str(request.GET['q']).strip()) > 0:
            search = request.GET['q']

            patients = Patient.objects.annotate(
                search=SearchVector(
                    "first_name", "last_name", "insurance", "idd")
            ).filter(
                deleted=False, user_id=request.user).filter(
                Q(search=SearchQuery(search)) | Q(search__icontains=search)).order_by('next_appointment')

        else:
            patients = Patient.objects.filter(
                deleted=False, user_id=request.user).order_by('next_appointment')

        page = 1
        if 'p' in request.GET and type(int(request.GET['p'])) == type(0):
            page = int(request.GET['p'])

        paginator = Paginator(patients, self.LIMIT_PAGE)
        page_patients = paginator.get_page(page)

        serializer = PatientSerialize(page_patients, many=True)

        data_response = {
            'page': page,
            'total': len(patients),
            'data': serializer.data
        }

        return Response(data_response)


class PatientCreate(generics.CreateAPIView):
    """
    List all patient, or create a new patient
    """
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, format=None):
        serializer = PatientSerialize(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user)
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
        try:
            patient = self.get_object(pk)
            patient.deleted = True
            patient.deleted_date = datetime.datetime.now()
            patient.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)

