from rest_framework import serializers
from .models import Event
from .models import Comment
from .models import Like
from accounts.models import User
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer): 
	comment_count = serializers.ReadOnlyField()
	like_count = serializers.ReadOnlyField()
	events_user = serializers.RelatedField(read_only=True)

	class Meta: 
	    model = Event
	    fields = '__all__'

	def create(self, validated_data):
	    event = Event.objects.create(**validated_data)
	    return event

class ListEventSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)

    class Meta: 
        model = Event 
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer): 

    comments = serializers.RelatedField(read_only=True)
    comments_event = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class ListCommentSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    comments_event = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer): 

    likes_user = serializers.RelatedField(read_only=True)
    likes_event = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'


class ListLikeSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    likes_event = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'

