from django import forms
from .models import *

class CertificateForm(forms.ModelForm):
    class Meta:
        model = Certificate
        fields = ['name', 'date', 'desc', 'link']