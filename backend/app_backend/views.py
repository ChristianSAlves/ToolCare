from django.shortcuts import render
from rest_framework import viewsets
from .models import Ferramenta
from .serializers import FerramentaSerializer
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .serializers import GroupSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class FerramentaViewSet(viewsets.ModelViewSet):
    queryset = Ferramenta.objects.all().order_by('nome')
    serializer_class = FerramentaSerializer
    permission_classes = [permissions.IsAuthenticated]