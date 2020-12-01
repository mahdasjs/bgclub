from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('profile/list/<int:user_id>', views.ProfilePostListAPIView.as_view()),
     path('profile/create/', views.ProfilePostCreateAPIView.as_view()),
]
