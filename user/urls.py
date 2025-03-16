# # urls.py
# from django.urls import path
# from .views import CustomUserCreateView, CustomTokenObtainPairView, TokenRefreshView, TokenVerifyView, LogoutView, GetUserProfile

# app_name = 'user'

# urlpatterns = [
#     path('register/', CustomUserCreateView.as_view(), name='register'),
#     path('token/', CustomTokenObtainPairView.as_view(),
#          name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
#     path('logout/', LogoutView.as_view(), name='logout'),
#     path('profile', GetUserProfile.as_view(), name='logout'),
# ]


from django.urls import path
from .views import (
    CustomUserCreateView,
    CustomTokenObtainPairView,
    LogoutView,
    UserProfileView,
    SellerRequestView
)
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreateView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='get_profile'),
    path('seller-request/', SellerRequestView.as_view(), name='seller_request'),

]
