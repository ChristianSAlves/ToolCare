from django.shortcuts import render
from rest_framework import viewsets, authentication, viewsets
from .models import Ferramenta, Cargo, Setor, Funcionario, Emprestimo, ManutencaoFerramenta
from .serializers import FerramentaSerializer, CargoSerializer, SetorSerializer, FuncionarioSerializer, EmprestimoSerializer, manutencaoSerializer
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .serializers import GroupSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.generic import DetailView
from django.http import JsonResponse
from django.core.files.storage import default_storage
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class FerramentaViewSet(viewsets.ModelViewSet):
    queryset = Ferramenta.objects.all().order_by('codFerramenta')
    serializer_class = FerramentaSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]


class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all().order_by('codigoCargo')
    serializer_class = CargoSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

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
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

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
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

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
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

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

class ManutencaoViewSet(viewsets.ModelViewSet):
    queryset = ManutencaoFerramenta.objects.all().order_by('codigoManutencao')
    serializer_class = manutencaoSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]

class ManutencaoView(APIView):
    def post(self, request):
        serializer = manutencaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_ferramenta(request, codFerramenta):
    if request.method == 'PUT':
        # Extrai os dados do corpo da requisição
        data = json.loads(request.body.decode("utf-8"))
        
        # Atualiza os campos da ferramenta
        ferramenta = Ferramenta.objects.get(codFerramenta=codFerramenta)
        ferramenta.nome = data['nome']
        ferramenta.numSerie = data['numSerie']
        ferramenta.descricao = data['descricao']
        ferramenta.dataAquisicao = data['dataAquisicao']
        ferramenta.status = data['status']

        # Atualiza a imagem da ferramenta apenas se um novo arquivo foi enviado
        if 'imgFerramenta' in request.FILES:
            ferramenta.imgFerramenta = request.FILES['imgFerramenta']
            # Salva a imagem no sistema de arquivos
            default_storage.save(ferramenta.imgFerramenta.name, request.FILES['imgFerramenta'])

        ferramenta.save()

        return Response({'message': 'Ferramenta atualizada com sucesso'}, status=200)
    else:
        return Response({'error': 'Método não permitido.'}, status=405)
    
    