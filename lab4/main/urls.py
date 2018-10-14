from django.urls import path, re_path
from . import views

app_name = 'main'

urlpatterns = [
    re_path(r'(?P<city>\w+)/(?P<category>\w+)/(?P<item_slug>[\w\-\:/.]+)/$', views.ProductDetailView.as_view(),
            name='detail_view'),
    # path('<slug:city>/<slug:category>/<slug:item_slug>', views.ProductDetailView.as_view(), name='detail_view'),
    path('', views.ProductsListView.as_view(), name="list_view"),
]
