from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Notification
from .serializers import NotificationSerializer,NotificationCreateSerializer

class NotificationListCreateView(generics.ListCreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

class MarkAsReadView(APIView):
    def post(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk, user=request.user.id)
        notification.read = True
        notification.save()
        return Response({"message": "Notification marked as read."}, status=200)
    

class DebugWebSocketView(APIView):
    def post(self, request):
        notification = {
            "user":request.user.id,
            "message":"This is a test WebSocket notification!"
        }
        serializer = NotificationCreateSerializer(data=notification)
        if serializer.is_valid():
            serializer.save()

        return Response({"message": "Notification created!", "data": serializer.data}, status=201)
