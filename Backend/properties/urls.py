from django.urls import path
from .views import PropertyDetailView

urlpatterns = [
    path('<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
]