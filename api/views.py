from rest_framework.response import Response
from oauth2_provider.decorators import protected_resource
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth import login as django_login, logout as django_logout, authenticate as django_authenticate
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import *


@api_view(['GET'])
#@protected_resource()
def profiles_list(request):
    data = []
    profiles = Profile.objects.all()
    # Mise à jour de la base de données de Token
    for profile in profiles:
        token, created = Token.objects.get_or_create(user=profile)
    # Voir les utilisateurs
    page = request.GET.get('page', 1)
    paginator = Paginator(profiles, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = ProfilesSerializer(data,context={'request': request}, many=True)
    return Response({'data': serializer.data})
    

@api_view(['POST', 'GET'])
def register(request):
    if request.method == 'GET':
        serializer = RegisterSerializer()
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = Profile(gender=request.data['gender'], birth_date=request.data["birth_date"], first_name=request.data["first_name"], last_name=request.data["last_name"], email=request.data["email"], password=request.data["password"])
            user.set_password(request.data["password"])
            user.save()
            token, created = Token.objects.get_or_create(user=user) # Création d'un token unique
            user.token = token.key
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def login(request):
    if request.method == 'GET':
        serializer = LoginSerializer()
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        user = django_authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            pk = user.pk
            profile = Profile.objects.get(pk=pk)
            serializer = ProfilesSerializer(profile,context={'request': request})
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_account(request):
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        serializer = ProfilesSerializer(profile,context={'request': request})
        id_1 = int(serializer.data['id_user'])
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def user_account_settings(request):
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        data = request.data
        data['email'] = profile.email
        data['password'] = profile.password
        id_1 = int(profile.id_user)
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            serializer = ProfilesSerializer(profile, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_password(request):
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        id_1 = int(profile.id_user)
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            serializer = ProfilesSerializer(profile, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_delete(request):
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        serializer = ProfilesSerializer(profile,context={'request': request})
        id_1 = int(serializer.data['id_user'])
        id_2 = int(request.META['HTTP_USER_ID'])
        if id_1 == id_2:
            profile.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    
@api_view(['GET', 'POST'])
#@protected_resource()
def monitoring_list(request):
    # Voir les suivis 
    if request.method == 'GET':
        data = []
        monitoring = Monitoring.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(monitoring, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = MonitoringsSerializer(data,context={'request': request}, many=True)
        return Response({'data': serializer.data})
    # Créer un suivi
    elif request.method == 'POST':
       serializer = MonitoringSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
#@protected_resource()
def products_list(request):
    # Voir les produits
    if request.method == 'GET':
        data = []
        products = Products.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(products, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ProductsSerializer(data,context={'request': request}, many=True)
        return Response({'data': serializer.data})
    # Créer un produit
    elif request.method == 'POST':
       serializer = ProductSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
#@protected_resource()
def profile_detail(request, pk):
   # Retrouver, modifier ou supprimer un utilisateur par id/pk
   try:
       profile = Profile.objects.get(pk=pk)
   except Profile.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
       serializer = ProfilesSerializer(profile,context={'request': request})
       return Response(serializer.data)

   elif request.method == 'PUT':
       serializer = ProfilesSerializer(profile, data=request.data,context={'request': request})
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'DELETE':
       profile.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
#@protected_resource()
def monitoring_detail(request, pk):
   # Retrouver, modifier ou supprimer un suivi par id/pk
   try:
       monitoring = Monitoring.objects.get(pk=pk)
   except Monitoring.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
       serializer = MonitoringsSerializer(monitoring,context={'request': request})
       return Response(serializer.data)

   elif request.method == 'PUT':
       serializer = MonitoringSerializer(monitoring, data=request.data,context={'request': request})
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'DELETE':
       monitoring.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
#@protected_resource()
def product_detail(request, pk):
   # Retrouver, modifier ou supprimer un produit par id/pk
   try:
       product = Products.objects.get(pk=pk)
   except Products.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
       serializer = ProductsSerializer(product,context={'request': request})
       return Response(serializer.data)

   elif request.method == 'PUT':
       serializer = ProductSerializer(product, data=request.data,context={'request': request})
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'DELETE':
       product.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)