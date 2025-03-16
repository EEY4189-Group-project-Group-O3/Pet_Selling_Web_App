from django.contrib import admin
# from .models import CustomUser
# admin.site.register(CustomUser)

from .models import UserProfile, CustomUser,SellerRequest
from notifications.serializers import NotificationCreateSerializer

admin.site.register(UserProfile)
admin.site.register(CustomUser)


class SellerRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "name", "contact_number", "is_approved")
    list_filter = ("is_approved",)
    actions = ["approve_sellers"]


    def approve_sellers(self, request, queryset):
        print("Approving sellers")
        for seller_request in queryset:
            if not seller_request.is_approved:
                seller_request.is_approved = True
                seller_request.save()
                seller_request.user.user_type = "seller"
                seller_request.user.save()

        notification = NotificationCreateSerializer(data={
                    "user": seller_request.user.id,
                    "message": f"Your seller request has been approved. Please login again to access seller features."
                    })
        if notification.is_valid():
            notification.save()
        else:
            print(notification.errors)

    def save_model(self, request, obj, form, change):
        if obj.is_approved and obj.user.user_type != "seller":
            obj.user.user_type = "seller"
            obj.user.save()
            notification = NotificationCreateSerializer(data={
                    "user": obj.user.id,
                    "message": f"Your seller request has been approved. Please login again to access seller features."
                    })
            if notification.is_valid():
                notification.save()
        super().save_model(request, obj, form, change)

admin.site.register(SellerRequest, SellerRequestAdmin)
