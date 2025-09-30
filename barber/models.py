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
    
    # Lista de cosas para la sección about
    about_lista = models.TextField("Lista de cosas (una por línea)", blank=True, null=True)
    # Imágenes para la sección about
    about_imagen_1 = models.ImageField(upload_to="inicio/", blank=True, null=True, verbose_name="Imagen About 1")
    about_imagen_2 = models.ImageField(upload_to="inicio/", blank=True, null=True, verbose_name="Imagen About 2")

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
    imagen = models.ImageField(upload_to="galeria/", blank=True, null=True)
    # Nuevo: permitir video subido o URL de video
    video = models.FileField(upload_to="galeria/videos/", blank=True, null=True, verbose_name="Archivo de video")
    video_url = models.URLField(blank=True, null=True, verbose_name="URL de video", help_text="YouTube, Vimeo o enlace directo (.mp4)")
    descripcion = models.CharField(max_length=255, blank=True, null=True)

    def vista_previa(self):
        # Mostrar preview de video si existe, sino imagen
        if self.video:
            return mark_safe('<video width="120" height="80" controls><source src="/media/%s"></video>' % self.video)
        if self.imagen:
            return mark_safe('<img width="100" height="100" src="/media/%s">' % self.imagen)
        return "Sin contenido"

    def __str__(self):
        return f"Imagen de {self.inicio.subtitulo or 'Inicio'}"
    
    class Meta:
        verbose_name = "Imagen de Galería"
        verbose_name_plural = "2. Galería de Imágenes"


# Modelo para los servicios
class Servicio(models.Model):
    titulo = models.CharField(max_length=200, verbose_name="Título del Servicio")
    icono = models.CharField(
        max_length=50, 
        default="fas fa-cut",
        verbose_name="Icono FontAwesome",
        help_text="Clase del icono de FontAwesome (ej: fas fa-cut, fas fa-user-tie, fas fa-spa)"
    )
    orden = models.PositiveIntegerField(default=1, verbose_name="Orden de aparición")
    activo = models.BooleanField(default=True, verbose_name="Mostrar servicio")

    def vista_previa_imagenes(self):
        imagenes = self.imagenes.all()[:3]  # Mostrar solo las primeras 3
        if imagenes:
            html = '<div style="display: flex; gap: 5px;">'
            for img in imagenes:
                html += f'<img width="80" height="60" src="/media/{img.imagen}" style="border-radius:3px; object-fit:cover;">'
            if self.imagenes.count() > 3:
                html += f'<span style="margin-left:5px; color:#666;">+{self.imagenes.count()-3} más</span>'
            html += '</div>'
            return mark_safe(html)
        return "Sin imágenes"

    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = "Servicio"
        verbose_name_plural = "3. Servicios"
        ordering = ['orden']


# Modelo para las imágenes de los servicios
class ImagenServicio(models.Model):
    servicio = models.ForeignKey(Servicio, related_name="imagenes", on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to="servicios/", verbose_name="Imagen del Servicio")
    descripcion = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        verbose_name="Descripción de la imagen",
        help_text="Descripción opcional de la imagen (alt text)"
    )
    orden = models.PositiveIntegerField(default=1, verbose_name="Orden en el slider")

    def vista_previa(self):
        if self.imagen:
            return mark_safe(f'<img width="100" height="75" src="/media/{self.imagen}" style="border-radius:5px; object-fit:cover;">')
        return "Sin imagen"

    def __str__(self):
        return f"{self.servicio.titulo} - Imagen {self.orden}"
    
    class Meta:
        verbose_name = "Imagen de Servicio"
        verbose_name_plural = "3.1. Imágenes de Servicios"
        ordering = ['servicio', 'orden']


