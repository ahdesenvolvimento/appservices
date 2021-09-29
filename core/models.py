from django.db import models

# Create your models here.
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