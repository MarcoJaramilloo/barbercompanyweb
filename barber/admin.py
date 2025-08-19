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
            'fields': ('sobre_titulo', 'sobre_contenido', 'sobre_imagen')
        }),
        ('Estadísticas', {
            'fields': ('anos_experiencia', 'clientes_satisfechos', 'cortes_realizados')
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
            'fields': ('titulo', 'contenido', 'imagen')
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
            'fields': ('mapa_google',)
        }),
    )
