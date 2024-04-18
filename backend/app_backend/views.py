from django.shortcuts import render
from rest_framework import viewsets
from .models import Ferramenta, Cargo, Setor, Funcionario
from .serializers import FerramentaSerializer, CargoSerializer, SetorSerializer, FuncionarioSerializer
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

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all().order_by('codigoCargo')
    serializer_class = CargoSerializer
    permission_classes = [permissions.IsAuthenticated]

class SetorViewSet(viewsets.ModelViewSet):
    queryset = Setor.objects.all().order_by('codigoSetor')
    serializer_class = SetorSerializer
    permission_classes = [permissions.IsAuthenticated]

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all().order_by('nome')
    serializer_class = FuncionarioSerializer
    permission_classes = [permissions.IsAuthenticated]

