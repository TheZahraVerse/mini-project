from django.urls import path
from .views import ListingListCreateView, ListingDetailView, ListingBulkDeleteView

urlpatterns = [
    path('', ListingListCreateView.as_view(), name='listing-list'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    path('bulk_delete/', ListingBulkDeleteView.as_view(), name='listing-bulk-delete'),
]