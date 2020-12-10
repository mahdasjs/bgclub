from django.db import models
from django.apps import apps
from accounts.models import User
from accounts.models import Profile

class Event(models.Model):
	user = models.ForeignKey(User,related_name='events_user',on_delete=models.CASCADE)
	title = models.CharField(max_length = 50, blank=True) 
	description = models.CharField(blank=True , max_length = 1000) 
	event_pic = models.ImageField(blank=True , upload_to='image/')
	number = models.IntegerField() 
	address = models.CharField(blank=True , max_length = 1000)
	event_date = models.CharField( max_length = 10)
	event_time = models.CharField( max_length = 10)
	date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title