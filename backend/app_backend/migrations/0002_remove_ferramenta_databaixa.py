# Generated by Django 5.0.4 on 2024-05-28 22:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ferramenta',
            name='dataBaixa',
        ),
    ]