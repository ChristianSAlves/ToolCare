from django.db import models
from django_cpf_cnpj.fields import CPFField
from django.urls import reverse
import datetime

def upload_path(instance, filename):
    return '/'.join(['funcionarios', str(instance.nome), filename])

class Ferramenta(models.Model):
    codFerramenta = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    numSerie = models.CharField(max_length=20, unique=True)
    descricao = models.TextField(null=True)
    imgFerramenta = models.ImageField(upload_to='ferramentas/')
    dataAquisicao = models.DateField()
    status = models.CharField(max_length=30)

    def __str__(self):
        return self.nome

class Setor(models.Model):
    codigoSetor = models.AutoField(primary_key=True)
    nomeSetor = models.CharField(max_length=255)
    descricaoSetor = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.nomeSetor

class Cargo(models.Model):
    codigoCargo = models.AutoField(primary_key=True)
    nomeCargo = models.CharField(max_length=255)
    descricaoCargo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.nomeCargo

class Emprestimo(models.Model):
    codigoEmprestimo = models.AutoField(primary_key=True)
    matriculaFuncionario = models.CharField(max_length=50)
    numSerie = models.ForeignKey(
        Ferramenta, on_delete=models.CASCADE, null=True
    )
    dataEmprestimo = models.DateField(default=datetime.date.today)
    dataDevolucao = models.DateField(null=True)
    observacoes = models.TextField(null=True)

    def __str__(self):
        return f"{self.codigoEmprestimo}"

class Funcionario(models.Model):
    idFuncionario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=30)
    matriculaFuncionario = models.CharField(max_length=50, unique=True)
    cpf = CPFField(masked=True, unique=True)  # To enable auto-mask xxx.xxx.xxx-xx
    codigoSetor = models.ForeignKey(
      Setor, on_delete=models.SET_NULL, null=True
    )
    codigoCargo = models.ForeignKey(
        Cargo, on_delete=models.SET_NULL, null=True
    )
    imgFunc = models.ImageField(null=True, blank=True, upload_to=upload_path)

    def __str__(self):
        return self.nome
    
    def get_absolute_url(self):
        return reverse('FuncionarioView', kwargs={'matriculaFuncionario': self.matriculaFuncionario})

class ManutencaoFerramenta(models.Model):
    codigoManutencao = models.AutoField(primary_key=True)
    codFerramenta = models.ForeignKey(
        Ferramenta, on_delete=models.CASCADE, null=True
    )
    tipoManutencao = models.CharField(max_length=15)
    dataInicio = models.DateField(default=datetime.date.today)
    dataFinal = models.DateField(null=True)

    def __str__(self):
        return f"{self.codigoManutencao}"
