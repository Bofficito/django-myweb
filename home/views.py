from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required, permission_required
from .models import *
from .forms import *
from django.core.mail import send_mail
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings

def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def skills(request):
    return render(request, 'skills.html')

def contact(request):
    return render(request, 'contact.html')

from django.core.mail import send_mail
from django.shortcuts import render

def submit_form(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        full_message = f"Nombre: {name}\nEmail: {email}\nMensaje:\n{message}"

        send_mail(
            subject, 
            full_message, 
            "lautiboffi.info@gmail.com",  
            ["lautiboffi.info@gmail.com"],  
            fail_silently=False
        )

    return render(request, "submit.html")

# @login_required
# @permission_required('BlogEvent.can_edit_content', raise_exception=True)
def backoffice(request):
    return render(request, 'backoffice/page.html')
def add_certificate(request):
    return render(request, 'backoffice/add_certificate.html')