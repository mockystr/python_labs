from django.shortcuts import render, HttpResponse
from django.views.generic.base import TemplateResponseMixin, View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Service
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import ServiceForm
from django.shortcuts import get_object_or_404
from django.views.generic.edit import FormView


class ServiceModelMixin(object):
    model = Service

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(active=True)

    template_name = 'core/list.html'


class ServiceOwnerMixin(object):
    model = Service
    template_name = 'core/mine.html'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(customer=self.request.user)


class ServicesListView(ServiceModelMixin, ListView):
    pass


class ServicesDetailView(ServiceModelMixin, DetailView):
    template_name = 'core/detail.html'


class MineOrders(ServiceOwnerMixin, ListView):
    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['form'] = ServiceForm
        return context


class CreateService(View):
    def post(self, request):
        form = ServiceForm(self.request.POST)

    # def form_valid(self, form):
    #     form.instance.customer = self.request.user
    #     return super().form_valid()

# def get_context_data(self, **kwargs):
#     context = super().get_context_data(**kwargs)
#     if 'id' in kwargs:
#         service_item = get_object_or_404(Service, id=kwargs['id'])
#         context['form'] = CreateEditServiceForm(instance=service_item)
#     else:
#         context['form'] =
#     return context
