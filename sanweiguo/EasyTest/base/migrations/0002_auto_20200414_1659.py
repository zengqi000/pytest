# Generated by Django 3.0.4 on 2020-04-14 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interface',
            old_name='request_body_param',
            new_name='is_header',
        ),
        migrations.RenameField(
            model_name='interface',
            old_name='request_header_param',
            new_name='request_body_data',
        ),
        migrations.RenameField(
            model_name='interface',
            old_name='response_body_param',
            new_name='response_expect_data',
        ),
        migrations.RenameField(
            model_name='interface',
            old_name='response_header_param',
            new_name='response_result_data',
        ),
    ]
