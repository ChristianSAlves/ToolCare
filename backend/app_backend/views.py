from django.shortcuts import render
from rest_framework import viewsets
from .models import Ferramenta
from .serializers import FerramentaSerializer

class FerramentaViewSet(viewsets.ModelViewSet):
    queryset = Ferramenta.objects.all()
    serializer_class = FerramentaSerializer

