from django.contrib.auth.models import *
from rest_framework import serializers
from .models import Service, Comentarios, Usuario
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.hashers import make_password
# from django.contrib.auth.models import User
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

class UsuarioSerializer(serializers.ModelSerializer):
    def validate_password(self, value: str):
        return make_password(value)

    class Meta:
        model = Usuario
        fields = ('username', 'password')

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad token')
