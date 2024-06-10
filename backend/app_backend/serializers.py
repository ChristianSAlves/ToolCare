from rest_framework import serializers
from django.contrib.auth.models import Group, User
from .models import Ferramenta, Cargo, Setor, Funcionario, Emprestimo, ManutencaoFerramenta

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
        fields = ['codFerramenta', 'nome', 'numSerie', 'descricao', 'imgFerramenta', 'dataAquisicao', 'status']

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
        fields = ['idFuncionario', 'nome', 'matriculaFuncionario', 'cpf', 'codigoSetor', 'codigoCargo', 'imgFunc']

class EmprestimoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Emprestimo
        fields = ['codigoEmprestimo', 'matriculaFuncionario', 'dataEmprestimo', 'numSerie', 'dataDevolucao', 'observacoes']   

    def validate(self, data):
        ferramenta = data['numSerie']
        if ferramenta.status == 'Emprestada':
            raise serializers.ValidationError('A ferramenta já está emprestada e não pode ser emprestada novamente.')
        
        if ferramenta.status == 'Manutenção':
            raise serializers.ValidationError('A ferramenta se encontra em manutenção, não é possivel empresta-la.')
        
        return data

    def create(self, validated_data):
        instance = super().create(validated_data)
        ferramenta = instance.numSerie
        ferramenta.status = 'Emprestada'
        ferramenta.save()
        return instance

    def get_url(self, obj):
        return obj.get_absolute_url()    

class manutencaoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ManutencaoFerramenta    
        fields = ['codigoManutencao', 'codFerramenta', 'tipoManutencao', 'dataInicio', 'dataFinal']  

    def validate(self, data):
        ferramenta = data['codFerramenta']
        if ferramenta.status == 'Emprestada':
            raise serializers.ValidationError('A ferramenta está emprestada, não é possivel manda-la para manutenção')
        
        if ferramenta.status == 'Manutenção':
            raise serializers.ValidationError('A ferramenta já esta em manutenção.')
        
        return data                   
