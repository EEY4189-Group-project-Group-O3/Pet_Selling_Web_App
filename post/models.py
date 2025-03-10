from django.db import models
from user.models import CustomUser
from user.models import UserProfile
import os
from django.utils import timezone
ORIGINAL_PHOTO_LOCATION = 'post_images'

class PostCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')

    def __str__(self):
        return self.name
class Post(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    categories = models.ManyToManyField(PostCategory, related_name="posts") 
    def get_profile_data(self):
        profile = UserProfile.objects.get(user=self.user)
        return {
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'profile_image': profile.profile_image.url
        }

    def __str__(self):
        return self.text


def event_photo_path(instance, filename):
    event_id = instance.post.id
    # make_date = event_date.split(' ')
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
    basefilename, file_extension = os.path.splitext(filename)
    return f'{ORIGINAL_PHOTO_LOCATION}/{event_id}/{timestamp}_{basefilename}{file_extension}'


class Post_Image(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='post_image_set')
    image = models.ImageField(upload_to=event_photo_path)
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return self.post.text


class Post_Comment(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def get_profile_data(self):
        profile = UserProfile.objects.get(user=self.user)
        return {
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'profile_image': profile.profile_image.url
        }


class Post_Likes(models.Model):
    status = models.CharField(max_length=10)
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def get_profile_data(self):
        profile = UserProfile.objects.get(user=self.user)
        return {
            'first_name': profile.first_name,
            'last_name': profile.last_name,
            'profile_image': profile.profile_image.url
        }
    
