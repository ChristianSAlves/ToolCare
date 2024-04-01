# Generated by Django 5.0.3 on 2024-04-01 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0002_setor'),
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
    ]
