from django.urls import path, re_path, include
from . import views

urlpatterns = [
 path('list/<int:user_id>', views.EventListAPIView.as_view()),
     path('create/', views.EventCreateAPIView.as_view()),
     path('<int:pk>', views.EventRetrieveUpdateDestroyAPIView.as_view()),
]