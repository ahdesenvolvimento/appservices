from django.contrib.auth.models import *
from rest_framework import serializers
from .models import Service, Comentarios

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'titulo', 'descricao', 'orcamento', 'data_limite', 'data_cadastro', 'situacao', 'cometarios']

class ComentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['cometarios']
        
class SituacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['situacao']

# class OrderServicoSerializer(serializers.ModelSerializer):

# class ComentariosSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Comentarios
#         fields = '__all__'
