from django.contrib import admin
from .models import IDK


@admin.register(IDK)
class IDKAdmin(admin.ModelAdmin):
    list_display = ['name']
