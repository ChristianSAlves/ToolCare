from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Emprestimo, ManutencaoFerramenta, Ferramenta

# Signal para Emprestimo
@receiver(post_save, sender=Emprestimo)
def update_ferramenta_status_emprestimo(sender, instance, **kwargs):
    if instance.numSerie:
        ferramenta = instance.numSerie
        ferramenta.status = "Emprestada"
        ferramenta.save()

@receiver(post_delete, sender=Emprestimo)
def revert_ferramenta_status_emprestimo(sender, instance, **kwargs):
    if instance.numSerie:
        ferramenta = instance.numSerie
        ferramenta.status = "Disponível"
        ferramenta.save()

# Signal para ManutencaoFerramenta
@receiver(post_save, sender=ManutencaoFerramenta)
def update_ferramenta_status_manutencao(sender, instance, **kwargs):
    if instance.codFerramenta:
        ferramenta = instance.codFerramenta
        ferramenta.status = "Manutenção"
        ferramenta.save()

@receiver(post_delete, sender=ManutencaoFerramenta)
def revert_ferramenta_status_manutencao(sender, instance, **kwargs):
    if instance.codFerramenta:
        ferramenta = instance.codFerramenta
        ferramenta.status = "Disponível"
        ferramenta.save()

