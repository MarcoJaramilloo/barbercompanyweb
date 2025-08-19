from django.db import models
from django.utils.safestring import mark_safe

# Modelo para la página de inicio
class Inicio(models.Model):
    img_prin = models.ImageField(upload_to="inicio/", blank=True, null=True)
    subtitulo = models.CharField(max_length=300, blank=True, null=True)
    contenido = models.TextField(blank=True, null=True)
    imagen_principal = models.ImageField(upload_to="inicio/", blank=True, null=True)
    
    # Sección sobre nosotros en inicio
    sobre_titulo = models.CharField(max_length=200, default="Sobre Nosotros")
    sobre_contenido = models.TextField(blank=True, null=True)
    sobre_imagen = models.ImageField(upload_to="inicio/", blank=True, null=True)
    
    # Estadísticas
    anos_experiencia = models.PositiveIntegerField(default=0)
    clientes_satisfechos = models.PositiveIntegerField(default=0)
    cortes_realizados = models.PositiveIntegerField(default=0)

    def vista_previa(self):
        html = ""
        if self.img_prin:
            html += '<p>Imagen Principal:</p>'
            html += f'<img width="150" height="100" src="{self.img_prin.url}">'
        if self.imagen_principal:
            html += '<p>Imagen Secundaria:</p>'
            html += f'<img width="150" height="100" src="{self.imagen_principal.url}">'
        if not html:
            return "Sin imagen"
        return mark_safe(html)

    def __str__(self):
        return self.subtitulo or "Inicio"  # Usamos el subtitulo como identificador, si no existe muestra "Inicio"
    
    class Meta:
        verbose_name = "Página de Inicio"
        verbose_name_plural = "1. Página de Inicio"

# Modelo para las imágenes de la galería
class ImagenGaleria(models.Model):
    inicio = models.ForeignKey(Inicio, related_name="galeria", on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to="galeria/")
    descripcion = models.CharField(max_length=255, blank=True, null=True)

    def vista_previa(self):
        if self.imagen:
            return mark_safe('<img width="100" height="100" src="/media/%s">' % self.imagen)
        return "Sin imagen"

    def __str__(self):
        return f"Imagen de {self.inicio.subtitulo or 'Inicio'}"
    
    class Meta:
        verbose_name = "Imagen de Galería"
        verbose_name_plural = "2. Galería de Imágenes"


# Modelo para la página Quiénes Somos
class QuienesSomos(models.Model):
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    imagen = models.ImageField(upload_to="quienes_somos/", blank=True, null=True)
    
    # Historia de la barbería
    historia_titulo = models.CharField(max_length=200, default="Nuestra Historia")
    historia_contenido = models.TextField(blank=True, null=True)
    historia_imagen = models.ImageField(upload_to="quienes_somos/", blank=True, null=True)
    
    # Misión, visión y valores
    mision = models.TextField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    valores = models.TextField(blank=True, null=True)

    def vista_previa(self):
        if self.imagen:
            return mark_safe('<img width="150" height="100" src="/media/%s">' % self.imagen)
        return "Sin imagen"

    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = "Quiénes Somos"
        verbose_name_plural = "3. Quiénes Somos"


# Modelo para información de contacto
class Contacto(models.Model):
    # Información de la empresa
    nombre_empresa = models.CharField(max_length=100, default="Barbería")
    logo_navbar = models.ImageField(upload_to="logos/", blank=True, null=True, help_text="Logo para el menú de navegación (recomendado: .png o .jpg, tamaño pequeño como icono)")
    
    # Información básica
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    
    # Redes sociales
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    tiktok = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)
    
    # Horarios
    horario_lunes_viernes = models.CharField(max_length=100, default="9:00 AM - 8:00 PM")
    horario_sabados = models.CharField(max_length=100, default="9:00 AM - 6:00 PM")
    horario_domingos = models.CharField(max_length=100, default="Cerrado")
    
    # Mapa
    mapa_google = models.TextField(help_text="Código iframe del mapa de Google", blank=True, null=True)

    def vista_previa_logo(self):
        if self.logo_navbar:
            return mark_safe('<img width="100" height="60" src="/media/%s">' % self.logo_navbar)
        return "Sin logo"

    def __str__(self):
        return f"Contacto: {self.nombre_empresa}"
    
    class Meta:
        verbose_name = "Información de Contacto"
        verbose_name_plural = "4. Información de Contacto"
