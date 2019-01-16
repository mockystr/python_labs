from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserCreate.as_view()),

    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

    path('edit/', views.ProfileUpdateView.as_view(), name='update'),
    path('delete/', views.UserDeleteView.as_view()),

    path('id/<int:pk>/', views.GetProfileByIdView.as_view(), name='getById'),
    path('username/<str:username>/', views.GetProfileByUsernameView.as_view(), name='getByUsername'),
]
