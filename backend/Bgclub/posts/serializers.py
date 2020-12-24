from rest_framework import serializers
from .models import Post
from .models import Comment
from .models import Like
from accounts.models import User
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer): 
    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    users = serializers.RelatedField(read_only=True)

    class Meta: 
        model = Post 
        fields = '__all__'

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

class ListPostSerializer(serializers.ModelSerializer): 
    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    user = UserSerializer(read_only=True)

    class Meta: 
        model = Post 
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer): 

    comments_user = serializers.RelatedField(read_only=True)
    comments_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class ListCommentSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    comments_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer): 

    likes_user = serializers.RelatedField(read_only=True)
    likes_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'


class ListLikeSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    likes_post = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Like 
        fields = '__all__'



