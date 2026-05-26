from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer

class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-score')
    serializer_class = ListingSerializer

class ListingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer