from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.db.models.fields import IntegerField

from .managers import UserManager


class Profile(AbstractBaseUser):
    id_user = models.AutoField(verbose_name="id user", primary_key=True, unique=True)
    gender = models.CharField(verbose_name="gender", max_length=1, null=True, default=None)
    birth_date = models.DateField(verbose_name="birth date", null=True, default=None)
    first_name = models.CharField(verbose_name="first name", max_length=60, null=True, default=None)
    last_name = models.CharField(verbose_name="last name", max_length=60, null=True, default=None)
    phone = models.CharField(
        verbose_name="phone", max_length=20, unique=True, null=True, default=None
    )
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    alert_stock_email = models.BooleanField(default=True)
    alert_price_email = models.BooleanField(default=True)
    alert_stock_sms = models.BooleanField(default=False)
    alert_price_sms = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    token = models.CharField(verbose_name="token", max_length=255, unique=True, default=None,  null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    class Meta:
        db_table = "fastocks_users"


class Monitoring(models.Model,):
    id_monitoring = models.AutoField(
        verbose_name="id monitoring", primary_key=True, null=False, unique=True
    )
    id_user = IntegerField(verbose_name="id user", null=False)
    sku = IntegerField(verbose_name="sku", null=False)
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
