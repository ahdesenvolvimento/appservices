from django.urls import path
from .views import index, servico, update_situacao, comments_add

urlpatterns = [
    path('', index, name='index'),
    path('index/<int:pk>', servico, name='servico'),
    path('index/situacao/<int:pk>', update_situacao, name='update_situacao'),
    path('index/comments/<int:pk>', comments_add, name='comments_add')
]