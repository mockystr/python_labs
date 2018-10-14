from django.shortcuts import render
from django.shortcuts import redirect, get_object_or_404
from django.views.generic.base import TemplateResponseMixin, View
from django.views.generic.list import ListView
from django.http import HttpResponse, JsonResponse, Http404
from django.template.loader import render_to_string
from . import avito_parser


class ProductsListView(TemplateResponseMixin, View):
    template_name = 'main/list.html'

    def get(self, request):
        if request.GET.get("product"):
            url_query = "https://www.avito.ru/moskva?s_trg=3&q={}".format(request.GET.get("product"))
            products = avito_parser.get_page_data(avito_parser.get_html(url_query), max_products=5)
            html = render_to_string("main/container_of_list.html",
                                    {'is_ajax_query': 1,
                                     'products': products,
                                     'url_query': url_query})
            return HttpResponse(html)
        return self.render_to_response({})


class ProductDetailView(TemplateResponseMixin, View):
    template_name = 'main/detail.html'
    base_avito_url = "https://www.avito.ru"

    def get(self, request, city, category, item_slug):
        url_query = self.base_avito_url + request.get_full_path()
        product = avito_parser.detail_product_data(avito_parser.get_html(url_query))
        return self.render_to_response({'item': product})
