from django.db import models

class Owner(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name