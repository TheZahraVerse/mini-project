from rest_framework import serializers
from .models import Property
from owners.serializers import OwnerSerializer

class PropertySerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'price', 'area', 'rooms', 'floor', 'address', 'description', 'status', 'owner']