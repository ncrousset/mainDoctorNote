from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('patients/', index),
    path('accounts/login/', index),
]
