from django import forms
from django.forms import ModelForm
from .models import Service
from django.contrib.auth.models import User


class ServiceForm(ModelForm):
    class Meta:
        model = Service
        fields = ['name', 'description', 'photo', 'price', 'active']


