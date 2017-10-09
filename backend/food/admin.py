from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Recipe, FoodItem, Ingredient


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 0


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):

    list_display = ('title', 'recipe_id')

    search_fields = ('title', 'recipe_id')

    inlines = (IngredientInline,)


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):

    search_fields = ('name', 'id')
    list_display = ('name', 'id')
    
    inlines = (IngredientInline,)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):

    list_display = ('description', 'food_item', 'recipe')
    
