from rest_framework import serializers
from .models import Presell
from .models import Comment
from accounts.models import User
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer

class PresellSerializer(serializers.ModelSerializer): 
    comment_count = serializers.ReadOnlyField()
    presells_user = serializers.RelatedField(read_only=True)

    class Meta: 
        model = Presell
        fields = '__all__'

    def create(self, validated_data):
        presell = Presell.objects.create(**validated_data)
        return presell

class ListPresellSerializer(serializers.ModelSerializer): 
    comment_count = serializers.ReadOnlyField()
    user = UserSerializer(read_only=True)

    class Meta: 
        model = Presell
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer): 

    comments_pre = serializers.RelatedField(read_only=True)
    comments_presell = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'

class ListCommentSerializer(serializers.ModelSerializer): 

    user = UserSerializer(read_only=True)
    comments_presell = serializers.RelatedField(read_only=True)
    
    class Meta: 
        model = Comment 
        fields = '__all__'
