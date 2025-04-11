from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken  # JWT import

from .models import Cliente, Pet, Vacina
from .serializers import ClienteSerializer, PetSerializer, VacinaSerializer, UsuarioSerializer

User = get_user_model()

# ViewSet para Cliente
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

# ViewSet para Pet
class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

# ViewSet para Vacina
class VacinaViewSet(viewsets.ModelViewSet):
    queryset = Vacina.objects.all()
    serializer_class = VacinaSerializer
    permission_classes = [IsAuthenticated]

# View de Login com JWT e sem CSRF
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = []  # Permite acesso sem autenticação

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UsuarioSerializer(user)

            # Gera token JWT
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                "message": "Login realizado com sucesso",
                "usuario": serializer.data,
                "token": access_token,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Usuário ou senha inválido"}, status=status.HTTP_401_UNAUTHORIZED)
