# Generated by Django 5.0.6 on 2024-06-21 17:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0006_funcionario_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emprestimo',
            name='matriculaFuncionario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_backend.funcionario'),
        ),
    ]