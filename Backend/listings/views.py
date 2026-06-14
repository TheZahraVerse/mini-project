from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Listing
from .serializers import ListingSerializer
from .filters import ListingFilter

class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-score')
    serializer_class = ListingSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ListingFilter
    ordering_fields = ['score', 'property__price', 'created_at', 'property__area']
    ordering = ['-score']

class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Handle GET, PUT, PATCH, DELETE for a single listing"""
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer