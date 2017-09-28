import json
import urllib.request

from django.shortcuts import render
from django.http import JsonResponse

from django.conf import settings

def search(request):
    items = request.GET

    url = "http://food2fork.com/api/search?key=3f39daf4dacbdd464f0b33e09b82d18b" # % settings.FOOD2FORK_KEY

    req = urllib.request.Request(url=url,data=b'None',headers={'User-Agent':' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0'})

    f = urllib.request.urlopen(req)
    data = json.loads(f.read())

    return JsonResponse(data)
