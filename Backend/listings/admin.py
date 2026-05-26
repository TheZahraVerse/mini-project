from django.contrib import admin
from .models import Listing

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'area', 'price', 'size', 'image_count', 'score', 'rooms', 'floor', 'status', 'created_at']
    list_filter = ['status', 'area', 'score']
    search_fields = ['title', 'area', 'description']
    readonly_fields = ['created_at']