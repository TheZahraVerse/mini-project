from rest_framework import generics
from .models import Owner
from .serializers import OwnerSerializer

class OwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer