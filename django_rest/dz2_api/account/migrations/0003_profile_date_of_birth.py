# Generated by Django 2.1.4 on 2018-12-30 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_remove_profile_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='date_of_birth',
            field=models.DateField(blank=True, default='2000-11-15', verbose_name='Дата рождения'),
        ),
    ]
