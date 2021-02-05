from django.db import models
from django.apps import apps
from accounts.models import User
from accounts.models import Profile

class Presell(models.Model):
	user = models.ForeignKey(User,related_name='presells_user',on_delete=models.CASCADE)
	name = models.CharField(max_length = 50, blank=True) 
	presell_pic = models.ImageField(blank=True , upload_to='image/')
	value = models.CharField( max_length = 10)
	startdate = models.CharField( max_length = 10)
	date = models.DateTimeField(auto_now_add=True)

	@property
	def comment_count(self):
  	  	return Comment.objects.filter(presell_id=self.id).count()

	def __str__(self):
		return self.bg_name

class Comment(models.Model):

    user = models.ForeignKey(User,related_name='comments_pre',on_delete=models.CASCADE,blank=True)
    text = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True,blank=True)
    presell = models.ForeignKey(Presell,related_name='comments_presell',on_delete=models.CASCADE,blank=True)

    def str(self):
        return self.text
