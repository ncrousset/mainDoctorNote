# Generated by Django 3.2.7 on 2021-09-16 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='next_appointment',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]