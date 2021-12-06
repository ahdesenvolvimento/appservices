from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser
# Create your models here.

class BaseManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extrafields):
        if not username:
            raise ValueError('Informe o usuário')
        username = self.model.normalize_username(username)
        user = self.model(username=username, **extrafields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extrafields)

    def create_superuser(self, username, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('is_superuser', True)

        if extrafields.get('is_staff') is not True:
            raise ValueError('Precisa ser true')
        if extrafields.get('is_superuser') is not True:
            raise ValueError('Precisa ser true')

        return self._create_user(username, password, **extrafields)


class Usuario(AbstractUser):
    # id = models.AutoField(primary_key=True)
    # nome = models.CharField(max_length=255, blank=False, null=False)
    # email = models.EmailField(
    #     max_length=255, blank=False, null=False, unique=True)

    status = models.BooleanField(default=True)
    # token = models.CharField(max_length=255, null=True, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password']
    objects = BaseManager()

    class Meta:
        db_table = 'usuario'

        
class Service(models.Model):
    CHOICES_SITUACAO = (
        ('Aberto', 'Aberto'),
        ('Concluído', 'Concluído'),
        ('Cancelado', 'Cancelado')
    )
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    orcamento = models.CharField(max_length=255)
    data_cadastro = models.DateField(auto_now_add=True)
    data_limite = models.DateField()
    situacao = models.CharField(max_length=255, choices=CHOICES_SITUACAO)
    cometarios = models.TextField(null=True, blank=True)


class Comentarios(models.Model):
    descricao = models.TextField()
    criado = models.DateTimeField(auto_now_add=True)
    servico = models.ForeignKey(Service, on_delete=models.CASCADE)