from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^search$', views.search, name="search"),
    url(r'^save-recipe$', views.save_recipe, name="save-reciple"),
]