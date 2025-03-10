from rest_framework.views import APIView
from django.db.models import Q
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from .models import Post, Post_Image, Post_Comment, Post_Likes,PostCategory
from . import serializers
# from .serializers import PostSerializer, PostImageSerializer, PostCommentSerializer, PostCreateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.uploadedfile import InMemoryUploadedFile
from utils.PaginationClass import PostPagination
from rest_framework import generics
from notifications.serializers import NotificationCreateSerializer
import json

class GetAllCategories(APIView):
    def get(self, request):
        categories = PostCategory.objects.all()
        serializer = serializers.PostCategorySerializer(categories, many=True)
        return Response(serializer.data, status=200)

class GetALlPost(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend]
    serializer_class = serializers.PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-date_time')
        category_id = self.request.query_params.get('category_id', None)
        keyword = self.request.query_params.get('keyword', None)
        
        if category_id:
            queryset = queryset.filter(categories__id=category_id)
        
        if keyword:
            queryset = queryset.filter(Q(text__icontains=keyword))
        
        return queryset


class PostView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        data = request.data.dict() if isinstance(request.data, dict) else request.data
        data['user'] = request.user.id
        images = request.FILES.getlist('images', None)

        print(data)

        if "images" in data:

            if "categories" in data:
                try:
                    json_categories = json.loads(data["categories"])
                    data["categories"] = [ i['id'] for i in json_categories]
                    print(data["categories"])
                except (json.JSONDecodeError, KeyError, ValueError) as e:
                    print(e)
                    return Response({"error": "Invalid categories format"}, status=status.HTTP_400_BAD_REQUEST)
        else:
             if "categories" in data:
                try:
                    json_categories = json.loads(data["categories"])
                    data["categories"] = [ i['id'] for i in json_categories][0]
                    print(data["categories"])
                except (json.JSONDecodeError, KeyError, ValueError) as e:
                    print(e)
                    return Response({"error": "Invalid categories format"}, status=status.HTTP_400_BAD_REQUEST)
        

        serializer = serializers.PostCreateSerializer(data=data)
        if serializer.is_valid():
            post = serializer.save()

            if images:
                for img in images:
                    Post_Image.objects.create(post=post, image=img)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PostImageList(APIView):
    def get(self, request):
        post_images = Post_Image.objects.all()
        serializer = serializers.PostImageSerializer(post_images, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.PostImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostCommentList(APIView):
    def get(self, request, pk):
        post = Post.objects.filter(pk=pk).first()
        if not post:
            return Response({"error": "Post not found"}, status=404)

        comments_data = Post_Comment.objects.filter(post=post)
        total_comments = comments_data.count()

        # Check if the current user liked/dislike
        user_commented = comments_data.filter(
            user__id=request.user.id).exists()

        comment_users_serialized = serializers.PostUserCommentSerializer(
            comments_data, many=True).data

        response_data = {
            "total_comments": total_comments,
            "user_comments": user_commented,
            "comment_users": comment_users_serialized,
        }

        return Response(response_data, status=200)

    def post(self, request, pk):
        post = Post.objects.get(pk=pk)

        data = {
            'text': request.data['comment'],
            'user': request.user.id,
            'post': pk
        }
        serializer = serializers.PostCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            notification = NotificationCreateSerializer(data={
                    "user": post.user.id,
                    "message": f"{request.user.username} commented your post '{data['text'][0:20]}...'"
                    })
            if notification.is_valid():
                notification.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAllLikes(APIView):
    def get(self, request, pk, *args, **kwargs):
        post = Post.objects.filter(pk=pk).first()

        if not post:
            return Response({"error": "Post not found"}, status=404)

        # Aggregate likes and dislikes
        likes_data = Post_Likes.objects.filter(post=post)
        total_likes = likes_data.filter(status='like').count()
        total_dislikes = likes_data.filter(status='dislike').count()

        # Check if the current user liked/dislike
        user_liked = likes_data.filter(
            user__id=request.user.id, status='like').exists()
        user_disliked = likes_data.filter(
            user__id=request.user.id, status='dislike').exists()

        liked_users_serialized = serializers.PostLikesSerializer(
            likes_data, many=True).data

        response_data = {
            "total_likes": total_likes,
            "total_dislikes": total_dislikes,
            "user_liked": user_liked,
            "user_disliked": user_disliked,
            "liked_users": liked_users_serialized,
        }

        return Response(response_data, status=200)


class AddorRemoveLike(APIView):
    def post(self, request, pk):
        post = Post.objects.get(id=pk)
        user = request.user.id
        if Post_Likes.objects.filter(user__id=user, post=post).exists():
            instance = Post_Likes.objects.get(user__id=user, post=post)
            instance.delete()
            return Response({"message": "data deleted successfully"}, status=status.HTTP_200_OK)

        data = {
            'status': "like",
            "user": user,
            "post": pk
        }
        serializer = serializers.PostLikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            if data['status'] == "like":
                notification = NotificationCreateSerializer(data={
                    "user": post.user.id,
                    "message": f"{request.user.username} liked your post"
                    })
                if notification.is_valid():
                    notification.save()
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddorRemoveDisLike(APIView):
    def post(self, request, pk):
        post = Post.objects.get(id=pk)
        user = request.user.id
        if Post_Likes.objects.filter(user__id=user, post=post).exists():
            instance = Post_Likes.objects.get(user__id=user, post=post)
            instance.delete()
            return Response({"message": "data deleted successfully"}, status=status.HTTP_200_OK)

        data = {
            'status': "dislike",
            "user": user,
            "post": pk
        }
        serializer = serializers.PostLikeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
