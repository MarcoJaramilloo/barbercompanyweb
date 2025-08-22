from django.contrib import admin
from .models import Inicio, ImagenGaleria, QuienesSomos, Contacto

# Inline para ImagenGaleria en Inicio
class ImagenGaleriaInline(admin.TabularInline):
    model = ImagenGaleria
    extra = 1
    readonly_fields = ['vista_previa']

@admin.register(Inicio)
class InicioAdmin(admin.ModelAdmin):
    list_display = ['subtitulo', 'vista_previa']  # muestra subtitulo e imágenes en la lista
    list_display_links = ['subtitulo']            # hace clickeable el subtitulo
    inlines = [ImagenGaleriaInline]

    fieldsets = (
        ('Contenido Principal', {
            'fields': ('subtitulo', 'contenido', 'img_prin', 'imagen_principal')
        }),
        ('Sección Sobre Nosotros', {
            'fields': ('sobre_titulo', 'sobre_contenido')
        }),
        ('About Section', {
            'fields': ('about_lista', 'about_imagen_1', 'about_imagen_2')
        }),
    )

@admin.register(ImagenGaleria)
class ImagenGaleriaAdmin(admin.ModelAdmin):
    list_display = ['inicio', 'descripcion', 'vista_previa']
    list_display_links = ['descripcion']
    list_filter = ['inicio']

@admin.register(QuienesSomos)
class QuienesSomosAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'vista_previa']
    list_display_links = ['titulo']
    fieldsets = (
        ('Información Principal', {
            'fields': ('titulo', 'contenido')
        }),
        ('Imagen Principal (Hero Section)', {
            'fields': ('imagen_principal', 'posicion_imagen_principal'),
            'description': 'La imagen principal aparece como fondo debajo del navbar. Usa "Posición" para controlar qué parte se muestra.'
        }),
        ('Contenido Multimedia', {
            'fields': ('imagen', 'video_url', 'video_archivo'),
            'description': 'Puedes usar una imagen, un video de URL (YouTube/Vimeo) o subir un archivo de video. Solo se mostrará uno a la vez, en orden de prioridad.'
        }),
        ('Historia', {
            'fields': ('historia_titulo', 'historia_contenido', 'historia_imagen')
        }),
        ('Misión, Visión y Valores', {
            'fields': ('mision', 'vision', 'valores')
        }),
    )

@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre_empresa', 'email', 'telefono', 'vista_previa_logo']
    list_display_links = ['nombre_empresa']
    fieldsets = (
        ('Información de la Empresa', {
            'fields': ('nombre_empresa', 'logo_navbar')
        }),
        ('Información Básica', {
            'fields': ('direccion', 'telefono', 'email', 'whatsapp')
        }),
        ('Redes Sociales', {
            'fields': ('facebook', 'instagram', 'tiktok', 'youtube')
        }),
        ('Horarios', {
            'fields': ('horario_lunes_viernes', 'horario_sabados', 'horario_domingos')
        }),
        ('Mapa', {
            'fields': ('mapa_google','mapa_google_link')
        }),
    )
