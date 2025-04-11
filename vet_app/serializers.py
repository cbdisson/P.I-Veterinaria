from rest_framework import serializers
from .models import Usuario, Cliente, Pet, Vacina
from django.contrib.auth import get_user_model

User = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_master']


class VacinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacina
        fields = ['id', 'nome', 'data_aplicacao']


class PetSerializer(serializers.ModelSerializer):
    vacinas = VacinaSerializer(many=True, read_only=True)
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())  # <- ESSENCIAL para permitir POST

    class Meta:
        model = Pet
        fields = ['id', 'nome', 'idade', 'especie', 'vacinas', 'cliente']  # <- adicionamos 'cliente' aqui


class ClienteSerializer(serializers.ModelSerializer):
    pets = PetSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = ['id', 'nome', 'telefone', 'email', 'endereco', 'pets']
