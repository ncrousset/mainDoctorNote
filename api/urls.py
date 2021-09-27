from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^patients/$',
            views.PatientList.as_view(), name='patients'),
    path('patients/create', views.PatientCreate.as_view(), name='patient-create'),
    path('patient/<int:pk>/', views.PatientDetail.as_view(), name='patient'),

    path('patient/<int:pk>/background', views.BackgroundListCreate.as_view(), name='backgrounds'),
    path('patient/background/<int:pk>', views.BackgroundDetail.as_view(), name='background'),

    # only for test
    path('patient/faker/', views.faker_patients_for_test, name='faker'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
