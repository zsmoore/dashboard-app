from django.db import models
from django.contrib.auth.models import User


class FoodItem(models.Model):

    name = models.CharField(max_length=256, default="", unique=True, db_index=True)

    users = models.ManyToManyField(User, related_name="food_items")

    class Meta:
        db_table = "food_tbl"

    def __str__(self):
        return self.name.title()


class Recipe(models.Model):

    title = models.CharField(max_length=256, default="", db_index=True)

    source = models.CharField(max_length=256, default="")

    recipe_id = models.IntegerField(default=0, unique=True)

    image_url = models.CharField(max_length=512, default="")

    ingredients = models.ManyToManyField(
        FoodItem,
        through='Ingredient',
        through_fields=('recipe', 'food_item'),
        related_name="recipes"
    )

    class Meta:
        db_table = "recipe_tbl"

    def __str__(self):
        return self.title.title()


class Ingredient(models.Model):

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE,null=True)

    description = models.CharField(max_length=256, default="")

    class Meta:
        db_table = "ingredient_tbl"

    def __str__(self):
        return "<Ingredient: %s>" % self.description.title()


