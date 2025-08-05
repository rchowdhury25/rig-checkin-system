from rest_framework import serializers
from .models import CheckInRecord

class CheckInRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInRecord
        fields = '__all__'