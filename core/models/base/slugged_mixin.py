from django.db import models
from django.utils.text import slugify

from .time_stamp_mixin import TimeStampMixin


class SluggedMixin(TimeStampMixin):
    title = models.CharField(
        max_length=255
    )
    slug = models.SlugField(
        max_length=255,
        allow_unicode=True,
        blank=True,
        unique=True
    )
    
    def save(self, *args, **kwargs):
        if not self.slug or self.title:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)
    
    class Meta:
        abstract = True