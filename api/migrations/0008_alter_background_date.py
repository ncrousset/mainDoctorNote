# Generated by Django 3.2.7 on 2021-09-28 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_background_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='background',
            name='date',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]