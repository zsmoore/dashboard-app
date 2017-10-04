from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Scrapes food from Food2Fork'

    def add_arguments(self, parser):
        parser.add_argument('start_index', type=int)
        parser.add_argument('end_index', type=int)

    def handle(self, *args, **options):

        print(options["start_index"])
        print(options["end_index"])

        
        # Scraper code
        self.stdout.write(self.style.SUCCESS('Successfully saved Recipe!'))