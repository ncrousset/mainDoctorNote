from django.urls import path, include
from .views import (
    RegisterAPI, 
    LoginAPI, 
    UserAPI, 
    ResetPasswordAPI, 
    ChangerPasswordAPI)
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view(), name='register'),
    path('api/auth/login', LoginAPI.as_view(), name='login'),
    path('api/auth/reset_password', ResetPasswordAPI.as_view(), name='reset_password'),
    path('api/auth/reset_password/<str:token>', ResetPasswordAPI.as_view(), name='token_validate'),
    path('api/auth/changer_password', ChangerPasswordAPI.as_view(), name='changer_password'),
    path('api/auth/user', UserAPI.as_view(), name='account'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]
