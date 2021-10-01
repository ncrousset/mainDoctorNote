from typing import OrderedDict

from django.http import Http404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework import  status, permissions
from rest_framework.response import Response

from api.models import Patient, MedicalTreatment
from api.serializers import MedicalTreatmentSerialize
from api.permissions import IsOwnerPatient

class MedicalTreatmentListCreate(APIView):
    serializer_class = MedicalTreatmentSerialize
    permission_classes = [
        permissions.IsAuthenticated, 
    ]

    def get(self, request, pk):
        patient = Patient.objects.get(pk=pk)  

        # If patient was deleted, you can see medical treatment 
        if patient.deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, patient):
                return Response("you do not have permission for this action", 
                    status=status.HTTP_400_BAD_REQUEST)

        medical_treatment = MedicalTreatment.objects.all().filter(
            deleted=False, patient=pk).order_by('-date')

        serializer = MedicalTreatmentSerialize(medical_treatment, many=True)

        data_response = {
            'total': len(medical_treatment),
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
                    
        # If patient was deleted, you can see medical treatment 
        if patient.deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        data = OrderedDict()
        data.update(request.data)
        data['patient'] = pk
    
        serializer = MedicalTreatmentSerialize(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicalTreatmentDetail(APIView):
    serializer_class = MedicalTreatmentSerialize

    permission_classes = [
        permissions.IsAuthenticated, 
        IsOwnerPatient
    ]

    def get_object(self, pk):
        try:
            return MedicalTreatment.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        medical_treatment = self.get_object(pk)

        # IF patient is deleted or medical treatment is deleted you cannot continue
        if(medical_treatment.patient.deleted or medical_treatment.deleted):
            return Response("You can update medical treatment", 
            status=status.HTTP_400_BAD_REQUEST)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, medical_treatment.patient):
            return Response("you do not have permission for this action", 
            status=status.HTTP_400_BAD_REQUEST)

        serializer = MedicalTreatmentSerialize(medical_treatment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            medical_treatment = self.get_object(pk)

            # IF patient is deleted or medical treatment is deleted you cannot continue
            if(medical_treatment.patient.deleted or medical_treatment.deleted):
                return Response("You can delete medical stufy", 
                status=status.HTTP_400_BAD_REQUEST)

            # check permission
            if not IsOwnerPatient.has_object_permission(
                self, request, medical_treatment.patient):
                    return Response("you do not have permission for this action", 
                        status=status.HTTP_400_BAD_REQUEST)
            
            medical_treatment.deleted = True
            medical_treatment.deleted_date = timezone.now()
            medical_treatment.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
