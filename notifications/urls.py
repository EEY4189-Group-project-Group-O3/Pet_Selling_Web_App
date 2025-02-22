from django.urls import path
from .views import NotificationListCreateView, NotificationDetailView, MarkAsReadView,DebugWebSocketView

urlpatterns = [
    path('', NotificationListCreateView.as_view()),
    path('<int:pk>/', NotificationDetailView.as_view()),
    path('<int:pk>/mark-as-read/', MarkAsReadView.as_view()),
    
    # path('debug-websocket/', DebugWebSocketView.as_view()),
]
