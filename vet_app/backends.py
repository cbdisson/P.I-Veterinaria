from django.contrib.auth.backends import ModelBackend
from .models import Usuario

class CustomBackend(ModelBackend):
    def has_module_perms(self, user_obj, app_label):
        if not user_obj.is_authenticated:
            return False
        if user_obj.tipo_usuario in ['SUPER', 'RH_ADMIN']:
            return True
        return super().has_module_perms(user_obj, app_label)

    def has_perm(self, user_obj, perm, obj=None):
        if not user_obj.is_authenticated:
            return False
        if user_obj.tipo_usuario == 'SUPER':
            return True
        elif user_obj.tipo_usuario == 'RH_ADMIN':
            return perm in [
                'rh_app.add_usuario', 
                'rh_app.change_usuario',
                'rh_app.delete_usuario',
                'rh_app.view_usuario',
                'rh_app.add_funcionario',
                'rh_app.change_funcionario',
                'rh_app.delete_funcionario',
                'rh_app.view_funcionario'
            ]
        elif user_obj.tipo_usuario == 'RH':
            return perm in [
                'rh_app.add_funcionario',
                'rh_app.change_funcionario',
                'rh_app.delete_funcionario',
                'rh_app.view_funcionario'
            ]
        return False
