# # serializers.py
# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.utils import timezone
# User = get_user_model()


# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name',
#                   'address', 'profile_image', 'gender', 'phone', 'password', 'user_type']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         user = super().create(validated_data)
#         if password:
#             user.set_password(password)
#             user.save()
#         return user


# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)

#         # Update last_login field manually
#         self.user.last_login = timezone.now()
#         self.user.save(update_fields=['last_login'])

#         # Add custom user data to the response
#         data['user'] = CustomUserSerializer(self.user).data
#         return data


from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils import timezone
from .models import CustomUser, UserProfile,SellerRequest


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'user_type']

    def create(self, validated_data):
        # Ensure is_active is set to True
        validated_data['is_active'] = True
        user = CustomUser.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(source="user.user_type", read_only=True)
    class Meta:
        model = UserProfile
        fields = ['email', 'first_name', 'last_name',
                  'phone', 'address', 'gender', 'profile_image', 'user_type']

    def create(self, validated_data):
        user = self.context['request'].user
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile


# class UserWithProfileSerializer(serializers.ModelSerializer):
#     profile = UserProfileSerializer(source='profile', read_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'user_type', 'is_active',
#                   'is_staff', 'is_superuser', 'profile']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Update last_login field manually
        self.user.last_login = timezone.now()
        self.user.save(update_fields=['last_login'])

        return data


class SellerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerRequest
        fields = '__all__'