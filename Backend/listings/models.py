from django.db import models
from properties.models import Property

class Listing(models.Model):
    SOURCE_CHOICES = [
        ('divar', 'Divar'),
        ('sheypoor', 'Sheypoor'),
        ('internal', 'Internal'),
    ]

    STATUS_CHOICES = [
        ('reviewed', 'Reviewed'),
        ('contacted', 'Contacted'),
        ('converted', 'Converted'),
        ('rejected', 'Rejected'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='listings')
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    source_url = models.URLField(blank=True)
    image_count = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='reviewed')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_source_display()} - {self.property.title}"