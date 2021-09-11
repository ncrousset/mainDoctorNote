from django.urls import path, include
from .views import PatientView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'patients', PatientView, 'patient')


urlpatterns = [
    path('', include(router.urls))
]
