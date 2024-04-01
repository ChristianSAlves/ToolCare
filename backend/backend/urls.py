from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app_backend.views import FerramentaViewSet
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'ferramentas', FerramentaViewSet)

def myView(request):
    return HttpResponse('ola')

urlpatterns = [
    path('', include(router.urls)),
    path('sobre/', myView),
]