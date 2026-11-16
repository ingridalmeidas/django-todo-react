
# todo/serializers.py

from rest_framework import serializers
from .models import Todo
      
class TodoSerializer(serializers.ModelSerializer):
  title = serializers.CharField(max_length=5)

  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')