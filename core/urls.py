from django.urls import path
from .views import index, servico, update_situacao, comments_add, deletar_servico, order_servico

urlpatterns = [
    path('', index, name='index'),
    path('index/<int:pk>', servico, name='servico'),
    path('index/situacao/<int:pk>', update_situacao, name='update_situacao'),
    path('index/comments/<int:pk>', comments_add, name='comments_add'),
    path('index/delete/<int:pk>', deletar_servico, name='deletar_servico'),
    path('index/order/', order_servico, name='order_servico')
]