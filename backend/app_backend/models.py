from django.db import models

class FerramentaManager(models.Manager):
    def adicionar_ferramenta(self, nome, numSerie, descricao, imgFerramenta, dataAquisicao, dataManutencaoFerramenta, status):
        ferramenta = self.create(
            nome=nome,
            numSerie=numSerie,
            descricao=descricao,
            imgFerramenta=imgFerramenta,
            dataAquisicao=dataAquisicao,
            dataManutencaoFerramenta=dataManutencaoFerramenta,
            status=status
        )
        return ferramenta
    
    def get_ferramenta_por_id(self, id):
        try:
            return self.get(id=id)
        except self.model.DoesNotExist:
            return None

    def atualizar_ferramenta(self, id, **kwargs):
        ferramenta = self.get_ferramenta_por_id(id)
        if ferramenta:
            for key, value in kwargs.items():
                setattr(ferramenta, key, value)
            ferramenta.save()
            return ferramenta
        return None

    def deletar_ferramenta(self, id):
        ferramenta = self.get_ferramenta_por_id(id)
        if ferramenta:
            ferramenta.delete()
            return True
        return False

class Ferramenta(models.Model):
    nome = models.CharField(max_length=255)
    numSerie = models.IntegerField()
    descricao = models.TextField()
    imgFerramenta = models.ImageField(upload_to='ferramentas/')
    dataAquisicao = models.DateField()
    dataManutencaoFerramenta = models.DateField()
    dataBaixa = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class SetorManager(models.Manager):
    def adicionar_setor(self, nomeSetor, descricaoSetor=None):
        setor = self.create(
            nomeSetor=nomeSetor,
            descricaoSetor=descricaoSetor
        )
        return setor

    def mostrar_setor(self):
        return self.all()

    def apagar_setor(self, codigoSetor):
        self.filter(codigoSetor=codigoSetor).delete()

    def alterar_setor(self, codigoSetor, nomeSetor, descricaoSetor=None):
        setor = self.get(codigoSetor=codigoSetor)
        setor.nomeSetor = nomeSetor
        setor.descricaoSetor = descricaoSetor
        setor.save()
        return setor

class Setor(models.Model):
    codigoSetor = models.IntegerField(primary_key=True)
    nomeSetor = models.CharField(max_length=255)
    descricaoSetor = models.CharField(max_length=255, null=True, blank=True)

    objects = SetorManager()

    def __str__(self):
        return self.nomeSetor
    
    

class CargoManager(models.Manager):
    def adicionar_cargo(self, nomeCargo, descricaoCargo=None):
        cargo = self.create(
            nomeCargo=nomeCargo,
            descricaoCargo=descricaoCargo
        )
        return cargo

    def mostrar_cargo(self):
        return self.all()

    def apagar_cargo(self, codigoCargo):
        self.filter(codigoCargo=codigoCargo).delete()

    def alterar_cargo(self, codigoCargo, nomeCargo, descricaoCargo=None):
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


class Emprestimo:
    def __init__(self, codigoEmprestimo, numSerie, matriculaFuncionario, dataEmprestimo, dataDevolucao, observacoes):
        self.codigoEmprestimo = codigoEmprestimo
        self.numSerie = numSerie
        self.matriculaFuncionario = matriculaFuncionario
        self.dataEmprestimo = dataEmprestimo
        self.dataDevolucao = dataDevolucao
        self.observacoes = observacoes

    def __str__(self):
        return f"Emprestimo: {self.codigoEmprestimo}, Numero de Serie: {self.numSerie}, Matricula do Funcionario: {self.matriculaFuncionario}, Data de Emprestimo: {self.dataEmprestimo}, Data de Devolucao: {self.dataDevolucao}, Observacoes: {self.observacoes}"


class EmprestimoManager:
    def __init__(self):
        self.emprestimos = []

    def adicionar_emprestimo(self, codigoEmprestimo, numSerie, matriculaFuncionario, dataEmprestimo, dataDevolucao, observacoes):
        emprestimo = Emprestimo(codigoEmprestimo, numSerie, matriculaFuncionario, dataEmprestimo, dataDevolucao, observacoes)
        self.emprestimos.append(emprestimo)
        return emprestimo

    def mostrar_emprestimos(self):
        for emprestimo in self.emprestimos:
            print(emprestimo)

    def apagar_emprestimo(self, codigoEmprestimo):
        for i, emprestimo in enumerate(self.emprestimos):
            if emprestimo.codigoEmprestimo == codigoEmprestimo:
                del self.emprestimos[i]
                return True
        return False

    def alterar_emprestimo(self, codigoEmprestimo, **kwargs):
        for emprestimo in self.emprestimos:
            if emprestimo.codigoEmprestimo == codigoEmprestimo:
                for key, value in kwargs.items():
                    setattr(emprestimo, key, value)
                return emprestimo
        return None

    def adicionar_observacoes(self, codigoEmprestimo, observacoes):
        for emprestimo in self.emprestimos:
            if emprestimo.codigoEmprestimo == codigoEmprestimo:
                emprestimo.observacoes += f" {observacoes}"
                return emprestimo
        return None
