from __future__ import unicode_literals
from django.contrib.auth.models import BaseUserManager
from django.db.models.fields import NullBooleanField
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save()
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.first_name = None 
        user.last_name = None 
        user.gender = None
        user.phone = None
        user.birth_date = None 
        user.staff = True
        user.superuser = True
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save()
        return user