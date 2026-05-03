# cart/models.py

from django.db import models

class CartItem(models.Model):
    user_id = models.IntegerField()   # from JWT
    product_id = models.IntegerField()
    quantity = models.IntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user_id} - Product {self.product_id}"