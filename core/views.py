from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.parsers import JSONParser
from django.core import serializers
from rest_framework.decorators import api_view
from .serializers import ServiceSerializer, ComentariosSerializer, SituacaoSerializer
from .models import Service, Comentarios
# Create your views here.

@api_view(['GET', 'POST'])
def index(request):
    # data = JSONParser().parse(request.body)
    # print(request.data)
    serializer = ServiceSerializer(data=request.data)
    if request.method == 'GET':
        service = Service.objects.all()
        serializer = ServiceSerializer(service, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT'])
def servico(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'GET':
        
        serializer = ServiceSerializer(service, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        service = Service.objects.get(id=pk)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT'])
def update_situacao(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'GET':
        
        serializer = SituacaoSerializer(service, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        service = Service.objects.get(id=pk)
        serializer = SituacaoSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    
@api_view(['GET', 'PUT'])
def comments_add(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'GET':
        serializer = ComentariosSerializer(service, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        service = Service.objects.get(id=pk)
        serializer = ComentariosSerializer(service, data=request.data)
        comentario = ''
        if serializer.is_valid():
            for valor in request.data:
                comentario = comentario + str(service.cometarios) + str(request.data[valor]) + ' - '
            Service.objects.filter(id=pk).update(cometarios=comentario)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    