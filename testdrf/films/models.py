from django.db import models  # type: ignore


class Actor(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birth_date = models.DateField()


class Film(models.Model):
    name = models.CharField(max_length=50)
    created = models.DateField()
    actors = models.ManyToManyField(Actor)
