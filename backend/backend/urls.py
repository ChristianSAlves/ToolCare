from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import HttpResponse
from app_backend.views import FerramentaViewSet, FuncionarioViewSet, SetorViewSet, CargoViewSet, CargoView, SetorView, FuncionarioView, EmprestimoView, EmprestimoViewSet
from app_backend.views import UserViewSet, GroupViewSet
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'ferramentas', FerramentaViewSet)
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'setores', SetorViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'emprestimos', EmprestimoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token, name='api-tokn-auth'),
    path('admin/', admin.site.urls),
    path('cargos/', CargoView.as_view, name='cargos'),
    path('setores/', SetorView.as_view, name='setores'),
    path('funcionarios/', FuncionarioView.as_view, name='funcionarios'),
    path('emprestimos/', EmprestimoView.as_view, name='emprestimos')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)