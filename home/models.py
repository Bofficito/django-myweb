from django.db import models

class user(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    class Meta:
        app_label = 'BlogEvent'

    def __str__(self):
        return f"{self.name} {self.lastname}"
    
class Articulo(models.Model):
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()

    class Meta:
        permissions = [
            ("can_edit_content", "Puede editar contenido"),
        ]

class Certificate(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    desc = models.DateField(max_length=500)
    link = models.DateField()
    
    def __str__(self):
        return self.name