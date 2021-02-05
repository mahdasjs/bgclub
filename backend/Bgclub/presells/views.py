from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
import copy
from .models import Presell
from .models import Comment
from .serializers import PresellSerializer
from .serializers import ListPresellSerializer
from .serializers import CommentSerializer
from .serializers import ListCommentSerializer
from accounts.models import User

class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(presell=self.kwargs['pk'])
        return queryset

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CommentListAPIView(generics.ListAPIView):
    serializer_class = ListCommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(presell=self.kwargs['pk'])
        return queryset

class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.text = request.data.get('text', instance.text)
        instance.save()
        serializer = CommentSerializer(instance)
        return Response(serializer.data)


class ProfilePresellCreateAPIView(generics.CreateAPIView):
    serializer_class = PresellSerializer

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfilePresellListAPIView(generics.ListAPIView):
	serializer_class = ListPresellSerializer

	def get_queryset(self):
		user = User.objects.get(pk=self.kwargs['user_id'])
		queryset = Presell.objects.filter(user = user)
		return queryset.order_by('-date')


class ProfilePresellRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ListPresellSerializer
    queryset = Presell.objects.all()

