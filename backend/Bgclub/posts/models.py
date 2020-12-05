from django.db import models
from django.apps import apps

from accounts.models import User
from accounts.models import Profile

class Post(models.Model):
	user = models.ForeignKey(User,related_name='users',on_delete=models.CASCADE)
	bg_name = models.CharField(max_length = 50, blank=True) 
	description = models.CharField(blank=True , max_length = 400) 
	post_pic = models.ImageField(blank=True , upload_to='image/')
	number = models.IntegerField() 
	rent_price = models.CharField(blank=True , max_length = 10)
	sell_price = models.CharField(blank=True , max_length = 10)
	date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.bg_name


