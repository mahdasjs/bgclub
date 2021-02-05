from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/posts/', include('posts.urls')),
    path('api/v1/events/', include('events.urls')),
    path('api/v1/presells/', include('presells.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
