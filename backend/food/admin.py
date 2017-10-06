from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Recipe, FoodItem, Ingredient


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):

    list_display = ('title', 'recipe_id')


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):

    list_display = ('name',)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):

    list_display = ('description', )
