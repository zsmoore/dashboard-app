import json
import urllib.request
from urllib.parse import urlencode

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

from food.models import FoodItem, Recipe, Ingredient
from food import serializers


def search(request):
    items = dict(request.GET)

    if 'ingredient' not in items:
        return JsonResponse({'response': 'ok', 'message': "Must have GET parameter 'ingredient'."})
    
    try:
        item_ids = [int(i) for i in items['ingredient']]

        ingredients = Ingredient.objects.filter(food_item__id__in=item_ids).values_list('recipe_id', flat=True)

    except ValueError:
        return JsonResponse({'response': 'error', 'message': 'Ingredients must be of type integer!'})

    recipes = Recipe.objects.filter(ingredients__in=ingredients).all()

    serializer = serializers.RecipeSerializer(recipes, many=True)

    data = {'response': 'ok', 'recipes': serializer.data}

    return JsonResponse(data)


def get_matching_foods(request):

    get_params = dict(request.GET)

    if 'partial' in get_params:

        food_items = FoodItem.objects.filter(name__contains=get_params['partial'][0]).all()

        print(food_items)

        serializer = serializers.FoodItemSerializer(food_items, many=True)

        return JsonResponse({'response': 'ok', 'items': serializer.data})


    return JsonResponse({'response': 'error', 'message': 'GET parameter \'partial\' is required!'})
    
