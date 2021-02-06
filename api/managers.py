from django.contrib.auth.models import BaseUserManager
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):
    def create_user(self, email, gender, birth_date, first_name, last_name, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            gender = gender,
            birth_date = birth_date,
            first_name = first_name,
            last_name = last_name, 
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.model(
            email=self.normalize_email(email)
        )
        user.is_admin = True
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
        user.token = token.key
        user.save(using=self._db)
        return user
