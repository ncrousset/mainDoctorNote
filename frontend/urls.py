from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('patients/', index),
    path('calendar/', index),
    path('patients/<int:id>', index),
    path('patients/create', index),
    path('accounts/login/', index),
    path('accounts/register/', index),
    path('accounts/reset_password/', index),
]
