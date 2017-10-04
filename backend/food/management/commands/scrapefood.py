from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Scrapes food from Food2Fork'

    def add_arguments(self, parser):
        # parser.add_argument('poll_id', nargs='+', type=int)
        pass

    def handle(self, *args, **options):

        # Scraper code
        self.stdout.write(self.style.SUCCESS('Successfully saved Recipe!'))