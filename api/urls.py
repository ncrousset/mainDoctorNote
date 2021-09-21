from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # path('patients/', views.PatientCreate.as_view(), name='patients-create'),
    re_path(r'^patients/(?P<search>\D+)/$',
            views.PatientList.as_view(), name='patients'),
    # path('patients/', views.PatientList.as_view(), name='patients'),
    path('patient/<int:pk>/', views.PatientDetail.as_view(), name='patient'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
