from django.db import models


class IDK(models.Model):
    name = models.CharField(max_length=100, blank=False)
    available = models.BooleanField(default=True)
