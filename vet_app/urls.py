from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, PetViewSet, VacinaViewSet, LoginView

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'pets', PetViewSet)
router.register(r'vacinas', VacinaViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]
