from django.urls import path, re_path, include
from rest_framework import routers
from . import views

# app_name = 'core'


urlpatterns = [
    path('', views.ServiceListView.as_view(), name='list'),

    path('<int:pk>/', views.ServiceDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', views.ServiceUpdateView.as_view(), name='edit'),
    path('<int:pk>/delete/', views.ServiceDeleteView.as_view(), name='delete'),

    path('create/', views.ServiceCreateView.as_view(), name='create'),
]

