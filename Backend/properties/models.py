from django.db import models
from owners.models import Owner

class Property(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
    ]
    
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=300)
    price = models.BigIntegerField()
    area = models.FloatField()
    rooms = models.IntegerField()
    floor = models.IntegerField()
    address = models.TextField()
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    
    def __str__(self):
        return self.title