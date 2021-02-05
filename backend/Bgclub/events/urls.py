from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('list/<int:user_id>', views.EventListAPIView.as_view()),
    path('create/', views.EventCreateAPIView.as_view()),
    path('<int:pk>', views.EventRetrieveUpdateDestroyAPIView.as_view()),
    path('comment/create/', views.CommentCreateAPIView.as_view()),
    path('comment/list/<int:pk>', views.CommentListAPIView.as_view()),
    path('comment/<int:pk>', views.CommentRetrieveUpdateDestroyAPIView.as_view()),
    path('like/create/', views.LikeCreateAPIView.as_view()),
    path('like/list/<int:pk>', views.LikeListAPIView.as_view()),
    path('like/<int:pk>', views.LikeRetrieveDestroyAPIView.as_view()),
    path('homepage/', views.HomePageEventListAPIView.as_view()), 
    path('homepage/<int:pk>', views.HomePageEventRetrieveAPIView.as_view()), 
]