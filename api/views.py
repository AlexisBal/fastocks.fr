from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth import login as django_login, logout as django_logout, authenticate as django_authenticate
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import *
from .serializers import *



@api_view(['GET'])
def profiles_list(request):
    # Voir les utilisateurs
    data = []
    profiles = Profile.objects.all()
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



@api_view(['GET', 'POST'])
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
def monitoring_detail(request, pk):
   # Retrouver, modifier ou supprimer un utilisateur par id/pk
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
def product_detail(request, pk):
   # Retrouver, modifier ou supprimer un utilisateur par id/pk
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