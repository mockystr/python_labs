from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.ServicesListView.as_view(), name='list'),
    path('<int:id>/<slug:slug>/', views.ServicesDetailView.as_view(), name='detail'),
    path('mine', views.MineOrders.as_view(), name='mine'),

    path('service/create/', views.CreateView, name='create'),
]
