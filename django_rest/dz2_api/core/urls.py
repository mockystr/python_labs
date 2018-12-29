from django.urls import path, re_path, include
from rest_framework import routers
from . import views

# app_name = 'core'


urlpatterns = [
    path('', views.ServiceListView.as_view(), name='list'),
    path('mine/', views.ServiceMineListView.as_view(), name='mine'),

    path('<int:pk>/', views.ServiceDetailView.as_view(), name='get'),
    path('create/', views.ServiceCreateView.as_view(), name='create'),
    path('edit/<int:pk>/', views.ServiceUpdateView.as_view(), name='update'),
    path('delete/<int:pk>/', views.ServiceDeleteView.as_view(), name='delete'),

    path('add/<int:pk>/', views.AddToBidsView.as_view(), name='add'),

]

