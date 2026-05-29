from rest_framework import serializers
from .models import Listing
from properties.models import Property
from owners.models import Owner

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'name', 'phone', 'notes', 'created_at']

class PropertySerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True) 
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'area', 'rooms', 'floor', 'address', 'description', 'status', 'owner']

class ListingSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)
    
    class Meta:
        model = Listing
        fields = ['id', 'property', 'source', 'source_url', 'image_count', 'score', 'status', 'created_at']