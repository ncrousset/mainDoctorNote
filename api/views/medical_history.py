from typing import OrderedDict

from django.http import Http404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework import  status, permissions
from rest_framework.response import Response

from api.models import Patient, MedicalHistory
from api.serializers import MedicalHistorySerialize
from api.permissions import IsOwnerPatient

class MedicalHistoryListCreate(APIView):
    serializer_class = MedicalHistorySerialize
    permission_classes = [
        permissions.IsAuthenticated, 
    ]

    def get(self, request, pk):
        """
        If patient was deleted, you can see background 
        """
        patient = Patient.objects.get(pk=pk)  

        # If patient was deleted, you can see background 
        if patient.deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, patient):
                return Response("you do not have permission for this action", 
                    status=status.HTTP_400_BAD_REQUEST)

        medical_history = MedicalHistory.objects.all().filter(
            deleted=False, patient=pk).order_by('-date')

        serializer = MedicalHistorySerialize(medical_history, many=True)

        data_response = {
            'total': len(medical_history),
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
    
        serializer = MedicalHistorySerialize(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicalHistoryDetail(APIView):
    serializer_class = MedicalHistorySerialize

    permission_classes = [
        permissions.IsAuthenticated, 
        IsOwnerPatient
    ]

    def get_object(self, pk):
        try:
            return MedicalHistory.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        medical_history = self.get_object(pk)

        # IF patient is deleted or medical history is deleted you cannot continue
        if(medical_history.patient.deleted or medical_history.deleted):
            return Response("You can update background", 
            status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, medical_history.patient):
            return Response("you do not have permission for this action", 
            status=status.HTTP_400_BAD_REQUEST)

        serializer = MedicalHistorySerialize(medical_history, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            medical_history = self.get_object(pk)

            # IF patient is deleted or background is deleted you cannot continue
            if(medical_history.patient.deleted or medical_history.deleted):
                return Response("You can delete medical history", 
                status=status.HTTP_400_BAD_REQUEST)

            # check permission
            if not IsOwnerPatient.has_object_permission(
                self, request, medical_history.patient):
                    return Response("you do not have permission for this action", 
                        status=status.HTTP_400_BAD_REQUEST)
            
            medical_history.deleted = True
            medical_history.deleted_date = timezone.now()
            medical_history.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
