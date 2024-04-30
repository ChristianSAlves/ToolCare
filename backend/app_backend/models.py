from django.db import models
from django_cpf_cnpj.fields import CPFField, CNPJField
from django.core.files.base import ContentFile

def upload_path(instance, filename):
    return '/'.join(['funcionarios', str(instance.nome), filename])

class FerramentaManager(models.Manager):
    def adicionarFerramenta(self, nome, numSerie, descricao, imgFerramenta, dataAquisicao, status):
        ferramenta = self.create(
            nome=nome,
            numSerie=numSerie,
            descricao=descricao,
            imgFerramenta=imgFerramenta,
            dataAquisicao=dataAquisicao,
            status=status
        )
        return ferramenta
    
    def getFerramentaPorId(self, id):
        try:
            return self.get(id=id)
        except self.model.DoesNotExist:
            return None

    def atualizarFerramenta(self, id, **kwargs):
        ferramenta = self.getFerramentaPorId(id)
        if ferramenta:
            for key, value in kwargs.items():
                setattr(ferramenta, key, value)
            ferramenta.save()
            return ferramenta
        return None

    def deletarFerramenta(self, id):
        ferramenta = self.getFerramentaPorId(id)
        if ferramenta:
            ferramenta.delete()
            return True
        return False

class Ferramenta(models.Model):
    nome = models.CharField(max_length=255)
    numSerie = models.IntegerField(max_length=20, unique=True)
    descricao = models.TextField()
    imgFerramenta = models.ImageField(upload_to='ferramentas/')
    dataAquisicao = models.DateField()
    dataBaixa = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30)

    def __str__(self):
        return self.nome

class SetorManager(models.Manager):
    def adicionarSetor(self, nomeSetor, descricaoSetor=None):
        setor = self.create(
            nomeSetor=nomeSetor,
            descricaoSetor=descricaoSetor
        )
        return setor

    def mostrarSetor(self):
        return self.all()

    def apagarSetor(self, codigoSetor):
        self.filter(codigoSetor=codigoSetor).delete()

    def alterarSetor(self, codigoSetor, nomeSetor, descricaoSetor=None):
        setor = self.get(codigoSetor=codigoSetor)
        setor.nomeSetor = nomeSetor
        setor.descricaoSetor = descricaoSetor
        setor.save()
        return setor

class Setor(models.Model):
    codigoSetor = models.AutoField(primary_key=True)
    nomeSetor = models.CharField(max_length=255)
    descricaoSetor = models.CharField(max_length=255, null=True, blank=True)

    objects = SetorManager()

    def __str__(self):
        return self.nomeSetor
    
    

class CargoManager(models.Manager):
    def adicionarCargo(self, nomeCargo, descricaoCargo=None):
        cargo = self.create(
            nomeCargo=nomeCargo,
            descricaoCargo=descricaoCargo
        )
        return cargo

    def mostrarCargo(self):
        return self.all()

    def apagarCargo(self, codigoCargo):
        self.filter(codigoCargo=codigoCargo).delete()

    def alterarCargo(self, codigoCargo, nomeCargo, descricaoCargo=None):
        cargo = self.get(codigoCargo=codigoCargo)
        cargo.nomeCargo = nomeCargo
        cargo.descricaoCargo = descricaoCargo
        cargo.save()
        return cargo

class Cargo(models.Model):
    codigoCargo = models.AutoField(primary_key=True)
    nomeCargo = models.CharField(max_length=255)
    descricaoCargo = models.CharField(max_length=255, null=True, blank=True)

    objects = CargoManager()

    def __str__(self):
        return self.nomeCargo


class EmprestimoManager(models.Manager):

    def adicionarEmprestimo(self, matriculaFuncionario, dataEmprestimo):
        if not matriculaFuncionario or not dataEmprestimo:
            raise ValueError("Campos obrigatórios: matriculaFuncionario, dataEmprestimo")

        emprestimo = self.create(
            matriculaFuncionario=matriculaFuncionario,
            dataEmprestimo=dataEmprestimo,
        )
        return emprestimo

    def buscarTodosEmprestimos(self):
        return self.all()

    def buscarEmprestimoPorId(self, id):
        try:
            return self.get(pk=id)
        except models.DoesNotExist:
            return None

    def atualizarEmprestimo(self, id, matriculaFuncionario=None, dataEmprestimo=None):
        try:
            emprestimo = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Empréstimo não encontrado")

        # Atualiza campos conforme a necessidade (evita atualizações desnecessárias)
        if matriculaFuncionario:
            emprestimo.matriculaFuncionario = matriculaFuncionario
        if dataEmprestimo:
            emprestimo.dataEmprestimo = dataEmprestimo

        emprestimo.save()
        return emprestimo

    def deletarEmprestimo(self, id):
        try:
            emprestimo = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Empréstimo não encontrado")

        emprestimo.delete()


class Emprestimo(models.Model):
    codigoEmprestimo = models.AutoField(primary_key=True)
    matriculaFuncionario = models.CharField(max_length=20)
    dataEmprestimo = models.DateField

    def __str__(self):
        return self.codigoEmprestimo


