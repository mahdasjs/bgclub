from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
import copy
from .models import Event
from .serializers import EventSerializer
from .serializers import ListEventSerializer
from accounts.models import User

class EventCreateAPIView(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EventListAPIView(generics.ListAPIView):
    serializer_class = ListEventSerializer

    def get_queryset(self):
        user = User.objects.get(pk=self.kwargs['user_id'])
        queryset = Event.objects.filter(user = user)
        return queryset.order_by('-date')

class EventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.title = request.data.get('title', instance.title)
        instance.description = request.data.get('description', instance.description)
        instance.event_pic = request.data.get('event_pic', instance.event_pic)
        instance.number = request.data.get('number', instance.number)
        instance.address = request.data.get('address', instance.address)
        instance.event_date = request.data.get('event_date', instance.event_date)
        instance.event_time = request.data.get('event_time', instance.event_time)
        instance.save()
        serializer = EventSerializer(instance)
        return Response(serializer.data)
        def get_queryset(self):
            user = User.objects.get(pk=self.kwargs['user_id'])
            queryset = Event.objects.filter(user=user)
            return queryset