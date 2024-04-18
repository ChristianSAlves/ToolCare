from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import HttpResponse
from app_backend.views import FerramentaViewSet, FuncionarioViewSet, SetorViewSet, CargoViewSet
from app_backend.views import UserViewSet, GroupViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'ferramentas', FerramentaViewSet)
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'setores', SetorViewSet)
router.register(r'cargos', CargoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]