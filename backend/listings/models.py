from django.db import models

# Create your models here.

# Listing model - represents ads scraped from platforms like Divar
class Listing(models.Model):
    
    # Status choices for the listing lifecycle
    STATUS_CHOICES = [
        ('reviewed', 'Reviewed - waiting for action'),      # تازه بررسی شده
        ('contacted', 'Contacted - call made'),              # تماس گرفته شده
        ('converted', 'Converted - became a property file'), # تبدیل به فایل ملکی شده
        ('rejected', 'Rejected - not valuable'),             # رد شده
    ]
    
    # Basic listing information
    title = models.CharField(max_length=300, help_text="Listing title from source")
    area = models.CharField(max_length=100, blank=True, help_text="Neighborhood/area name")
    price = models.BigIntegerField(null=True, blank=True, help_text="Price in Tomans")
    size = models.FloatField(null=True, blank=True, help_text="Area in square meters")
    
    # Media and quality indicators
    image_count = models.IntegerField(default=0, help_text="Number of images in the listing")
    score = models.IntegerField(default=0, help_text="Lead scoring: higher = better priority")
    
    # Additional details (shown in modal)
    description = models.TextField(blank=True, help_text="Listing description text")
    source_url = models.URLField(blank=True, help_text="Original listing URL")
    rooms = models.IntegerField(null=True, blank=True, help_text="Number of rooms")
    floor = models.IntegerField(null=True, blank=True, help_text="Floor number (0 for ground)")
    
    # Status and timestamps
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='reviewed')
    created_at = models.DateTimeField(auto_now_add=True, help_text="When listing was added to system")
    
    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"
