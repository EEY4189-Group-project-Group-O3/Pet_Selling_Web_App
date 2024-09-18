from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have a username')
        if not password:
            raise ValueError('Users must have a password')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        return self.create_user(username, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    USER_TYPE_CHOICES = [
        ('superuser', 'Superuser'),
        ('general_user', 'General'),
        ('seller', 'Seller'),
        ('staff', 'Staff'),
    ]

    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_user = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)

    email = models.EmailField(
        max_length=100, unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=100,  null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    profile_image = models.ImageField(
        upload_to='profile_images/', null=True, blank=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
