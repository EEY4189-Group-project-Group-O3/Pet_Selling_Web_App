# urls.py
from django.urls import path
from .views import CustomUserCreateView, CustomTokenObtainPairView, TokenRefreshView, TokenVerifyView, LogoutView

app_name = 'user'

urlpatterns = [
    path('api/register/', CustomUserCreateView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
