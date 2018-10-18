from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic.base import TemplateResponseMixin, View
from .models import IDK


class EditedListView(ListView):
    queryset = IDK.objects.filter(available=True)
    template_name = 'main/index.html'
