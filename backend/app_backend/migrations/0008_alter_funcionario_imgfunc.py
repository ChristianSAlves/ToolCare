# Generated by Django 5.0.4 on 2024-04-28 04:22

import app_backend.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0007_alter_funcionario_cpf_alter_funcionario_imgfunc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='funcionario',
            name='imgFunc',
            field=models.ImageField(blank=True, null=True, upload_to=app_backend.models.upload_path),
        ),
    ]