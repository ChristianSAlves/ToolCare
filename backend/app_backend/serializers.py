from rest_framework import serializers
from .models import Ferramenta

class FerramentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ferramenta
        fields = '__all__'
