from django.contrib import admin
from .models import Post, Post_Image, Post_Comment, Post_Likes,PostCategory

admin.site.register(Post)
admin.site.register(Post_Image)
admin.site.register(Post_Comment)
admin.site.register(Post_Likes)
admin.site.register(PostCategory)

