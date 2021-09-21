from django.db.models.query import QuerySet
from rest_framework import viewsets, status, permissions
from .serializers import PatientSerialize
from .models import Patient
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.postgres.search import SearchVector, SearchQuery
from django.core.paginator import Paginator
from django.db.models import Q

# from django.views.decorators.csrf import csrf_exempt
# from braces.views import CsrfExemptMixin

from django.http import Http404
import datetime


class PatientList(generics.ListAPIView):
    LIMIT_PAGE = 10
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
                deleted=False).filter(
                Q(search=SearchQuery(search)) | Q(search__icontains=search)).order_by('next_appointment')

        else:
            patients = Patient.objects.filter(
                deleted=False).order_by('next_appointment')

        page = 1
        if 'p' in request.GET and type(int(request.GET['p'])) == type(0):
            page = int(request.GET['p'])

        paginator = Paginator(patients, self.LIMIT_PAGE)
        page_patients = paginator.get_page(page)

        serializer = PatientSerialize(page_patients, many=True)
        return Response(serializer.data)


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
        try:
            patient = self.get_object(pk)
            patient.deleted = True
            patient.deleted_date = datetime.datetime.now()
            patient.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
