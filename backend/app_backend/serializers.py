from rest_framework import serializers
from django.contrib.auth.models import Group, User
from .models import Ferramenta

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class FerramentaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ferramenta
        fields = ['__all__']
