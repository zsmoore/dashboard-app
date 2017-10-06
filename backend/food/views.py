import json
import urllib.request
from urllib.parse import urlencode

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

from food.models import FoodItem
from food import serializers


def search(request):
    items = dict(request.GET)

    data = {}

    return JsonResponse(data)


def get_matching_foods(request):

    get_params = dict(request.GET)

    if 'partial' in get_params:
        food_items = FoodItem.objects.filter(name__contains=get_params['partial']).all()

        serializer = serializers.FoodItemSerializer(food_items, many=True)

        return JsonResponse({'response': 'ok', 'items': serializer.data})


    return JsonResponse({'response': 'error', 'message': 'GET parameter \'partial\' is required!'})
    
