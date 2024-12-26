from rest_framework import serializers
from .models import Post, Post_Image, Post_Comment, Post_Likes


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Image
        fields = '__all__'


class PostUserCommentSerializer(serializers.ModelSerializer):
    user = serializers.JSONField(source='get_profile_data')

    class Meta:
        model = Post_Comment
        fields = ['user', 'text']


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Comment
        fields = '__all__'


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Likes
        fields = '__all__'


class PostLikesSerializer(serializers.ModelSerializer):
    # user_first_name = serializers.CharField(
    #     source='user.first_name', read_only=True)
    # user_profile_image = serializers.ImageField(
    #     source='user.profile_image', read_only=True)

    user = serializers.JSONField(source='get_profile_data')

    class Meta:
        model = Post_Likes
        fields = ['user']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['text', 'user']


class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(
        many=True, read_only=True, source='post_image_set')
    comments_count = serializers.SerializerMethodField()

    profile_data = serializers.JSONField(source='get_profile_data')

    class Meta:
        model = Post
        fields = ['id', 'text', 'date_time', 'user', 'images',
                  'comments_count', 'profile_data']

    def get_comments_count(self, obj):
        return Post_Comment.objects.filter(post=obj).count()
