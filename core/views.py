from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.parsers import JSONParser
from django.core import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import LogoutSerializer, ServiceSerializer, ComentariosSerializer, SituacaoSerializer, UsuarioSerializer
from .models import Service, Comentarios
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def index(request):
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def deletar_servico(request, pk):
    service = Service.objects.filter(id=pk)
    if request.method == 'DELETE':
        service.delete()
        return JsonResponse({"deletado":"deletado"}, status=201)
    return JsonResponse({"error":"error"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_servico(request):
    if request.method == 'POST':
        service = Service.objects.filter().order_by('%s'%request.data['order'])
        serializer = ServiceSerializer(service, many=True)
        return JsonResponse(serializer.data, status=201, safe=False)
    return JsonResponse({"erro":"erro"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def usuario(request):
    if request.method == 'POST':
        serializer = UsuarioSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"success":'123'}, status=201, safe=False)
        return JsonResponse({"success":serializer.error_messages}, status=201, safe=False)
    

class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)