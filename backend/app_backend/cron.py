import logging
from django_cron import CronJobBase, Schedule
from .models import Emprestimo, ManutencaoFerramenta, Ferramenta
from datetime import date

# Configurar o logger
logger = logging.getLogger('meu_app')

class UpdateFerramentaStatusCronJob(CronJobBase):
    RUN_EVERY_MINS = 1440  # Execute uma vez por dia

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'meu_app.update_ferramenta_status_cron_job'  # um código único

    def do(self):
        today = date.today()
        logger.info(f"Executando cron job para atualizar o status das ferramentas em {today}")

        # Atualizar status das ferramentas de acordo com a data de devolução dos empréstimos
        emprestimos = Emprestimo.objects.filter(dataDevolucao=today)
        for emprestimo in emprestimos:
            if emprestimo.numSerie:
                ferramenta = emprestimo.numSerie
                ferramenta.status = "Disponível"
                ferramenta.save()
                logger.info(f"Atualizado status da ferramenta {ferramenta.nome} para 'Disponível' devido à devolução do empréstimo {emprestimo.codigoEmprestimo}")

        # Atualizar status das ferramentas de acordo com a data final das manutenções
        manutencoes = ManutencaoFerramenta.objects.filter(dataFinal=today)
        for manutencao in manutencoes:
            if manutencao.codFerramenta:
                ferramenta = manutencao.codFerramenta
                ferramenta.status = "Disponível"
                ferramenta.save()
                logger.info(f"Atualizado status da ferramenta {ferramenta.nome} para 'Disponível' devido à conclusão da manutenção {manutencao.codigoManutencao}")
        logger.info("Cron job finalizado")
