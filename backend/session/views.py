import json

from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import serializers

from . import serializers


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_user(request):
    """Create a new, unique user and save to the database.

    **Route**: `/session/create-user`

    **Request Type**: `POST`

    **Data Values**: `application/json` of `username`, `email`, and `password`.

    **Response**: 
    * `data`: Describes user object with `username`, `id`, and `email`.

    """
    data = json.loads(request.body.decode('utf-8'))

    # Check that all fields are existant
    if not all([x in data for x in ["email", "username", "password"]]):
        return Response({"message": "Invalid fields provided!", "response": "error"})
    
    # Check if user already exists
    if User.objects.filter(email=data["email"]).exists():
        return Response({"message": "User already exists!", "response": "error"})

    # Create user
    user = User.objects.create_user(email=data["email"], username=data["username"], password=data["password"])
    user.save()

    serializer = serializers.UserSerializer(user)

    return Response({'response': 'ok', "message": "User created!", "data": serializer.data})