import django_filters
from .models import Listing
from properties.models import Property

class ListingFilter(django_filters.FilterSet):
    # Listing filters (multiple choice - checkbox)
    status = django_filters.MultipleChoiceFilter(choices=Listing.STATUS_CHOICES)
    source = django_filters.ChoiceFilter(choices=Listing.SOURCE_CHOICES)
    min_score = django_filters.NumberFilter(field_name='score', lookup_expr='gte')
    max_score = django_filters.NumberFilter(field_name='score', lookup_expr='lte')
    created_at_after = django_filters.DateFilter(field_name='created_at', lookup_expr='gte')
    created_at_before = django_filters.DateFilter(field_name='created_at', lookup_expr='lte')
    
    # Property filters
    property_status = django_filters.MultipleChoiceFilter(  # <-- Must be MultipleChoiceFilter
        field_name='property__status', 
        choices=Property.STATUS_CHOICES
    )
    min_price = django_filters.NumberFilter(field_name='property__price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='property__price', lookup_expr='lte')
    min_area = django_filters.NumberFilter(field_name='property__area', lookup_expr='gte')
    max_area = django_filters.NumberFilter(field_name='property__area', lookup_expr='lte')
    rooms = django_filters.ChoiceFilter(
        field_name='property__rooms',
        choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4+')]
    )
    
    class Meta:
        model = Listing
        fields = [
            'status', 'source', 'min_score', 'max_score',
            'created_at_after', 'created_at_before',
            'property_status', 'min_price', 'max_price',
            'min_area', 'max_area', 'rooms'
        ]