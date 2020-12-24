from rest_framework import serializers
from .models import Event
from accounts.models import User
from accounts.serializers import UserProfileSerializer
from accounts.serializers import ProfileSerializer
from accounts.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer): 

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
