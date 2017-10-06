from rest_framework import serializers

from food.models import FoodItem


class FoodItemSerializer(serializers.ModelSerializer):

    model = FoodItem
    fields = ('name', 'id')