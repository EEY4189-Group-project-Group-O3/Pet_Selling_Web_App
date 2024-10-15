from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Post_Image, Post_Comment
from .serializers import PostSerializer, PostImageSerializer, PostCommentSerializer, PostCreateSerializer


class PostView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostImageList(APIView):
    def get(self, request):
        post_images = Post_Image.objects.all()
        serializer = PostImageSerializer(post_images, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostCommentList(APIView):
    def get(self, request):
        post_comments = Post_Comment.objects.all()
        serializer = PostCommentSerializer(post_comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddorRemoveLike(APIView):
    def post(self, request, pk):
        post = Post.objects.get(id=pk)
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'message': 'Like removed'}, status=status.HTTP_200_OK)
        post.likes.add(user)
        return Response({'message': 'Like added'}, status=status.HTTP_200_OK)
