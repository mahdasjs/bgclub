from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('profile/list/<int:user_id>', views.ProfilePostListAPIView.as_view()),
    path('profile/create/', views.ProfilePostCreateAPIView.as_view()),
    path('profile/<int:pk>', views.ProfilePostRetrieveDestroyAPIView.as_view()),
    path('comment/create/', views.CommentCreateAPIView.as_view()),
    path('comment/list/<int:pk>', views.CommentListAPIView.as_view()),
    path('comment/<int:pk>', views.CommentRetrieveUpdateDestroyAPIView.as_view()),

]
