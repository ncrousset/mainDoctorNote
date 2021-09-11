from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('patient/<int:pk>/', views.PatientDetail.as_view()),
    path('patients/', views.PatientList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
