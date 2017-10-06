from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^search$', views.search, name="search"),
    url(r'^autocomplete$', views.get_matching_foods, name='autocomplete'),
]