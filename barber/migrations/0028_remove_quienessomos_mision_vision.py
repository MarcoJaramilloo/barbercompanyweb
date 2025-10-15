from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('barber', '0027_contacto_imagen_fondo_hero'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quienessomos',
            name='mision',
        ),
        migrations.RemoveField(
            model_name='quienessomos',
            name='vision',
        ),
    ]
