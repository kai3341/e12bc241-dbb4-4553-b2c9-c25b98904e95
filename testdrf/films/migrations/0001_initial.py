# Generated by Django 4.1.1 on 2022-09-23 13:29

from django.db import migrations, models  # type: ignore


class Migration(migrations.Migration):

    initial = True

    dependencies = []  # type: ignore

    operations = [
        migrations.CreateModel(
            name="Actor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=30)),
                ("last_name", models.CharField(max_length=30)),
                ("birth_date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="Film",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("created", models.DateField()),
                ("actors", models.ManyToManyField(to="films.actor")),
            ],
        ),
    ]
