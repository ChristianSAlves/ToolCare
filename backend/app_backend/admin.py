from django.contrib import admin
from .models import Funcionario, Ferramenta, Setor, Cargo, ManutencaoFerramenta, Emprestimo

# Register your models here.
admin.site.register(Funcionario)
admin.site.register(Ferramenta)
admin.site.register(Cargo)
admin.site.register(Setor)
admin.site.register(ManutencaoFerramenta)
admin.site.register(Emprestimo)
