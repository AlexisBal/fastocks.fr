from rest_framework import serializers
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
           'alert_stock',
           'alert_price',
           'alert_sms',
           'alert_email',
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
            'email',
            'password'
    )


class ProfileSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'phone',
            'alert_stock',
            'alert_price',
            'alert_sms',
            'alert_email',
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


