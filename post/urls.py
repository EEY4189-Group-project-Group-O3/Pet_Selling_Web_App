from django.urls import path
from .views import PostView, PostImageList, PostCommentList, AddorRemoveLike, AddorRemoveDisLike, GetALlPost, GetAllLikes
urlpatterns = [
    path('post/all', GetALlPost.as_view()),

    path('post/', PostView.as_view()),
    path('image/', PostImageList.as_view()),
    # path('comment/', PostCommentList.as_view()),
    path('likes/<int:pk>', GetAllLikes.as_view()),
    path('like/<int:pk>', AddorRemoveLike.as_view()),
    path('dislike/<int:pk>', AddorRemoveDisLike.as_view()),
    path('comments/<int:pk>', PostCommentList.as_view()),


]
