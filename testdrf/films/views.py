from rest_framework import viewsets, permissions  # type: ignore
from testdrf.drf_router import drf_register

from . import models, serializers


@drf_register("actor")
class ActorViewSet(viewsets.ModelViewSet):
    queryset = models.Actor.objects.all()
    serializer_class = serializers.ActorSerializer
    permission_classes = [permissions.AllowAny]


@drf_register("film")
class FilmViewSet(viewsets.ModelViewSet):
    queryset = models.Film.objects.all()
    serializer_class = serializers.FilmSerializer
    permission_classes = [permissions.AllowAny]
