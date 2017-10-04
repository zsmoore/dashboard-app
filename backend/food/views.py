import json
import urllib.request
from urllib.parse import urlencode

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.conf import settings


def search(request):
    items = dict(request.GET)

    key = "?key=%s" % settings.FOOD2FORK_KEY

    if len(items.get('ingredient', [])) > 0:
        params = key + "&q=" + ",".join(items["ingredient"])
    else:
        params = key

    url = "http://food2fork.com/api/search%s" % params 

    req = urllib.request.Request(url=url,data=b'None',headers={'User-Agent':' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0'})

    f = urllib.request.urlopen(req)
    data = json.loads(f.read().decode("utf-8"))

    return JsonResponse(data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def save_recipe(request):

    if request.method == 'POST':

        body = request.body
        if not isinstance(body, str):
            body = body.decode('utf-8')

        data = json.loads(body)

        if 'recipeId' not in data:
            return JsonResponse({"response": "error", "message": "recipeId required!"})

        params = "?key=%s&rId=" % (settings.FOOD2FORK_KEY, data['recipeId'])

        url = 'http://food2fork.com/api/get' % params 

        req = urllib.request.Request(url=url,data=b'None',headers={'User-Agent':' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0'})

        f = urllib.request.urlopen(req)
        resp = json.loads(f.read().decode("utf-8"))

        return JsonResponse({"response": "ok", "message": "Successfully saved recipe!"})

    return JsonResponse({"response": "error", "message": "Something went wrong saving recipe!"})