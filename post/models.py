from django.db import models
from user.models import CustomUser
import os
from django.utils import timezone
ORIGINAL_PHOTO_LOCATION = 'post_images'


class Post(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

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


class Post_Likes(models.Model):
    status = models.CharField(max_length=10)
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, unique=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
