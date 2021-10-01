from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^patients/$', views.PatientList.as_view(), name='patients'),
    path('patients/create', views.PatientCreate.as_view(), name='patient-create'),
    path('patient/<int:pk>/', views.PatientDetail.as_view(), name='patient'),

    path('patient/<int:pk>/background', views.BackgroundListCreate.as_view(), name='backgrounds'),
    path('patient/background/<int:pk>', views.BackgroundDetail.as_view(), name='background'),
    path('patient/<int:pk>/medical-history', views.MedicalHistoryListCreate.as_view(), name='medical-history-list'),
    path('patient/medical-history/<int:pk>', views.MedicalHistoryDetail.as_view(), name='medical-history'),
    path('patient/<int:pk>/medical-studies', views.MedicalStudyListCreate.as_view(), name='medical-studies'),
    path('patient/medical-study/<int:pk>', views.MedicalStudyDetail.as_view(), name='medical-study'),
    path('patient/<int:pk>/medical-treatments', views.MedicalStudyListCreate.as_view(), name='medical-treatments'),
    path('patient/medical-treatment/<int:pk>', views.MedicalStudyDetail.as_view(), name='medical-treatment'),


    # only for test
    path('patient/faker/', views.faker_patients_for_test, name='faker'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
