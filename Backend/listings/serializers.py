from rest_framework import serializers
from .models import Listing
from properties.models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'area', 'rooms', 'floor', 'address', 'description', 'status']

class ListingSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)
    
    class Meta:
        model = Listing
        fields = ['id', 'property', 'source', 'source_url', 'image_count', 'score','status', 'created_at']