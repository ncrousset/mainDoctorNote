from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [

    path('patients/', views.PatientList.as_view(), name='patients'),
    path('patients/<int:pk>/', views.PatientDetail.as_view(), name='patient'),
    path('patients/<int:pk>/', views.PatientDetail.as_view(), name='patient-delete'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
