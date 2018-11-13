from django.shortcuts import render
from django.views.generic.base import TemplateResponseMixin, View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Service


class ServiceModelMixin(object):
    model = Service

    def get_queryset(self):
        qs = super(ServiceModelMixin, self).get_queryset()
        return qs.filter(active=True)

    template_name = 'core/list.html'


class ServiceOwnerMixin(object):
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(User=self.request.user)


class ServicesListView(ServiceModelMixin, ListView):
    pass


class ServicesDetailView(ServiceModelMixin, DetailView):
    template_name = 'core/detail.html'


class MineOrders(ServiceOwnerMixin, ListView):
    template_name = 'core/list.html'

    def get_context_data(self, **kwargs):
        context = super(MineOrders, self).get_context_data(**kwargs)
        context['is_owner'] = 1
        return context
