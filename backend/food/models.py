from django.db import models


class Recipe(models.Model):

    f2f_url = models.CharField(max_length=256, default="")

    title = models.CharField(max_length=256, default="")

    source = models.CharField(max_length=256, default="")

    recipe_id = models.IntegerField(default=0, unique=True)

    image_url = models.CharField(max_length=512, default="")

    class Meta:
        db_table = "recipe_tbl"
