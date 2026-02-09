from django.core.management.base import BaseCommand
from core.models import Category, Article
import random
import string


def random_string(length=10):
    return ''.join(random.choices(string.ascii_lowercase, k=length))


class Command(BaseCommand):
    def handle(self, *args, **options):
        for _ in range(2):
            Category.objects.create(
                title=random_string(8)
            )

        category = Category.objects.first()

        for _ in range(20):
            Article.objects.create(
                title=random_string(20),
                author=random_string(10),
                body=random_string(200),
                category=category
            )
