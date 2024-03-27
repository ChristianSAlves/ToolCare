from django.db import models

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
