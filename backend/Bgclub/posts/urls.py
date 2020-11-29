from django.urls import path, re_path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('posts', views.PostView)

urlpatterns = [
    path('', include(router.urls)),
]
