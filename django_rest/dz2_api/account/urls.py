from django.urls import path, re_path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('register/', views.UserCreate.as_view()),

    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    path('<str:username>/', views.GetProfileView.as_view(), name='get'),
    path('edit/', views.ProfileUpdateView.as_view(), name='update'),
    path('delete/', views.UserDeleteView.as_view(), name='delete'),
]

