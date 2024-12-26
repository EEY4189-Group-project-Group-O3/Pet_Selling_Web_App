# # views.py
# from rest_framework import generics
# from rest_framework.permissions import AllowAny
# from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth import get_user_model

# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated


# User = get_user_model()


# class CustomUserCreateView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = CustomUserSerializer


# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer


# class LogoutView(APIView):
#     def post(self, request):

#         try:
#             refresh_token = request.data["refresh"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({"detail": "Successfully logged out"}, status=204)
#         except Exception as e:
#             return Response({"error": str(e)}, status=400)

# class GetUserProfile(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         serializer = CustomUserSerializer(user)
#         return Response(serializer.data)

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .serializers import CustomUserSerializer, UserProfileSerializer
from .models import CustomUser, UserProfile


class CustomUserCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        user_serializer = CustomUserSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                "refresh": str(refresh),
                "access": str(access),
            }, status=HTTP_201_CREATED)

        errors = {
            "user_errors": user_serializer.errors,
        }
        return Response(errors, status=HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out"}, status=204)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class UserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        try:
            user_profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist"}, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        user = request.user
        request.data['user'] = user.id
        serializer = UserProfileSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
