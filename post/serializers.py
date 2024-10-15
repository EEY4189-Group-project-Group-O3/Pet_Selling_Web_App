from rest_framework import serializers
from .models import Post, Post_Image, Post_Comment


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Image
        fields = '__all__'


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Comment
        fields = '__all__'


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    total_likes = serializers.IntegerField(read_only=True)  # Removed 'source'
    total_dislikes = serializers.IntegerField(
        read_only=True)  # Removed 'source'
    images = PostImageSerializer(
        many=True, read_only=True, source='post_image_set')  # Related images
    comments_count = serializers.SerializerMethodField()

    profile_data = serializers.JSONField(source='user.get_profile_data')

    class Meta:
        model = Post
        fields = ['id', 'text', 'date_time', 'user', 'images',
                  'comments_count', 'total_likes', 'total_dislikes', 'profile_data']

    def get_comments_count(self, obj):
        return Post_Comment.objects.filter(post=obj).count()
