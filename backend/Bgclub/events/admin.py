from django.contrib import admin
from .models import Event
from .models import Comment
from .models import Like

admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Event)
