from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app_backend.views import FerramentaViewSet

router = DefaultRouter()
router.register(r'ferramentas', FerramentaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]