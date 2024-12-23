from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Post_Image, Post_Comment, Post_Likes
from . import serializers
# from .serializers import PostSerializer, PostImageSerializer, PostCommentSerializer, PostCreateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.uploadedfile import InMemoryUploadedFile
from utils.PaginationClass import PostPagination
from rest_framework import generics


class GetALlPost(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-date_time')
    serializer_class = serializers.PostSerializer
    # pagination_class = PostPagination


class PostView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    # def get(self, request):
    #     posts = Post.objects.all()
    #     paginated_posts = self.paginate_queryset(posts)
    #     serializer = PostSerializer(paginated_posts, many=True)
    #     return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # Include the user in the data
        data = request.data.copy()
        data['user'] = request.user.id
        data['likes'] = 0
        data['dislikes'] = 0
        images = request.FILES.getlist('images', None)

        # Serialize and validate
        serializer = serializers.PostCreateSerializer(data=data)
        if serializer.is_valid():
            post = serializer.save()

            # Save images
            if images:
                for img in images:
                    Post_Image.objects.create(post=post, image=img)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # return Response(status=status.HTTP_201_CREATED)


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
            "liked_users": comment_users_serialized,
        }

        return Response(response_data, status=200)

    def post(self, request, pk):
        data = {
            'text': request.data['comment'],
            'user': request.user.id,
            'post': pk
        }
        serializer = serializers.PostCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
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
