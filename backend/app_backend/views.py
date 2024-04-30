from django.shortcuts import render
from rest_framework import viewsets, authentication
from .models import Ferramenta, Cargo, Setor, Funcionario, Emprestimo, itemEmprestimo
from .serializers import FerramentaSerializer, CargoSerializer, SetorSerializer, FuncionarioSerializer, EmprestimoSerializer, itemEmprestimoSerializer
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .serializers import GroupSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class FerramentaViewSet(viewsets.ModelViewSet):
    queryset = Ferramenta.objects.all().order_by('nome')
    serializer_class = FerramentaSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all().order_by('codigoCargo')
    serializer_class = CargoSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class CargoView(APIView):
    def post(self, request):
        serializer = CargoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class SetorViewSet(viewsets.ModelViewSet):
    queryset = Setor.objects.all().order_by('codigoSetor')
    serializer_class = SetorSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class SetorView(APIView):
    def post(self, request):
        serializer = SetorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all().order_by('nome')
    serializer_class = FuncionarioSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class FuncionarioView(APIView):
    def post(self, request):
        serializer = FuncionarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.all().order_by('codigoEmprestimo')
    serializer_class = EmprestimoSerializer
    #permission_classes = [permissions.IsAuthenticated]
    #authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class EmprestimoView(APIView):
    def post(self, request):
        serializer = EmprestimoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class FerramentaView(APIView):
    def post(self, request):
        serializer = FerramentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)    


def funcionario_detail(request, matricula):
    funcionario = get_object_or_404(Funcionario, matricula=matricula)
    # Lógica para retornar detalhes do funcionário, por exemplo:
    data = {
        'matricula': funcionario.matricula,
        'nome': funcionario.nome,
        # Outros campos do funcionário
    }
    return JsonResponse(data)