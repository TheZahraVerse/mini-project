from rest_framework import generics, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
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
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingBulkDeleteView(APIView):
    def delete(self, request):
        ids = request.data.get('ids', [])
        
        if not ids:
            return Response(
                {'error': 'No ids provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not isinstance(ids, list):
            return Response(
                {'error': 'ids must be a list'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        deleted_count, _ = Listing.objects.filter(id__in=ids).delete()
        
        return Response({
            'deleted_count': deleted_count,
            'message': f'{deleted_count} listing(s) deleted successfully'
        }, status=status.HTTP_200_OK)