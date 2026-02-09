from django.db import models


from .base import SluggedMixin
from . import Category



class Article(SluggedMixin):
    body = models.TextField()
    author = models.CharField(max_length=128)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='articles'
    )
    
    def __str__(self):
        return f'{self.title}'