from rest_framework import permissions

class IsOwnerPatient(permissions.BasePermission):

    def has_object_permission(self, request, patient):

        if patient.user_id == request.user: 
            return True
        else:
            return False