from django.urls import path
from . import views

urlpatterns = [
    path('sync_bulk', views.sync_bulk),
    path('records', views.get_new_records),
    path('status/lastsync', views.last_sync_time),
]
