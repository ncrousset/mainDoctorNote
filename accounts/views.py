from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

from django.core.exceptions import ObjectDoesNotExist

from django.views import View

from .models import CustomUser

from knox.models import AuthToken

from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer, 
    ResetPasswordSerializer, 
    ChangerPasswordSerializer)

from emails.email import EmailResetPassword

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = AuthToken.objects.create(user)[1]

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        token = AuthToken.objects.create(user)[1]

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ResetPasswordAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def get(self, request, token, format=None):
        try: 
            CustomUser.objects.get(reset_password_token=token, is_active=1)
        except:
            return Response("No exist", status=status.HTTP_400_BAD_REQUEST)

        return Response('ok')

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']

            try:
                user = CustomUser.objects.get(email=email, is_active=1)
                token = user.reset_password()
                EmailResetPassword.send(token, user)

                return Response('Ok')

            except CustomUser.DoesNotExist:
                return Response("There is no user with this email", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.validated_data, status=status.HTTP_400_BAD_REQUEST) 



class ChangerPasswordAPI(generics.GenericAPIView):
    serializer_class = ChangerPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']

            try:
                user = CustomUser.objects.get(email=email, is_active=1)

                if user.reset_password_token != serializer.validated_data['token']:
                    return Response("Token invalid", status=status.HTTP_400_BAD_REQUEST)

                user.reset_password_token = None
                user.reset_password_datetime = None

                user.set_password(serializer.validated_data['password'])
                user.save()

                return Response('Ok')

            except CustomUser.DoesNotExist:
                return Response("No exist", status=status.HTTP_400_BAD_REQUEST)
        else: 
            return Response(serializer.validated_data, status=status.HTTP_400_BAD_REQUEST)