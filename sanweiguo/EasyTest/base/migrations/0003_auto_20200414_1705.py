# Generated by Django 3.0.4 on 2020-04-14 09:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20200414_1659'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interface',
            old_name='is_header',
            new_name='header',
        ),
    ]
