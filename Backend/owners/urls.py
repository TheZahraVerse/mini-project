from django.urls import path
from .views import OwnerDetailView

urlpatterns = [
    path('<int:pk>/', OwnerDetailView.as_view(), name='owner-detail'),
]