from django.core.management.base import BaseCommand, CommandError
from food.models import Ingredient, Recipe, FoodItem
import time
import urllib
import json
import re
import nltk

class Command(BaseCommand):
    help = 'Scrapes food from Food2Fork'

    def add_arguments(self, parser):
        parser.add_argument('start_index', type=int)
        parser.add_argument('end_index', type=int)

    def handle(self, *args, **options):
        try:
            nltk.download('punkt')
            nltk.download('averaged_perceptron_tagger')
        except:
            pass

        apiKeys = ["1739339cd0f675afd13732a66d50b7b8", "39f04546d837b12ad25e4a6c29287088", "4c86af9e7883ecea4821ef5eea3a4cec", "89ab6349ec0ff685cbc1ac7f5bb8469e"]
        unwantedWords = ["1", "2", "3", "3", "4", "5", "6", "7", "8", "9", "0", "/", "thawed", "package", "room", "temperature", "can", "bottle", "pinch", "dash", "slice", "ounce", "cup", "pound", "teaspoon", "tablespoon", "tsp", "tbsp", "diced", "ground",  "ripe"]
        parenRemover = re.compile(r'\(.+\)')

        startId = options["start_index"]
        endId = options["end_index"]
        keyIndex = 1;

        for x in range(startId, endId):
            print("Trying id "+str(x))
            url = "http://food2fork.com/api/get?"
            getData = "key="+apiKeys[keyIndex]+"&rId="+str(x)
            request = urllib.request.Request(url+getData,data=b'None',headers={'User-Agent':' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0'})        
            response = urllib.request.urlopen(request)

            obj = json.loads(response.read().decode('utf-8'))
            if 'recipe' not in obj:
                print(obj)
                continue
            if len(obj['recipe'])>0:
                recipeTitle = obj['recipe']['title']
                recipeImageUrl = obj['recipe']['image_url']
                recipeId = obj['recipe']['recipe_id']
                recipeUrl = obj['recipe']['source_url']
                print(recipeId)
                recipeObj = Recipe.objects.create(title=recipeTitle,source=recipeUrl,recipe_id=recipeId,image_url=recipeImageUrl)
                print("Created recipe: "+recipeTitle)

                ingredients = obj['recipe']['ingredients']
                for i in ingredients:
                    original = i

                    # Remove unwanted words
                    for word in unwantedWords:
                        i = i.replace(word+"s",'')
                        i = i.replace(word,'')

                    # Remove weirdness
                    i = i.replace("&amp;", '&')
                    i = i.replace("&nbsp;", ' ')

                    # Remove leading whitespace
                    i = i.lstrip()

                    # Remove anything between parenthesis
                    m = parenRemover.match(i)
                    while m!=None:
                        i = i.replace(m.group(),'')
                        m = parenRemover.match(i)

                    # Remove anything after first comma
                    s = i.split(',')
                    i = s[0]

                    # Remove anything after the first hyphen
                    s = i.split(',')
                    i = s[0]
                    
                    # Remove anything between '&' and ';'
                    ampPos = i.find('&')
                    while ampPos!=-1:
                        semiColonPos = i.find(';')
                        if semiColonPos!=-1:
                            i = i[:ampPos] + i[semiColonPos+1:]
                        else:
                            break # Probably supposed to be there

                    # Remove anything not a noun
                    tokens = nltk.word_tokenize(i)
                    tags = nltk.pos_tag(tokens)
                    i = ''
                    for t in tags:
                        if t[1][0]=='N':
                            i = i + ' ' + t[0]

                    # Remove leading whitespace
                    i = i.lstrip()

                    # Lower case
                    i = i.lower()

                    # Add
                    ingredient = Ingredient.objects.create(recipe=recipeObj,description=original)
                    if len(i)>0:
                        item = FoodItem.objects.filter(name=i).first()
                        if not item:
                            item = FoodItem.objects.create(name=i)
                        ingredient.food_item = item
                        ingredient.save()

            else:
                print("Empty recipe")

            time.sleep(0.02)
            keyIndex = keyIndex + 1
            if keyIndex>=len(apiKeys):
                keyIndex = 0
        
        # Scraper code
        self.stdout.write(self.style.SUCCESS('Successfully saved Recipe!'))
