from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import submit_form

urlpatterns = [
    path('', views.home, name='base'),
    path('about/', views.about, name='about'),
    path('skills/', views.skills, name='skills'),
    path('contact/', views.contact, name='contact'),  
    path('submit/', submit_form, name="submit_form"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

#Backoffice
urlpatterns += [
    path('backoffice/', views.backoffice, name='backoffice'),
    path('backoffice/add_certificate/', views.add_certificate, name='add_certificate'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)