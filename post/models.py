from django.db import models
from user.models import CustomUser


class Post(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        CustomUser, related_name='post_likes', null=True, blank=True)
    dislikes = models.ManyToManyField(
        CustomUser, related_name='post_dislikes', null=True, blank=True)

    def __str__(self):
        return self.text

    def total_likes(self):
        return self.likes.count()

    def total_dislikes(self):
        return self.dislikes.count()


class Post_Image(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='post_image_set')
    image = models.ImageField(upload_to='post_images/')
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return self.post.text


class Post_Comment(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
