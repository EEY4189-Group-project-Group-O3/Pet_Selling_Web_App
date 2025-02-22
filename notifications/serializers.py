from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Notification
from user.models import CustomUser
class NotificationSerializer(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Notification
        fields = ('id', 'user', 'message', 'read', 'created', 'updated')
        read_only_fields = ('id', 'created', 'updated')

class NotificationCreateSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'