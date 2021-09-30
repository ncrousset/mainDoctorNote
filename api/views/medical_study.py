from typing import OrderedDict

from django.http import Http404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework import  status, permissions
from rest_framework.response import Response

from api.models import Patient, MedicalStudy
from api.serializers import MedicalStudySerialize
from api.permissions import IsOwnerPatient

class MedicalStudyListCreate(APIView):
    serializer_class = MedicalStudySerialize
    permission_classes = [
        permissions.IsAuthenticated, 
    ]

    def get(self, request, pk):
        patient = Patient.objects.get(pk=pk)  

        # If patient was deleted, you can see medical study 
        if patient.deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, patient):
                return Response("you do not have permission for this action", 
                    status=status.HTTP_400_BAD_REQUEST)

        medical_stories = MedicalStudy.objects.all().filter(
            deleted=False, patient=pk).order_by('-date')

        serializer = MedicalStudySerialize(medical_stories, many=True)

        data_response = {
            'total': len(medical_stories),
            'data': serializer.data
        }

        return Response(data_response)

    def post(self, request, pk):
        patient = Patient.objects.get(pk=pk)  

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, patient):
                return Response("you do not have permission for this action", 
                    status=status.HTTP_400_BAD_REQUEST)
                    
        # If patient was deleted, you can see background 
        if patient.deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        data = OrderedDict()
        data.update(request.data)
        data['patient'] = pk
    
        serializer = MedicalStudySerialize(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicalStudyDetail(APIView):
    serializer_class = MedicalStudySerialize

    permission_classes = [
        permissions.IsAuthenticated, 
        IsOwnerPatient
    ]

    def get_object(self, pk):
        try:
            return MedicalStudy.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        medical_study = self.get_object(pk)

        # IF patient is deleted or medical study is deleted you cannot continue
        if(medical_study.patient.deleted or medical_study.deleted):
            return Response("You can update medical study", 
            status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, medical_study.patient):
            return Response("you do not have permission for this action", 
            status=status.HTTP_400_BAD_REQUEST)

        serializer = MedicalStudySerialize(medical_study, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            medical_study = self.get_object(pk)

            # IF patient is deleted or medical study is deleted you cannot continue
            if(medical_study.patient.deleted or medical_study.deleted):
                return Response("You can delete medical stufy", 
                status=status.HTTP_400_BAD_REQUEST)

            # check permission
            if not IsOwnerPatient.has_object_permission(
                self, request, medical_study.patient):
                    return Response("you do not have permission for this action", 
                        status=status.HTTP_400_BAD_REQUEST)
            
            medical_study.deleted = True
            medical_study.deleted_date = timezone.now()
            medical_study.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
