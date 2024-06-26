# Generated by Django 5.0.4 on 2024-05-24 01:12

import app_backend.models
import datetime
import django.db.models.deletion
import django_cpf_cnpj.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cargo',
            fields=[
                ('codigoCargo', models.AutoField(primary_key=True, serialize=False)),
                ('nomeCargo', models.CharField(max_length=255)),
                ('descricaoCargo', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ferramenta',
            fields=[
                ('codFerramenta', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('numSerie', models.CharField(max_length=20, unique=True)),
                ('descricao', models.TextField(null=True)),
                ('imgFerramenta', models.ImageField(upload_to='ferramentas/')),
                ('dataAquisicao', models.DateField()),
                ('dataBaixa', models.DateField(blank=True, null=True)),
                ('status', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Setor',
            fields=[
                ('codigoSetor', models.AutoField(primary_key=True, serialize=False)),
                ('nomeSetor', models.CharField(max_length=255)),
                ('descricaoSetor', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Emprestimo',
            fields=[
                ('codigoEmprestimo', models.AutoField(primary_key=True, serialize=False)),
                ('matriculaFuncionario', models.CharField(max_length=50)),
                ('dataEmprestimo', models.DateField(default=datetime.date.today)),
                ('dataDevolucao', models.DateField(null=True)),
                ('observacoes', models.TextField(null=True)),
                ('numSerie', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_backend.ferramenta')),
            ],
        ),
        migrations.CreateModel(
            name='ManutencaoFerramenta',
            fields=[
                ('codigoManutencao', models.AutoField(primary_key=True, serialize=False)),
                ('tipoManutencao', models.CharField(max_length=15)),
                ('dataInicio', models.DateField(default=datetime.date.today)),
                ('dataFinal', models.DateField(null=True)),
                ('codFerramenta', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_backend.ferramenta')),
            ],
        ),
        migrations.CreateModel(
            name='Funcionario',
            fields=[
                ('idFuncionario', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=30)),
                ('matriculaFuncionario', models.CharField(max_length=50, unique=True)),
                ('cpf', django_cpf_cnpj.fields.CPFField(max_length=14, unique=True)),
                ('imgFunc', models.ImageField(blank=True, null=True, upload_to=app_backend.models.upload_path)),
                ('codigoCargo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_backend.cargo')),
                ('codigoSetor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app_backend.setor')),
            ],
        ),
    ]
