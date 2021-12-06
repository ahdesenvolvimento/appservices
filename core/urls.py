from django.urls import path
from .views import LogoutView, index, servico, update_situacao, comments_add, deletar_servico, order_servico, usuario
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('', index, name='index'),
    path('index/<int:pk>', servico, name='servico'),
    path('index/situacao/<int:pk>', update_situacao, name='update_situacao'),
    path('index/comments/<int:pk>', comments_add, name='comments_add'),
    path('index/delete/<int:pk>', deletar_servico, name='deletar_servico'),
    path('index/order/', order_servico, name='order_servico'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('usuario/', usuario, name='usuario'),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]