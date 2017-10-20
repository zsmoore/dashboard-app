import json
import random
import urllib.request
from urllib.parse import urlencode

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes

from food.models import FoodItem, Recipe, Ingredient
from food import serializers


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def search(request):
    """Given a string `partial`, returns a list of all food items that the string `partial` could represent. I would reccommend only calling this if the autocomplete box has a certain number of characters, or else this could return _a lot_.

    **Route**: `/food/autocomplete`

    **Request Type**: `GET`

    **Data Values**: `GET` parameter `partial` of food to search for.

    **Example**: `api.whoshungry.io/food/autocomplete?partial=bana`

    **Response**:
    * `items`: List of food items that match the search, with each item having the keys `name` and `id`.

    """
    items = dict(request.GET)

    if 'ingredient' not in items:
        count = Recipe.objects.count()

        ids = random.sample(range(1, count), min(count - 1, 20))

        recipes = Recipe.objects.filter(id__in=ids).all()

        serializer = serializers.RecipeSerializer(recipes, many=True)

        data = {'response': 'ok', 'recipes': serializer.data}

        return JsonResponse(data)

    
    try:
        item_ids = [int(i) for i in items['ingredient']]

        food_items = FoodItem.objects.filter(id__in=item_ids).all()

        ingredients = Ingredient.objects.filter(food_item__id__in=item_ids).values_list('recipe_id', flat=True)

        recipes = Recipe.objects.filter(id__in=ingredients).all()

    except ValueError:
        return JsonResponse({'response': 'error', 'message': 'Ingredients must be of type integer!'})

    serializer = serializers.RecipeSerializer(recipes, many=True)

    data = {'response': 'ok', 'recipes': serializer.data}

    return JsonResponse(data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_matching_foods(request):
    """Given Food Item IDs (preferably from autocomplete entry above), this will return a list of recipes that use those food items. 

    **Route**: `/food/search`

    **Request Type**: `GET`

    **Data Values**: `GET` parameter `ingredient` of ID of FoodItem to search for (which comes from autocomplete). Can have multiple `ingredients`. No ingredients will return at most 20 random recipes.

    **Example**: `api.whoshungry.io/food/search?ingredient=3&ingredient=5` or `api.whoshungry.io/food/search`

    **Response**:
    * `recipes`: List of recipe objects, each containing the keys `title`, `source`, `image_url`.
    """

    get_params = dict(request.GET)

    if 'partial' in get_params:

        food_items = FoodItem.objects.filter(name__contains=get_params['partial'][0]).all()

        print(food_items)

        serializer = serializers.FoodItemSerializer(food_items, many=True)

        return JsonResponse({'response': 'ok', 'items': serializer.data})


    return JsonResponse({'response': 'error', 'message': 'GET parameter \'partial\' is required!'})


@api_view(['GET'])
@permission_classes([])
def persist_ingredient(request):

    get_params = dict(request.GET)
    user = request.user

    # If no ingredient provided, return the current user's list
    if 'ingredient' not in get_params:
        food_items = user.food_items.all()
        serializer = serializers.FoodItemSerializer(food_items, many=True)
        return JsonResponse({'response': 'ok', 'items': serializer.data})

    try:
        food_item = FoodItem.objects.filter(
            id=int(get_params['ingredient'][0])
        ).first()
    except Exception as er:
        return JsonResponse({'response': 'error', 'message': 'Could not find ingredient.'})

    if not food_item:
        return JsonResponse({'response': 'error', 'message': 'Could not find ingredient.'})

    # Add or remove ingredient
    if user in food_item.users.all():
        food_item.users.remove(user)
    else:
        food_item.users.add(user)

    food_item.save()

    return JsonResponse({'response': 'ok', 'message': 'Ingredients Updated!'})


    

    
