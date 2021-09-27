from django.contrib import admin
from .models import Patient, Background


class ApiAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'birth_date', 'email',
                    'insurance', 'idd', 'phone', 'sex', 'next_appointment', 'user_id')


admin.site.register(Patient, ApiAdmin)
admin.site.register(Background)