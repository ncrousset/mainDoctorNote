from typing import OrderedDict

from rest_framework import  status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import BackgroundSerialize
from api.models import Patient, Background
from api.permissions import IsOwnerPatient

from django.http import Http404
import datetime

from collections import OrderedDict 

class BackgroundListCreate(APIView):
    serializer_class = BackgroundSerialize
    permission_classes = [
        permissions.IsAuthenticated, 
    ]

    def get(self, request, pk):

        """
        If patient was deleted, you can see background 
        """
        if Patient.objects.get(pk=pk).deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)


        background = Background.objects.all().filter(
            deleted=False, patient=pk).order_by('-date')

        serializer = BackgroundSerialize(background, many=True)

        data_response = {
            'total': len(background),
            'data': serializer.data
        }

        return Response(data_response)

    def post(self, request, pk):
        """
        If patient was deleted, you can see background 
        """
        if Patient.objects.get(pk=pk).deleted:
            return Response("the patient was not found", 
                status=status.HTTP_400_BAD_REQUEST)

        data = OrderedDict()
        data.update(request.data)
        data['patient'] = pk
    
        serializer = BackgroundSerialize(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BackgroundDetail(APIView):
    serializer_class = BackgroundSerialize

    permission_classes = [
        permissions.IsAuthenticated, 
        IsOwnerPatient
    ]

    def get_object(self, pk):
        try:
            return Background.objects.get(id=pk)
        except Patient.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        background = self.get_object(pk)

        # check permission
        if not IsOwnerPatient.has_object_permission(
            self, request, background.patient):
            return Response("you do not have permission for this action", 
            status=status.HTTP_400_BAD_REQUEST)

        serializer = BackgroundSerialize(background, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            background = self.get_object(pk)

            # check permission
            if not IsOwnerPatient.has_object_permission(
                self, request, background.patient):
                    return Response("you do not have permission for this action", 
                        status=status.HTTP_400_BAD_REQUEST)
            
            background.deleted = True
            background.deleted_date = datetime.datetime.now()
            background.save()
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
