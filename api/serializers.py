from rest_framework import serializers
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import *


class ProfilesSerializer(serializers.ModelSerializer):
   class Meta:
       model = Profile
       fields = (
           'id_user',
           'superuser',
           'staff',
           'gender', 
           'birth_date',
           'first_name',
           'last_name',
           'phone',
           'email',
           'password',
           'last_login',
           'active',
           'createdAt'
       )

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'gender', 
            'birth_date',
            'first_name',
            'last_name',
            'phone',
            'email',
            'password'
    )



class MonitoringsSerializer(serializers.ModelSerializer):
   class Meta:
       model = Monitoring
       fields = (
           'id_monitoring',
           'id_user',
           'sku',
           'stock', 
           'price',
           'limit',
           'creation_date'
       )


class MonitoringSerializer(serializers.ModelSerializer):
   class Meta:
       model = Monitoring
       fields = (
           'id_user',
           'sku',
           'stock', 
           'price',
           'limit'
       )


class ProductsSerializer(serializers.ModelSerializer):
   class Meta:
       model = Products
       fields = (
           'sku',
           'market_place',
           'brand',
           'name',
           'categorie',
           'size',
           'color',
           'request',
           'stock',
           'price', 
           'creation_date',
           'update_date'
       )


class ProductSerializer(serializers.ModelSerializer):
   class Meta:
       model = Products
       fields = (
           'market_place',
           'brand',
           'name',
           'categorie',
           'size',
           'color',
           'request',
           'stock',
           'price'
       )


