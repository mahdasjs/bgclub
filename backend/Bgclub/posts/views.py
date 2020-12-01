from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError
from django.core.exceptions import ValidationError
import copy

from .models import Post
from .serializers import PostSerializer
from .serializers import ListPostSerializer
from accounts.models import User

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
		queryset = Post.objects.filter(user = self.kwargs['user_id'])
		return queryset.order_by('-date')

