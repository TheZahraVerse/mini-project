from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer

class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-score')
    serializer_class = ListingSerializer