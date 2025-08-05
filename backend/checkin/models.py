from django.db import models


class CheckInRecord(models.Model):
    
    ACTION_CHOICES = [
        ('check-in', 'Check-in'),
        ('check-out', 'Check-out')
    ]
    record_id = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=100)
    user_type = models.CharField(max_length=20)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    rig_id = models.CharField(max_length=20)
    timestamp = models.DateTimeField()
    synced_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["rig_id", "timestamp"]),
            models.Index(fields=["record_id"]),
        ]

    def __str__(self):
        return f"{self.name} - {self.action} - {self.rig_id}"
