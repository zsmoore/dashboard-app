from rest_framework import serializers

from food.models import FoodItem, Recipe


class FoodItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodItem
        fields = ('name', 'id')


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = ('title', 'source', 'image_url')