from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, \
                                               TokenHasScope
from rest_framework.decorators import api_view

from . import serializers


@api_view()
def logout(request):
    return Response({"message": "Hello, world!"})