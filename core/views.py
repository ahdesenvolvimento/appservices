from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.parsers import JSONParser
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ServiceSerializer, ComentariosSerializer, SituacaoSerializer
from .models import Service, Comentarios
# Create your views here.

@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def index(request):
    # print(Service.objects.all())
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
# @permission_classes([IsAuthenticated])
def servico(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'GET':
        
        serializer = ServiceSerializer(service, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        service = Service.objects.get(id=pk)
        print(service)
        serializer = ServiceSerializer(service, data=request.data)
        print(serializer)
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

@api_view(['DELETE'])
def deletar_servico(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'DELETE':
        service.delete()
        return JsonResponse({"deletado":"deletado"}, status=201)
    return JsonResponse({"error":"error"}, status=400)

@api_view(['POST'])
def order_servico(request):
    if request.method == 'POST':
        service = Service.objects.filter().order_by('%s'%request.data['order'])
        serializer = ServiceSerializer(service, many=True)
        return JsonResponse(serializer.data, status=201, safe=False)
    return JsonResponse({"erro":"erro"}, status=400)
    