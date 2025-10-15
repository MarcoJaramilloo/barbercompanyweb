from django.contrib import admin
from .models import Inicio, ImagenGaleria, Servicio, ImagenServicio, QuienesSomos, Contacto

# Inline para ImagenGaleria en Inicio
class ImagenGaleriaInline(admin.TabularInline):
    model = ImagenGaleria
    extra = 1
    readonly_fields = ['vista_previa']
    fields = ['imagen', 'video', 'video_url', 'descripcion', 'orden', 'vista_previa']

# Inline para ImagenServicio en Servicio
class ImagenServicioInline(admin.TabularInline):
    model = ImagenServicio
    extra = 1
    readonly_fields = ['vista_previa']
    fields = ['imagen', 'descripcion', 'orden', 'vista_previa']

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
    list_display = ['inicio', 'descripcion', 'orden', 'vista_previa']
    list_display_links = ['descripcion']
    list_filter = ['inicio']
    list_editable = ['orden']
    fields = ['inicio', 'imagen', 'video', 'video_url', 'descripcion', 'orden', 'vista_previa']

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'icono', 'orden', 'activo', 'vista_previa_imagenes']
    list_display_links = ['titulo']
    list_editable = ['orden', 'activo']
    list_filter = ['activo']
    inlines = [ImagenServicioInline]
    
    fieldsets = (
        ('Información del Servicio', {
            'fields': ('titulo', 'icono', 'orden', 'activo'),
            'description': 'Información básica del servicio. El icono debe ser una clase de FontAwesome.'
        }),
    )

@admin.register(ImagenServicio)
class ImagenServicioAdmin(admin.ModelAdmin):
    list_display = ['servicio', 'descripcion', 'orden', 'vista_previa']
    list_display_links = ['descripcion']
    list_editable = ['orden']
    list_filter = ['servicio']

@admin.register(QuienesSomos)
class QuienesSomosAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'vista_previa']
    list_display_links = ['titulo']
    fieldsets = (
        ('Información Principal', {
            'fields': ('titulo', 'subtitulo', 'contenido'),
            'description': 'Información básica de la página. El subtítulo aparece debajo del título en el hero section.'
        }),
        ('Contenido Lateral Elegante', {
            'fields': ('logo_superior', 'titulo_elegante', 'frase_manuscrita', 'titulo_secundario', 'descripcion_experiencia'),
            'description': 'Contenido que aparece al lado del video con diseño similar al ejemplo "Adam The Barber". IMPORTANTE: El logo superior debe ser de 320x320 píxeles para mejor calidad y nitidez.'
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
        ('Valores', {
            'fields': ('valores',)
        }),
    )

@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre_empresa', 'email', 'telefono', 'vista_previa_logo']
    list_display_links = ['nombre_empresa']
    fieldsets = (
        ('Información de la Empresa', {
            'fields': ('nombre_empresa', 'logo_navbar', 'imagen_fondo_hero'),
            'description': 'La imagen de fondo hero se mostrará como fondo en la sección superior de la página de contacto.'
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
