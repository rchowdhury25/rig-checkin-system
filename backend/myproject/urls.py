from django.urls import re_path
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('checkin.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='spa'),
]
