from rest_framework import serializers
from django.contrib.auth.models import Group, User
from .models import Ferramenta, Cargo, Setor, Funcionario

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class FerramentaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ferramenta
        fields = ['nome', 'numSerie', 'descricao', 'imgFerramenta', 'dataAquisicao', 'status']

class CargoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cargo
        fields = ['codigoCargo', 'nomeCargo', 'descricaoCargo']   

class SetorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Setor
        fields = ['codigoSetor', 'nomeSetor', 'descricaoSetor']

class FuncionarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Funcionario
        fields = ['nome', 'matriculaFuncionario', 'cpf', 'codigoSetor', 'codigoCargo', 'imgFunc']                     
