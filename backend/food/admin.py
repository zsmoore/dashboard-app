from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Recipe, FoodItem, Ingredient


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):

    list_display = ('title', 'recipe_id')


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):

    search_fields = ('name', 'id')
    list_display = ('name', 'id')


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):

    list_display = ('description', 'food_item', 'recipe')
    
