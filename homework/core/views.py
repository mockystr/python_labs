from django.shortcuts import render, HttpResponse, redirect
from django.views.generic.base import TemplateResponseMixin, View
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Service
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import ServiceForm
from django.shortcuts import get_object_or_404
from django.views.generic.edit import FormView
from django.template.defaultfilters import slugify
from unidecode import unidecode
from django.urls import reverse_lazy, reverse
from braces.views import CsrfExemptMixin, JsonRequestResponseMixin
from django.core.exceptions import ValidationError
from django.http import Http404


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


class ServicesListView(LoginRequiredMixin, ServiceModelMixin, ListView):
    paginate_by = 5


class ServicesDetailView(ServiceModelMixin, CsrfExemptMixin, JsonRequestResponseMixin, DetailView):
    template_name = 'core/detail.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.object.customer == self.request.user:
            context['is_owner'] = 1
            context['list_customers'] = self.object.bids.all()
        else:
            context['is_in_list'] = 1 if self.request.user in self.object.bids.all() else 0
        return context

    def post(self, request, *args, **kwargs):
        self.get_object().bids.add(request.user)
        return redirect(reverse_lazy('core:detail',
                                     kwargs={'pk': self.get_object().id,
                                             'slug': self.get_object().slug}))


class MineOrders(LoginRequiredMixin, ServiceOwnerMixin, ListView):
    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)

        context['form'] = ServiceForm
        return context


class CreateService(CsrfExemptMixin, JsonRequestResponseMixin, CreateView):
    form_class = ServiceForm
    success_url = reverse_lazy('core:mine')

    def get(self, request, *args, **kwargs):
        try:
            super().get(args, kwargs)
        except:
            return redirect(reverse_lazy('core:mine'))

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.customer = self.request.user
            form.instance.slug = slugify(unidecode(form.instance.name))

            return super().form_valid(form)
        return redirect(reverse_lazy('account:login'))


class EditService(LoginRequiredMixin, UpdateView):
    model = Service
    success_url = reverse_lazy('core:mine')
    template_name = 'core/edit.html'
    form_class = ServiceForm

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.slug = slugify(unidecode(form.instance.name))

            return super().form_valid(form)
        return redirect(reverse_lazy('account:login'))


class DeleteService(LoginRequiredMixin, DeleteView):
    model = Service
    success_url = reverse_lazy('core:mine')

    def get_object(self, queryset=None):
        obj = super().get_object()
        if not obj.customer == self.request.user:
            raise Http404
        return obj

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
