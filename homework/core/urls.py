from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.ServicesListView.as_view(), name='list'),
    path('<int:pk>/<slug:slug>/', views.ServicesDetailView.as_view(), name='detail'),
    path('mine', views.MineOrders.as_view(), name='mine'),

    path('service/create/', views.CreateService.as_view(), name='create'),
    path('service/<int:pk>/edit', views.EditService.as_view(), name='edit'),
    path('service/<int:pk>/delete', views.DeleteService.as_view(), name='delete'),
]