class ItemEmprestimoManager(models.Manager):

    def adicionarItemEmprestimo(self, codigoEmprestimo, numSerie, dataDevolucao=None, observacoes=""):
        if not codigoEmprestimo or not numSerie:
            raise ValueError("Campos obrigatórios: codigoEmprestimo, numSerie")

        itemEmprestimo = self.create(
            codigoEmprestimo=codigoEmprestimo,
            numSerie=numSerie,
            dataDevolucao=dataDevolucao,
            observacoes=observacoes,
        )
        return itemEmprestimo

    def buscarItensEmprestimoPorEmprestimo(self, codigoEmprestimo):
        return self.filter(codigoEmprestimo=codigoEmprestimo)

    def atualizarItemEmprestimo(self, id, dataDevolucao=None, observacoes=""):
        try:
            item_emprestimo = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Item de empréstimo não encontrado")

        # Atualiza campos conforme a necessidade (evita atualizações desnecessárias)
        if dataDevolucao:
            item_emprestimo.dataDevolucao = dataDevolucao
        if observacoes:
            item_emprestimo.observacoes = observacoes

        item_emprestimo.save()
        return item_emprestimo

    def deletar_item_emprestimo(self, id):
        try:
            item_emprestimo = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Item de empréstimo não encontrado")

        item_emprestimo.delete()


class itemEmprestimo(models.Model):
    codigoEmprestimo = models.ForeignKey(
        Emprestimo, on_delete=models.SET_NULL, null=True
    )
    numSerie = models.ForeignKey(
        Ferramenta, on_delete=models.SET_NULL, null=True
    )
    dataDevolucao = models.DateField
    observacoes = models.TextField

class FuncionarioManager(models.Manager):

    def adicionarFuncionario(self, nome, matriculaFuncionario, cpf, codigoSetor=None, codigoCargo=None, imgFunc=None):
        if not nome or not matriculaFuncionario or not cpf:
            raise ValueError("Required fields: nome, matriculaFuncionario, cpf")

        funcionario = self.create(
            nome=nome,
            matriculaFuncionario=matriculaFuncionario,
            cpf=cpf,
            codigoSetor=codigoSetor,
            codigoCargo=codigoCargo,
            imgFunc=imgFunc,
        )
        return funcionario

    def getAllFuncionarios(self):
        return self.all()

    def getFuncionarioById(self, id):
        try:
            return self.get(pk=id)
        except models.DoesNotExist:
            return None

    def atualizarFuncionario(self, id, nome=None, matriculaFuncionario=None, cpf=None, codigoSetor=None, codigoCargo=None, imgFunc=None):
        try:
            funcionario = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Funcionario não encontrado")

        if nome:
            funcionario.nome = nome
        if matriculaFuncionario:
            funcionario.matriculaFuncionario = matriculaFuncionario
        # CPF nao pode ser alterado
        if codigoSetor:
            funcionario.codigoSetor = codigoSetor
        if codigoCargo:
            funcionario.codigoCargo = codigoCargo
        if imgFunc:
            funcionario.imgFunc = imgFunc

        funcionario.save()
        return funcionario

    def deletarFuncionario(self, id):
        try:
            funcionario = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Funcionario não encontrado")

        funcionario.delete()

class Funcionario(models.Model):
    nome = models.CharField(max_length=30)
    matriculaFuncionario = models.CharField(max_length=20, unique=True)
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


class ManutencaoFerramentaManager(models.Manager):

    def adicionarManutencaoFerramenta(self, numSerie, tipoManutencao, dataInicio, dataFinal):
        if not numSerie or not tipoManutencao or not dataInicio or not dataFinal:
            raise ValueError("Campos obrigatórios: numSerie, tipoManutencao, dataInicio, dataFinal")

        manutencao_ferramenta = self.create(
            numSerie=numSerie,
            tipoManutencao=tipoManutencao,
            dataInicio=dataInicio,
            dataFinal=dataFinal,
        )
        return manutencao_ferramenta

    def buscarTodasManutencoes(self):
        return self.all()

    def buscarManutencaoPorId(self, id):
        try:
            return self.get(pk=id)
        except models.DoesNotExist:
            return None

    def atualizarManutencaoFerramenta(self, id, numSerie=None, tipoManutencao=None, dataInicio=None, dataFinal=None):
        try:
            manutencao_ferramenta = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Manutenção de ferramenta não encontrada")

        # Atualiza campos conforme a necessidade (evita atualizações desnecessárias)
        if numSerie:
            manutencao_ferramenta.numSerie = numSerie
        if tipoManutencao:
            manutencao_ferramenta.tipoManutencao = tipoManutencao
        if dataInicio:
            manutencao_ferramenta.dataInicio = dataInicio
        if dataFinal:
            manutencao_ferramenta.dataFinal = dataFinal

        manutencao_ferramenta.save()
        return manutencao_ferramenta

    def deletarManutencaoFerramenta(self, id):
        try:
            manutencao_ferramenta = self.get(pk=id)
        except models.DoesNotExist:
            raise self.model.DoesNotExist("Manutenção de ferramenta não encontrada")

        manutencao_ferramenta.delete()


class ManutencaoFerramenta(models.Model):
    codigoManutencao = models.AutoField
    numSerie = models.ForeignKey(
        Ferramenta, on_delete=models.SET_NULL, null=True
    )
    tipoManutencao = models.CharField(max_length=15)
    dataInicio = models.DateField
    dataFinal = models.DateField