from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
import copy

from .models import Post
from .models import Comment
from .models import Like
from .serializers import PostSerializer
from .serializers import ListPostSerializer
from .serializers import CommentSerializer
from .serializers import ListCommentSerializer
from .serializers import LikeSerializer
from .serializers import ListLikeSerializer
from accounts.models import User


class LikeCreateAPIView(generics.CreateAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        queryset = Like.objects.filter(post=self.kwargs['pk'])
        return queryset

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class LikeListAPIView(generics.ListAPIView):
    serializer_class = ListLikeSerializer

    def get_queryset(self):
        queryset = Like.objects.filter(post=self.kwargs['pk'])
        return queryset

class LikeRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = ListLikeSerializer

class CommentCreateAPIView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(post=self.kwargs['pk'])
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
        queryset = Comment.objects.filter(post=self.kwargs['pk'])
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


class ProfilePostCreateAPIView(generics.CreateAPIView):
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        serializer_data = request.data.copy()
        serializer_data.update({'user':request.user.id})
        serializer = self.get_serializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfilePostListAPIView(generics.ListAPIView):
	serializer_class = ListPostSerializer

	def get_queryset(self):
		user = User.objects.get(pk=self.kwargs['user_id'])
		queryset = Post.objects.filter(user = user)
		return queryset.order_by('-date')


class ProfilePostRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ListPostSerializer
    queryset = Post.objects.all()