# Modelo para la página Quiénes Somos
class QuienesSomos(models.Model):
    titulo = models.CharField(max_length=200)
    subtitulo = models.CharField(max_length=300, default="Conoce nuestra historia y pasión por la barbería", 
                               verbose_name="Subtítulo del Hero",
                               help_text="Texto que aparece debajo del título principal en el hero section")
    contenido = models.TextField()
    
    # Contenido lateral elegante (al lado del video)
    logo_superior = models.ImageField(
        upload_to="quienes_somos/logos/", 
        blank=True, 
        null=True,
        verbose_name="Logo Superior",
        help_text="Imagen/logo que aparece en la parte superior del contenido elegante (reemplaza el texto 'SINCE 2021'). Tamaño recomendado: 320x320 píxeles para mejor calidad."
    )
    titulo_elegante = models.CharField(
        max_length=200, 
        default="Adam The Barber",
        verbose_name="Título Principal",
        help_text="Nombre o título principal en tipografía manuscrita"
    )
    frase_manuscrita = models.CharField(
        max_length=300,
        default="El arte se demuestra con tijeras en mano y haciendo uso de los mejores productos para quienes se acercan a nuestro salón.",
        verbose_name="Descripción Artística",
        help_text="Primera descripción en texto normal"
    )
    titulo_secundario = models.CharField(
        max_length=100,
        default="EXPERIENCIA Y PROFESIONALIDAD",
        verbose_name="Título Secundario",
        help_text="Título en mayúsculas bold"
    )
    descripcion_experiencia = models.TextField(
        default="Transportándote a los 80' y 90', somos una barbería exclusiva que supera tus expectativas. Cortes de cabello impecables, tintes de primera calidad y arreglos de barba excepcionales son nuestra especialidad. ¡Experimenta la auténtica elegancia en cada visita!",
        verbose_name="Descripción Detallada",
        help_text="Descripción larga y detallada de la experiencia"
    )
    
    # Imagen principal del hero section (debajo del navbar)
    imagen_principal = models.ImageField(upload_to="quienes_somos/", blank=True, null=True, 
                                       verbose_name="Imagen Principal (Hero)", 
                                       help_text="Imagen que aparece debajo del navbar en la página de Quiénes Somos")
    
    # Posición de la imagen principal para controlar el zoom/recorte
    POSICION_CHOICES = [
        ('center', 'Centro'),
        ('top', 'Arriba'),
        ('bottom', 'Abajo'),
        ('left', 'Izquierda'),
        ('right', 'Derecha'),
        ('top-left', 'Arriba Izquierda'),
        ('top-right', 'Arriba Derecha'),
        ('bottom-left', 'Abajo Izquierda'),
        ('bottom-right', 'Abajo Derecha'),
    ]
    posicion_imagen_principal = models.CharField(
        max_length=20, 
        choices=POSICION_CHOICES, 
        default='center',
        verbose_name="Posición de la Imagen Principal",
        help_text="Controla qué parte de la imagen se muestra cuando se recorta"
    )
    
    # Contenido multimedia: imagen o video
    imagen = models.ImageField(upload_to="quienes_somos/", blank=True, null=True, 
                             verbose_name="Imagen del Contenido")
    
    video_url = models.URLField(blank=True, null=True,
                               verbose_name="URL del Video",
                               help_text="URL de YouTube, Vimeo o enlace directo al video (.mp4, .webm, etc)")
    
    video_archivo = models.FileField(upload_to="videos/quienes_somos/", blank=True, null=True,
                                   verbose_name="Archivo de Video",
                                   help_text="Sube un archivo de video directamente (.mp4, .webm, .mov)")
    
    # Historia de la barbería
    historia_titulo = models.CharField(max_length=200, default="Nuestra Historia")
    historia_contenido = models.TextField(blank=True, null=True)
    historia_imagen = models.ImageField(upload_to="quienes_somos/", blank=True, null=True)
    
    # Misión, visión y valores
    mision = models.TextField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    valores = models.TextField(blank=True, null=True)
    
    # Galería de Instalaciones y Ambiente
    imagen_instalacion_1 = models.ImageField(
        upload_to="quienes_somos/instalaciones/", 
        blank=True, 
        null=True,
        verbose_name="Instalaciones - Imagen 1",
        help_text="Primera imagen de las instalaciones y sillas de barbería"
    )
    imagen_instalacion_2 = models.ImageField(
        upload_to="quienes_somos/instalaciones/", 
        blank=True, 
        null=True,
        verbose_name="Instalaciones - Imagen 2",
        help_text="Segunda imagen de las instalaciones y sillas de barbería"
    )
    imagen_instalacion_3 = models.ImageField(
        upload_to="quienes_somos/instalaciones/", 
        blank=True, 
        null=True,
        verbose_name="Instalaciones - Imagen 3",
        help_text="Tercera imagen de las instalaciones y sillas de barbería"
    )
    
    imagen_sala_retro_1 = models.ImageField(
        upload_to="quienes_somos/sala_retro/", 
        blank=True, 
        null=True,
        verbose_name="Sala Retro - Imagen 1",
        help_text="Primera imagen de la sala retro ambientada en los 90' (billar y entretenimiento)"
    )
    imagen_sala_retro_2 = models.ImageField(
        upload_to="quienes_somos/sala_retro/", 
        blank=True, 
        null=True,
        verbose_name="Sala Retro - Imagen 2",
        help_text="Segunda imagen de la sala retro ambientada en los 90' (billar y entretenimiento)"
    )
    imagen_sala_retro_3 = models.ImageField(
        upload_to="quienes_somos/sala_retro/", 
        blank=True, 
        null=True,
        verbose_name="Sala Retro - Imagen 3",
        help_text="Tercera imagen de la sala retro ambientada en los 90' (billar y entretenimiento)"
    )

    def vista_previa(self):
        html = ""
        if self.imagen_principal:
            html += '<p><strong>Imagen Principal (Hero):</strong></p>'
            html += f'<img width="150" height="100" src="/media/{self.imagen_principal}" style="border-radius:5px;"><br>'
            html += f'<small>Posición: {self.get_posicion_imagen_principal_display()}</small><br><br>'
            
        if self.imagen:
            html += '<p><strong>Imagen del Contenido:</strong></p>'
            html += f'<img width="150" height="100" src="/media/{self.imagen}" style="border-radius:5px;"><br><br>'
            
        if self.video_url:
            html += '<p><strong>Video URL:</strong></p>'
            html += f'<p style="color:#007cba;">🎥 {self.video_url}</p><br>'
            
        if self.video_archivo:
            html += '<p><strong>Video Archivo:</strong></p>'
            html += f'<video width="150" height="100" controls style="border-radius:5px;"><source src="/media/{self.video_archivo}"></video><br><br>'
            
        if not html:
            return "Sin contenido multimedia"
        return mark_safe(html)

    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = "Quiénes Somos"
        verbose_name_plural = "4. Quiénes Somos"


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
    
    # Redes socialess
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
    mapa_google_link = models.URLField("Enlace directo de Google Maps", blank=True, null=True, help_text="Pega aquí el enlace directo de la ubicación en Google Maps (no el iframe)")

    def vista_previa_logo(self):
        if self.logo_navbar:
            return mark_safe('<img width="100" height="60" src="/media/%s">' % self.logo_navbar)
        return "Sin logo"

    def __str__(self):
        return f"Contacto: {self.nombre_empresa}"
    
    class Meta:
        verbose_name = "Información de Contacto"
        verbose_name_plural = "5. Información de Contacto"
