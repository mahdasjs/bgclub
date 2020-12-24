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

	@property
	def comment_count(self):
  	  	return Comment.objects.filter(event_id=self.id).count()


	@property
	def like_count(self):
		return Like.objects.filter(event_id=self.id).count()

	def __str__(self):
		return self.bg_name

class Comment(models.Model):

    user = models.ForeignKey(User,related_name='comments',on_delete=models.CASCADE,blank=True)
    text = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True,blank=True)
    event = models.ForeignKey(Event,related_name='comments_event',on_delete=models.CASCADE,blank=True)

    def str(self):
        return self.text

class Like(models.Model):
	user = models.ForeignKey(User,related_name='likes_user',on_delete=models.CASCADE,blank=True)
	event = models.ForeignKey(Event,related_name='likes_event',on_delete=models.CASCADE,blank=True)

	def str(self):
		return self.event

	def __str__(self):
		return self.title