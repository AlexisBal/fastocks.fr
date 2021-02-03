from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.fields import IntegerField
from django.contrib.auth.models import PermissionsMixin

from .managers import UserManager


class Profile(AbstractBaseUser, PermissionsMixin):
    id_user = models.AutoField(verbose_name="id user", primary_key=True, unique=True)
    gender = models.CharField(verbose_name="gender", max_length=1, null=True)
    birth_date = models.DateField(verbose_name="birth date", null=True)
    first_name = models.CharField(verbose_name="first name", max_length=60, null=True)
    last_name = models.CharField(verbose_name="last name", max_length=60, null=True)
    phone = models.CharField(
        verbose_name="phone", max_length=20, unique=True, null=True, default=None
    )
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    alert_stock = models.BooleanField(default=True)
    alert_price = models.BooleanField(default=True)
    alert_sms = models.BooleanField(default=False)
    alert_email = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    superuser = models.BooleanField(default=False)  # a superuser
    token = models.CharField(verbose_name="token", max_length=255, unique=True, default=None,  null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_superuser(self):
        "Is the user a admin member?"
        return self.superuser

    @property
    def is_active(self):
        "Is the user active?"
        return self.active

    class Meta:
        db_table = "fastocks_users"


class Monitoring(models.Model,):
    id_monitoring = models.AutoField(
        verbose_name="id monitoring", primary_key=True, null=False, unique=True
    )
    id_user = IntegerField(verbose_name="id user", null=False, unique=True)
    sku = IntegerField(verbose_name="sku", null=False, unique=True)
    stock = models.BooleanField(verbose_name="stock", default=True)
    price = models.BooleanField(verbose_name="price", default=True)
    limit = models.DecimalField(verbose_name="limit", max_digits=16, decimal_places=6)
    creation_date = models.DateTimeField("Created At", auto_now_add=True)

    class Meta:
        db_table = "fastocks_monitoring"


class Products(models.Model):
    sku = models.AutoField(
        verbose_name="sku", primary_key=True, null=False, unique=True
    )
    market_place = models.CharField(
        verbose_name="market place", max_length=200, null=False
    )
    brand = models.CharField(verbose_name="brand", max_length=200, null=False)
    name = models.CharField(verbose_name="name", max_length=200, null=False)
    categorie = models.CharField(verbose_name="categorie", max_length=200, null=False)
    size = models.CharField(verbose_name="size", max_length=200, null=True)
    color = models.CharField(verbose_name="color", max_length=200, null=False)
    request = models.CharField(verbose_name="request", max_length=200, null=False)
    stock = models.BooleanField(verbose_name="stock", default=False)
    price = models.DecimalField(verbose_name="price", max_digits=16, decimal_places=6)
    creation_date = models.DateTimeField("Created At", auto_now_add=True)
    update_date = models.DateTimeField("Updated At", auto_now=True)

    class Meta:
        db_table = "fastocks_products"
