from django.urls import path
from .views import PostView, PostImageList, PostCommentList, AddorRemoveLike
urlpatterns = [
    path('post/', PostView.as_view()),
    path('image/', PostImageList.as_view()),
    path('comment/', PostCommentList.as_view()),
    path('like/<int:pk>/', AddorRemoveLike.as_view()),

]
