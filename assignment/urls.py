from django.urls import path
from . import views

app_name = "assignment"

urlpatterns = [
    path('upload', views.upload, name='upload'),
    path('loadfile', views.loadfile, name='loadfile'),
    path('sql', views.sql, name='sql')
]
