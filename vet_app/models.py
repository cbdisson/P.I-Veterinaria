from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    is_master = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20)
    email = models.EmailField()
    endereco = models.TextField()

    def __str__(self):
        return self.nome


class Pet(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='pets')
    nome = models.CharField(max_length=100)
    idade = models.PositiveIntegerField()
    especie = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nome} ({self.especie})"


class Vacina(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='vacinas')
    nome = models.CharField(max_length=100)
    data_aplicacao = models.DateField()

    def __str__(self):
        return f"{self.nome} - {self.pet.nome}"
