from rest_framework import viewsets, routers  # type: ignore

router = routers.DefaultRouter()


def drf_register(pattern):
    def inner(viewset):
        if not issubclass(viewset, viewsets.ModelViewSet):
            # FIXME
            raise TypeError(viewset)

        router.register(pattern, viewset)
        return viewset

    return inner
