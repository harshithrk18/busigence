from .models import FileUpload
from django import forms

class UploadForm(forms.ModelForm):

    class Meta:
        model = FileUpload
        fields = ('file',)