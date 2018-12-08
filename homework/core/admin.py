from django.contrib import admin
from .models import Service, Profile


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    readonly_fields = ('updated',)
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('active', 'updated')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass
