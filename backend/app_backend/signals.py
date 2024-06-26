from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Emprestimo, ManutencaoFerramenta, Ferramenta, Funcionario
from django.core.exceptions import ValidationError

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

@receiver(pre_save, sender=Ferramenta)
def validate_ferramenta_status(sender, instance, **kwargs):
    if instance.pk:  # Só faz a validação se for uma atualização (o pk existe)
        current_instance = Ferramenta.objects.get(pk=instance.pk)
        if instance.status == 'Baixa' and current_instance.status != 'Disponível':
            print("Aviso: Não é possível atualizar o status para Baixa se o status atual não for Disponível.")
            raise ValidationError('O status só pode ser alterado para Baixa se o status atual for Disponível.')
        
@receiver(pre_save, sender=Funcionario)
def validate_funcionario_status(sender, instance, **kwargs):
    if not instance.status:
        print(f"Validando status para o funcionário: {instance.matriculaFuncionario}")
        active_loans = Emprestimo.objects.filter(
            matriculaFuncionario=instance.matriculaFuncionario,
            dataDevolucao__isnull=True
        ).exists()
        print(f"Existem empréstimos ativos: {active_loans}")
        if active_loans:
            raise ValidationError(
                "Não é possível desativar o funcionário enquanto houver empréstimos ativos."
            )