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
