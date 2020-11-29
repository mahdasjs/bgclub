from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.HyperlinkedModelSerializer): 
    class Meta: 
        model = Post 
        fields = ('id','url', 'bg_name', 'description', 'post_pic', 'number', 'rent_price', 'sell_price')

