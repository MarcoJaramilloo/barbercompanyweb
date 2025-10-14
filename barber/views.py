from django.shortcuts import render
from .models import Inicio, Servicio, QuienesSomos, Contacto

def get_common_context():
    """Contexto común que puedes ampliar según necesites para que todo sea editable"""
    inicio = Inicio.objects.first()
    quienes_somos = QuienesSomos.objects.first()
    contacto = Contacto.objects.first()
    servicios = Servicio.objects.filter(activo=True).order_by('orden')

    # Respetar el orden explícito definido en cada ImagenGaleria (campo 'orden')
    galeria = inicio.galeria.all().order_by('orden', 'id') if inicio else []

    contexto = {
        'inicio': inicio,
        'galeria': galeria,
        'servicios': servicios,
        'quienes_somos': quienes_somos,
        'contacto': contacto,
        # aquí puedes agregar más modelos o datos globales que quieras mostrar en todas las páginas
    }
    return contexto

def inicio(request):
    contexto = get_common_context()
    return render(request, 'inicio.html', contexto)

def quienes_somos(request):
    contexto = get_common_context()
    return render(request, 'quienes_somos.html', contexto)

def contacto(request):
    contexto = get_common_context()
    return render(request, 'contacto.html', contexto)
