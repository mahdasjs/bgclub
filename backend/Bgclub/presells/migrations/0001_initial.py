# Generated by Django 3.1.3 on 2021-02-05 10:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Presell',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('presell_pic', models.ImageField(blank=True, upload_to='image/')),
                ('value', models.CharField(max_length=10)),
                ('startdate', models.CharField(max_length=10)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='presells_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('presell', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments_presell', to='presells.presell')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments_pre', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
