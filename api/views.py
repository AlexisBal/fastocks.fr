from rest_framework.response import Response
from oauth2_provider.decorators import protected_resource
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth import login as django_login, logout as django_logout, authenticate as django_authenticate
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import *
    

@api_view(['POST', 'GET'])
def register(request):
    '''
    Inscription.
    {
     "gender": "M",
     "birth_date": "2000-03-11",
     "first_name": "Tom",
     "last_name": "Dupont",
     "phone": "0673537263,
     "email": "test@fastocks.com",
     "password": "Test007"
    }
    '''
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
    '''
    Connexion.
    {
    "email": "test@fastocks.com",
    "password": "Test007"
    }
    '''
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
    '''
    Obtenir les informations du compte.
    Nécessite un jeton d'identification
    '''
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
    '''
    Modification des réglages.
    Nécessite un jeton d'identification
    '''
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
        return Response(status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_password(request):
    '''
    Modification du mot de passe.
    Nécessite un jeton d'identification
    '''
    try:
        profile = Profile.objects.get(token=request.META['HTTP_TOKEN'])
        id_1 = int(profile.id_user)
        id_2 = int(request.META['HTTP_USER_ID'])
        validator = check_password(request.data['old-password'], profile.password)
        if id_1 == id_2 and validator == True:
            password = request.data['password']
            password_confirm = request.data['password-confirm']
            if password == password_confirm:
                profile.set_password(password)
                profile.save()
                return Response(status=status.HTTP_204_NO_CONTENT)            
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
       
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def user_account_delete(request):
    '''
    Suppression du compte.
    Nécessite un jeton d'identification
    '''
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


@api_view(['GET'])
#@protected_resource()
def profiles_list(request):
    '''
    Obtenir un dictionnaire avec tous les utilisateurs.
    Nécessite une clée d'authorisation !
    '''
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


@api_view(['GET', 'DELETE'])
#@protected_resource()
def profile_detail(request, pk):
   # Retrouver, modifier ou supprimer un utilisateur par id/pk
   try:
       profile = Profile.objects.get(pk=pk)
   except Profile.DoesNotExist:
       return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
        '''
        Chercher un utilisateur par id.
        Nécessite une clée d'authorisation !
        '''
        serializer = ProfilesSerializer(profile,context={'request': request})
        return Response(serializer.data)

   elif request.method == 'DELETE':
        '''
        Supprimer un utilisateur par id.
        Nécessite une clée d'authorisation !
        '''
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    
@api_view(['GET', 'POST'])
#@protected_resource()
def monitoring_list(request):
    # Voir les suivis 
    if request.method == 'GET':
        '''
        Obtenir un dictionnaire avec tous les suivis.
        Nécessite une clée d'authorisation !
        '''
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
        '''
        Créer un suivi. 
        Nécessite une clée d'authorisation !
        ''' 
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
        '''
        Obtenir un dictionnaire avec tous les produits.
        Nécessite une clée d'authorisation !
        '''
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
        '''
        Créer un produit.
        {
            "market_place": "hollister",
            "brand": "hollister",
            "name": "Sweat ras du cou à logo brodé",
            "categorie": "vetement",
            "size": "M",
            "color": "Gris Clair Chiné",
            "request": "test.fr",
            "stock": false,
            "price": "26.99"
        }
        Nécessite une clée d'authorisation !
        '''
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
       '''
        Chercher un produit à partir de son id.
        Nécessite une clée d'authorisation !
       '''
       serializer = ProductsSerializer(product,context={'request': request})
       return Response(serializer.data)

   elif request.method == 'PUT':
       '''
        Modifier un produit.
        Nécessite une clée d'authorisation !
        {
            "market_place": "hollister",
            "brand": "hollister",
            "name": "Sweat ras du cou à logo brodé",
            "categorie": "vetement",
            "size": "M",
            "color": "Gris Clair Chiné",
            "request": "test.fr",
            "stock": false,
            "price": "26.99"
        }
        '''
       serializer = ProductSerializer(product, data=request.data,context={'request': request})
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'DELETE':
        '''
        Supprimer un produit.
        Nécessite une clée d'authorisation !
        '''
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
#@protected_resource()
def search_products(request):
    '''
    Filtrer les produits selon des caractéristiques.
    Nécessite une clée d'authorisation !
    {
        "market_place": "amazon",
        "brand": "hollister",
        "categorie": "",
        "name": "",
        "size": "", 
        "color": ""
    }
    '''
    data = []
    products = Products.objects.all()
    if request.data['brand']:
        try:
            products = products.filter(brand=request.data['brand'])
        except Products.DoesNotExist:
            pass
    if request.data['market_place']:
        try:
            products = products.filter(market_place=request.data['market_place'])
        except:
            pass
    if request.data['name']:
        try:
            products = products.filter(name=request.data['name'])
        except:
            pass
    if request.data['categorie']:
        try:
            products = products.filter(categorie=request.data['categorie'])
        except:
            pass
    if request.data['size']:
        try:
            products = products.filter(size=request.data['size'])
        except:
            pass
    if request.data['color']:
        try:
            products = products.filter(color=request.data['color'])
        except:
            pass
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
