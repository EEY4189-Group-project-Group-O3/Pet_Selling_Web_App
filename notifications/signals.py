from django.db.models.signals import post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Notification

@receiver(post_save, sender=Notification)
def notify_users(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        group_name = f"user_{instance.user.id}"
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "send_notification",
                "message": {
                    "id": instance.id,
                    "user": instance.user.id,
                    "read": instance.read,
                    "message": instance.message,
                    "created": instance.created.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),  
                    "updated": instance.updated.strftime("%Y-%m-%dT%H:%M:%S.%fZ")  
                }
            }
        )
