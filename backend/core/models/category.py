from django.db import models


from .base import SluggedMixin


class Category(SluggedMixin):
    
    def __str__(self):
        return f'{self.title}'