from rest_framework import generics, status
from rest_framework.response import Response
from django.utils import timezone
from .models import CheckInRecord
from .serializers import CheckInRecordSerializer
from rest_framework.decorators import api_view
from django.db.models import Max



@api_view(['POST'])
def sync_bulk(request):
    records = request.data.get('records', [])
    synced = []
    print(records)

    for record in records:
        try:
            obj, created = CheckInRecord.objects.update_or_create(
                record_id=record['record_id'],
                defaults={
                    'name': record['name'],
                    'user_type': record['user_type'],
                    'action': record['action'],
                    'rig_id': record['rig_id'],
                    'timestamp': record['timestamp'],
                    'synced_at': timezone.now()
                }
            )
            synced.append(obj.record_id)
        except Exception as e:
            print(f"Error syncing record {record['record_id']}: {e}")
            continue

    return Response({'synced_ids': synced}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_new_records(request):
    rig_id = request.data.get('rig_id')
    after = request.data.get('after')
    if not rig_id or not after:
        return Response({"error": "Missing rig_id or after param"}, status=400)

    queryset = CheckInRecord.objects.filter(rig_id=rig_id, timestamp__gt=after)
    serializer = CheckInRecordSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def last_sync_time(request):
    rig_id = request.data.get('rig_id')
    if not rig_id:
        return Response({"error": "Missing rig_id param"}, status=400)

    last_sync = CheckInRecord.objects.filter(rig_id=rig_id).aggregate(Max('synced_at'))
    return Response({"last_synced_at": last_sync['synced_at__max']})