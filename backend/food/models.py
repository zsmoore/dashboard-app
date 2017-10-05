from django.db import models

class FoodItem(models.Model):

    name = models.CharField(max_length=256, default="")

    class Meta:
        db_table = "food_tbl"


class Recipe(models.Model):

    title = models.CharField(max_length=256, default="")

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


class Ingredient(models.Model):

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)

    amount = models.IntegerField(default=1)

    description = models.CharField(max_length=256, default="")

    class Meta:
        db_table = "ingredient_tbl"


