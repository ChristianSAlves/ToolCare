from django.apps import AppConfig


class AppBackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_backend'

    def ready(self):
        import app_backend.signals
