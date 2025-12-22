#!/usr/bin/env python3
"""
Script de Ingesta de Apuntes Universitarios
============================================

Este script escanea las carpetas de apuntes en formato Markdown y las copia
a la estructura de contenido del proyecto Astro Starlight.

Uso:
    python ingest.py <directorio> [--dry-run]
    
    Donde <directorio> es el nombre de la carpeta de apuntes a procesar.
    El script detectará automáticamente a qué curso y cuatrimestre corresponde.

Ejemplos:
    python ingest.py 3-TEORIA-1-CUATRI          # Actualiza tercero/primer-cuatrimestre
    python ingest.py 2-TEORIA-1-CUATRI          # Actualiza segundo/primer-cuatrimestre
    python ingest.py ~/Escritorio/3-TEORIA-1-CUATRI  # Ruta completa también funciona
    python ingest.py 3-TEORIA-1-CUATRI --dry-run     # Simula sin hacer cambios

Opciones:
    --dry-run       Simula la copia sin hacer cambios reales
"""

import os
import shutil
import argparse
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from urllib.parse import quote

# Extensiones de imagen soportadas
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'}

# =============================================================================
# CONFIGURACIÓN
# =============================================================================

# Mapeo de patrones de carpetas a estructura de destino
# El script detectará automáticamente basándose en el nombre de la carpeta
# Formato: (patrón-regex, curso-destino, cuatrimestre-destino)
FOLDER_PATTERNS: List[Tuple[str, str, str]] = [
    (r"2-TEORIA-1-CUATRI", "segundo", "primer-cuatrimestre"),
    (r"2-TEORIA-2-CUATRI", "segundo", "segundo-cuatrimestre"),
    (r"3-TEORIA-1-CUATRI", "tercero", "primer-cuatrimestre"),
    (r"3-TEORIA-2-CUATRI", "tercero", "segundo-cuatrimestre"),
    (r"4-TEORIA-1-CUATRI", "cuarto", "primer-cuatrimestre"),
    (r"4-TEORIA-2-CUATRI", "cuarto", "segundo-cuatrimestre"),
    # Patrones adicionales para flexibilidad
    (r"1-TEORIA-1-CUATRI", "primero", "primer-cuatrimestre"),
    (r"1-TEORIA-2-CUATRI", "primero", "segundo-cuatrimestre"),
]

# Mapeo de nombres de asignaturas a slugs
SUBJECT_MAPPING: Dict[str, str] = {
    "AED": "aed",
    "BASES DE DATOS": "bases-de-datos",
    "POO": "poo",
    "REDES": "redes",
    "SISTEMAS OPERATIVOS": "sistemas-operativos",
    "AQRCOMP": "aqrcomp",
    "BDII": "bdii",
    "COGA": "coga",
    "DESOFT": "desoft",
    "SOII": "soii",
    "XEFE": "xefe",
    "ASR": "asr",
    "IA": "ia",
    "COMDIS": "comdis",
    "ENSO": "enso",
    "TALF": "talf",
}

# Archivos a ignorar
IGNORED_FILES: List[str] = [
    "LICENSE",
    "README.md",
    "TO-DO.md",
    "TODO.md",
]

# Patrones de archivos a ignorar
IGNORED_PATTERNS: List[str] = [
    r"^Sin título",
    r"^Untitled",
]

# =============================================================================
# FUNCIONES
# =============================================================================

def slugify(text: str) -> str:
    """Convierte un texto a slug válido para URLs."""
    # Convertir a minúsculas
    text = text.lower()
    # Reemplazar espacios y caracteres especiales
    text = re.sub(r'[áàäâ]', 'a', text)
    text = re.sub(r'[éèëê]', 'e', text)
    text = re.sub(r'[íìïî]', 'i', text)
    text = re.sub(r'[óòöô]', 'o', text)
    text = re.sub(r'[úùüû]', 'u', text)
    text = re.sub(r'[ñ]', 'n', text)
    # Reemplazar espacios y guiones bajos por guiones
    text = re.sub(r'[\s_]+', '-', text)
    # Eliminar caracteres no alfanuméricos excepto guiones
    text = re.sub(r'[^a-z0-9\-]', '', text)
    # Eliminar guiones múltiples
    text = re.sub(r'-+', '-', text)
    # Eliminar guiones al inicio y final
    text = text.strip('-')
    return text


def clean_markdown_headers(content: str) -> str:
    """
    Limpia los encabezados Markdown de enlaces de Obsidian y Markdown.
    Procesa línea por línea para mayor precisión.
    
    Transformaciones:
    - [[Ruta/archivo|TextoVisible]] -> TextoVisible
    - [[Ruta/archivo]] -> archivo
    - [Texto](URL) -> Texto
    
    Preserva:
    - Caracteres especiales como números, puntos, +, - que forman parte del título
    - Ejemplos: "# 4.8 Árboles B+" permanece igual
    """
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Detectar si es una línea de encabezado (empieza con # seguido de espacio o más #)
        is_header = re.match(r'^(#+)\s', line)
        
        if is_header:
            # Limpiar WikiLinks con alias: [[ruta|texto]] -> texto
            line = re.sub(r'\[\[[^\]]*\|([^\]]+)\]\]', r'\1', line)
            
            # Limpiar WikiLinks sin alias: [[ruta/archivo.ext]] -> archivo
            def extract_filename(match):
                path = match.group(1)
                # Obtener solo el nombre del archivo (última parte de la ruta)
                filename = path.split('/')[-1]
                # Quitar extensión si existe
                if '.' in filename:
                    filename = filename.rsplit('.', 1)[0]
                return filename
            
            line = re.sub(r'\[\[([^\]|]+)\]\]', extract_filename, line)
            
            # Limpiar enlaces Markdown: [texto](url) -> texto
            line = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', line)
        else:
            # Para líneas que no son encabezados, también limpiar WikiLinks
            # pero preservar el resto del contenido
            
            # WikiLinks con alias: [[ruta|texto]] -> texto
            line = re.sub(r'\[\[[^\]]*\|([^\]]+)\]\]', r'\1', line)
            
            # WikiLinks sin alias: [[ruta/archivo.ext]] -> archivo
            def extract_filename_body(match):
                path = match.group(1)
                filename = path.split('/')[-1]
                if '.' in filename:
                    filename = filename.rsplit('.', 1)[0]
                return filename
            
            line = re.sub(r'\[\[([^\]|]+)\]\]', extract_filename_body, line)
        
        cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)


def clean_wikilinks(content: str) -> str:
    """
    Wrapper para compatibilidad. Llama a clean_markdown_headers.
    """
    return clean_markdown_headers(content)


def should_ignore_file(filename: str) -> bool:
    """Determina si un archivo debe ser ignorado."""
    # Verificar extensión
    if not filename.endswith('.md'):
        return True
    
    # Verificar si está en la lista de ignorados
    if filename in IGNORED_FILES:
        return True
    
    # Verificar patrones
    for pattern in IGNORED_PATTERNS:
        if re.match(pattern, filename, re.IGNORECASE):
            return True
    
    return False


def should_ignore_folder(folder_name: str) -> bool:
    """Determina si una carpeta debe ser ignorada."""
    # Ignorar carpetas con sufijo _PDF
    if folder_name.endswith('_PDF'):
        return True
    # Ignorar carpetas ocultas (empiezan con .)
    if folder_name.startswith('.'):
        return True
    # Ignorar carpeta 'archivos' (normalmente contiene adjuntos)
    if folder_name.lower() == 'archivos':
        return True
    return False


def get_subject_slug(subject_name: str) -> str:
    """Obtiene el slug de una asignatura."""
    # Buscar en el mapeo
    if subject_name.upper() in SUBJECT_MAPPING:
        return SUBJECT_MAPPING[subject_name.upper()]
    
    # Si no está en el mapeo, crear un slug automático
    return slugify(subject_name)


def detect_folder_type(folder_path: Path) -> Optional[Tuple[str, str]]:
    """
    Detecta automáticamente el curso y cuatrimestre basándose en el nombre de la carpeta.
    
    Args:
        folder_path: Path de la carpeta a analizar
        
    Returns:
        Tuple (curso, cuatrimestre) o None si no se pudo detectar
    """
    folder_name = folder_path.name
    
    for pattern, curso, cuatrimestre in FOLDER_PATTERNS:
        if re.search(pattern, folder_name, re.IGNORECASE):
            return (curso, cuatrimestre)
    
    return None


def clean_dest_folder(dest_base: Path, curso: str, cuatrimestre: str, dry_run: bool = False) -> int:
    """
    Limpia el contenido de la carpeta destino antes de regenerar.
    Borra todas las carpetas de asignaturas pero preserva el index.mdx.
    
    Args:
        dest_base: Directorio base de destino (src/content/docs)
        curso: Nombre del curso (ej: 'tercero')
        cuatrimestre: Nombre del cuatrimestre (ej: 'primer-cuatrimestre')
        dry_run: Si True, no realiza cambios
        
    Returns:
        Número de carpetas eliminadas
    """
    cuatri_path = dest_base / curso / cuatrimestre
    deleted_count = 0
    
    if not cuatri_path.exists():
        return 0
    
    print(f"🗑️  Limpiando contenido anterior en: {cuatri_path}")
    
    for item in cuatri_path.iterdir():
        # Preservar archivos index
        if item.name.startswith('index'):
            continue
        
        if item.is_dir():
            if dry_run:
                print(f"   [DRY-RUN] Eliminaría carpeta: {item.name}")
            else:
                shutil.rmtree(item)
                print(f"   🗑️  Eliminada carpeta: {item.name}")
            deleted_count += 1
    
    return deleted_count


def clean_images_folder(script_dir: Path, curso: str, cuatrimestre: str, dry_run: bool = False) -> int:
    """
    Limpia las imágenes de la carpeta public/images para el curso/cuatrimestre.
    
    Args:
        script_dir: Directorio del script
        curso: Nombre del curso
        cuatrimestre: Nombre del cuatrimestre
        dry_run: Si True, no realiza cambios
        
    Returns:
        Número de carpetas de imágenes eliminadas
    """
    images_path = script_dir / 'public' / 'images' / curso / cuatrimestre
    deleted_count = 0
    
    if not images_path.exists():
        return 0
    
    print(f"🗑️  Limpiando imágenes anteriores en: {images_path}")
    
    for item in images_path.iterdir():
        if item.is_dir():
            if dry_run:
                print(f"   [DRY-RUN] Eliminaría carpeta: {item.name}")
            else:
                shutil.rmtree(item)
                print(f"   🗑️  Eliminada carpeta: {item.name}")
            deleted_count += 1
    
    return deleted_count


def scan_source_folder(folder_path: Path, curso: str, cuatrimestre: str) -> List[Dict]:
    """
    Escanea una carpeta de origen y devuelve la lista de archivos a copiar.
    
    Args:
        folder_path: Path de la carpeta a escanear
        curso: Nombre del curso detectado
        cuatrimestre: Nombre del cuatrimestre detectado
    
    Returns:
        Lista de diccionarios con información de cada archivo:
        - source: Path del archivo de origen
        - dest: Path del archivo de destino
        - curso: Nombre del curso
        - cuatrimestre: Nombre del cuatrimestre
        - asignatura: Nombre de la asignatura
    """
    files_to_copy = []
    
    if not folder_path.exists():
        print(f"⚠️  Carpeta no encontrada: {folder_path}")
        return files_to_copy
    
    print(f"📁 Escaneando: {folder_path}")
    
    # Recorrer subcarpetas (asignaturas)
    for subject_dir in folder_path.iterdir():
        if not subject_dir.is_dir():
            continue
        
        if should_ignore_folder(subject_dir.name):
            print(f"   ⏭️  Ignorando carpeta: {subject_dir.name}")
            continue
        
        subject_slug = get_subject_slug(subject_dir.name)
        print(f"   📚 Asignatura: {subject_dir.name} -> {subject_slug}")
        
        # Recorrer archivos .md recursivamente
        for md_file in subject_dir.rglob('*.md'):
            if should_ignore_file(md_file.name):
                print(f"      ⏭️  Ignorando: {md_file.name}")
                continue
            
            # Calcular ruta relativa dentro de la asignatura
            relative_path = md_file.relative_to(subject_dir)
            
            files_to_copy.append({
                'source': md_file,
                'relative_path': relative_path,
                'curso': curso,
                'cuatrimestre': cuatrimestre,
                'asignatura': subject_slug,
                'asignatura_original': subject_dir.name,
            })
    
    return files_to_copy


def copy_files(files_to_copy: List[Dict], dest_base: Path, image_map: Dict[str, Dict[str, str]], dry_run: bool = False) -> int:
    """
    Copia los archivos a la estructura de destino, añadiendo frontmatter.
    Convierte rutas de imágenes usando el mapeo proporcionado.
    
    Args:
        files_to_copy: Lista de archivos a copiar
        dest_base: Directorio base de destino
        image_map: Diccionario de mapeo de rutas de imágenes
        dry_run: Si True, no realiza cambios
    
    Returns:
        Número de archivos copiados
    """
    copied_count = 0
    
    for file_info in files_to_copy:
        source = file_info['source']
        curso = file_info['curso']
        cuatrimestre = file_info['cuatrimestre']
        asignatura = file_info['asignatura']
        relative_path = file_info['relative_path']
        
        # Clave para buscar en el mapeo de imágenes
        map_key = f"{curso}/{cuatrimestre}/{asignatura}"
        asig_images = image_map.get(map_key, {})
        
        # Construir ruta de destino
        dest_path = dest_base / curso / cuatrimestre / asignatura / relative_path
        
        # Slugificar el nombre del archivo
        dest_filename = slugify(dest_path.stem) + '.md'
        dest_path = dest_path.parent / dest_filename
        
        if dry_run:
            print(f"   📄 [DRY-RUN] {source.name} -> {dest_path}")
        else:
            # Crear directorio si no existe
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Leer contenido original
            original_content = source.read_text(encoding='utf-8')
            
            # Generar título desde el nombre del archivo (sin extensión)
            title = source.stem
            title = re.sub(r'^[\d]+[\.\-\s]+', '', title)
            title = title.strip()
            if not title:
                title = source.stem
            
            # Función para convertir rutas de imágenes
            def convert_image_path(image_path: str) -> str:
                """Convierte una ruta de imagen local a ruta web."""
                # Limpiar la ruta
                clean_path = image_path.strip().lstrip('./')
                
                # Buscar en el mapeo de imágenes
                if clean_path in asig_images:
                    return asig_images[clean_path]
                
                # Buscar solo por nombre de archivo
                filename = Path(clean_path).name
                if filename in asig_images:
                    return asig_images[filename]
                
                # Si no encontramos en el mapeo, construir ruta manualmente con URL encoding
                path_parts = clean_path.split('/')
                encoded_parts = [quote(part, safe='') for part in path_parts]
                return f"/ApuntesWeb/images/{curso}/{cuatrimestre}/{asignatura}/{'/'.join(encoded_parts)}"
            
            # Convertir sintaxis de imágenes Obsidian: ![[ruta/imagen.png]]
            def convert_obsidian_image(match):
                image_path = match.group(1)
                web_path = convert_image_path(image_path)
                return f'![]({web_path})'
            
            original_content = re.sub(r'!\[\[([^\]]+)\]\]', convert_obsidian_image, original_content)
            
            # Convertir sintaxis de imágenes Markdown estándar: ![alt](ruta/imagen.png)
            def convert_markdown_image(match):
                alt_text = match.group(1)
                image_path = match.group(2)
                
                # Solo convertir rutas locales (no URLs externas)
                if image_path.startswith('http://') or image_path.startswith('https://'):
                    return match.group(0)
                if image_path.startswith('/ApuntesWeb/'):
                    return match.group(0)  # Ya convertida
                
                web_path = convert_image_path(image_path)
                return f'![{alt_text}]({web_path})'
            
            original_content = re.sub(r'!\[([^\]]*)\]\(([^\)]+)\)', convert_markdown_image, original_content)
            
            # Limpiar WikiLinks de Obsidian [[...]] (para encabezados limpios en TOC)
            original_content = clean_wikilinks(original_content)
            
            # Verificar si ya tiene frontmatter
            if original_content.strip().startswith('---'):
                new_content = original_content
            else:
                frontmatter = f"""---
title: "{title}"
---

"""
                new_content = frontmatter + original_content
            
            # Escribir archivo con frontmatter
            dest_path.write_text(new_content, encoding='utf-8')
            print(f"   ✅ {source.name} -> {dest_path}")
        
        copied_count += 1
    
    return copied_count


def copy_image_folders(folder_path: Path, script_dir: Path, curso: str, cuatrimestre: str, dry_run: bool = False) -> Tuple[int, Dict[str, str]]:
    """
    Copia todas las imágenes de cada asignatura a public/images/.
    Busca recursivamente en todas las subcarpetas.
    
    Args:
        folder_path: Path de la carpeta de origen
        script_dir: Directorio del script
        curso: Nombre del curso
        cuatrimestre: Nombre del cuatrimestre
        dry_run: Si True, no realiza cambios
    
    Returns:
        Tuple de (número de imágenes copiadas, diccionario de mapeo de rutas)
        El diccionario mapea ruta_original -> ruta_web
    """
    copied_count = 0
    public_dir = script_dir / 'public' / 'images'
    # Mapeo de rutas: nombre_archivo -> ruta_web
    image_map: Dict[str, Dict[str, str]] = {}  # {curso/cuatri/asig: {nombre_original: ruta_web}}
    
    if not folder_path.exists():
        return copied_count, image_map
    
    # Recorrer subcarpetas (asignaturas)
    for subject_dir in folder_path.iterdir():
        if not subject_dir.is_dir():
            continue
        
        if should_ignore_folder(subject_dir.name):
            continue
        
        subject_slug = get_subject_slug(subject_dir.name)
        key = f"{curso}/{cuatrimestre}/{subject_slug}"
        
        if key not in image_map:
            image_map[key] = {}
        
        # Buscar TODAS las imágenes recursivamente en la asignatura
        for img_file in subject_dir.rglob('*'):
            if not img_file.is_file():
                continue
            if img_file.suffix.lower() not in IMAGE_EXTENSIONS:
                continue
            
            # Calcular ruta relativa desde la carpeta de asignatura
            relative_path = img_file.relative_to(subject_dir)
            
            # Destino: public/images/curso/cuatri/asig/ruta_relativa
            dest_path = public_dir / curso / cuatrimestre / subject_slug / relative_path
            
            # URL web con encoding de espacios
            # /ApuntesWeb/images/curso/cuatri/asig/ruta_relativa (con %20 para espacios)
            web_path_parts = ['/ApuntesWeb', 'images', curso, cuatrimestre, subject_slug]
            web_path_parts.extend([quote(part, safe='') for part in relative_path.parts])
            web_path = '/'.join(web_path_parts)
            
            # Guardar en el mapeo usando el nombre del archivo y la ruta relativa
            # Guardamos múltiples variantes para poder hacer match
            image_map[key][str(relative_path)] = web_path
            image_map[key][img_file.name] = web_path
            # También guardar la ruta con archivos/ o sin ella
            if str(relative_path).startswith('archivos'):
                image_map[key][str(relative_path)] = web_path
            
            if dry_run:
                print(f"      🖼️  [DRY-RUN] {img_file.name} -> {web_path}")
            else:
                # Copiar imagen
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(img_file, dest_path)
            
            copied_count += 1
        
        if not dry_run and copied_count > 0:
            # Contar imágenes de esta asignatura
            asig_count = len([k for k in image_map[key].keys()])
            if asig_count > 0:
                print(f"   🖼️  {subject_slug}: {asig_count // 2} imágenes copiadas")
    
    return copied_count, image_map


def create_index_files(dest_base: Path, files_to_copy: List[Dict], dry_run: bool = False):
    """
    Crea archivos índice para cada nivel de la jerarquía.
    """
    # Recopilar estructura con información del primer archivo
    structure: Dict[str, Dict[str, Dict[str, Dict]]] = {}
    
    for file_info in files_to_copy:
        curso = file_info['curso']
        cuatrimestre = file_info['cuatrimestre']
        asignatura = file_info['asignatura']
        asignatura_original = file_info['asignatura_original']
        
        # Calcular el slug del archivo destino
        file_slug = slugify(file_info['source'].stem)
        
        if curso not in structure:
            structure[curso] = {}
        if cuatrimestre not in structure[curso]:
            structure[curso][cuatrimestre] = {}
        if asignatura not in structure[curso][cuatrimestre]:
            structure[curso][cuatrimestre][asignatura] = {
                'original': asignatura_original,
                'first_file': file_slug,
                'files': []
            }
        # Agregar archivo a la lista
        structure[curso][cuatrimestre][asignatura]['files'].append(file_slug)
    
    # Ordenar archivos y determinar el primero alfabéticamente
    for curso in structure:
        for cuatri in structure[curso]:
            for asig in structure[curso][cuatri]:
                files = sorted(structure[curso][cuatri][asig]['files'])
                if files:
                    structure[curso][cuatri][asig]['first_file'] = files[0]
    
    # Crear índices por curso
    for curso, cuatrimestres in structure.items():
        curso_path = dest_base / curso
        index_path = curso_path / 'index.mdx'
        
        curso_title = "Segundo Curso" if curso == "segundo" else "Tercer Curso"
        
        content = f"""---
title: {curso_title}
description: Apuntes del {curso_title.lower()} de Ingeniería Informática
---

import {{ Card, CardGrid }} from '@astrojs/starlight/components';

# {curso_title}

<CardGrid>
"""
        for cuatri in sorted(cuatrimestres.keys()):
            cuatri_title = "Primer Cuatrimestre" if "primer" in cuatri else "Segundo Cuatrimestre"
            content += f"""  <Card title="{cuatri_title}" icon="document">
    [{cuatri_title}](/ApuntesWeb/{curso}/{cuatri}/)
  </Card>
"""
        content += "</CardGrid>\n"
        
        if not dry_run:
            curso_path.mkdir(parents=True, exist_ok=True)
            index_path.write_text(content, encoding='utf-8')
            print(f"   📝 Creado índice: {index_path}")
        
        # Crear índices por cuatrimestre
        for cuatrimestre, asignaturas in cuatrimestres.items():
            cuatri_path = curso_path / cuatrimestre
            index_path = cuatri_path / 'index.mdx'
            
            cuatri_title = "Primer Cuatrimestre" if "primer" in cuatrimestre else "Segundo Cuatrimestre"
            
            content = f"""---
title: {cuatri_title}
description: Asignaturas del {cuatri_title.lower()} - {curso_title}
---

import {{ Card, CardGrid }} from '@astrojs/starlight/components';

# {cuatri_title}

<CardGrid>
"""
            for asig_slug in sorted(asignaturas.keys()):
                asig_info = asignaturas[asig_slug]
                asig_original = asig_info['original']
                first_file = asig_info['first_file']
                # Enlazar directamente al primer tema
                content += f"""  <Card title="{asig_original}" icon="open-book">
    [{asig_original}](/ApuntesWeb/{curso}/{cuatrimestre}/{asig_slug}/{first_file}/)
  </Card>
"""
            content += "</CardGrid>\n"
            
            if not dry_run:
                cuatri_path.mkdir(parents=True, exist_ok=True)
                index_path.write_text(content, encoding='utf-8')
                print(f"   📝 Creado índice: {index_path}")


def main():
    """Función principal del script."""
    parser = argparse.ArgumentParser(
        description='Script de ingesta de apuntes universitarios',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument(
        'directorio',
        type=str,
        help='Directorio de apuntes a procesar (ej: 3-TEORIA-1-CUATRI o ruta completa)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Simula la copia sin hacer cambios reales'
    )
    
    args = parser.parse_args()
    
    # Rutas
    script_dir = Path(__file__).parent.absolute()
    dest_base = script_dir / 'src' / 'content' / 'docs'
    
    # Resolver el directorio de origen
    input_path = Path(args.directorio)
    
    # Si es una ruta relativa/nombre, buscar en ~/Escritorio
    if not input_path.is_absolute():
        # Primero intentar como ruta relativa al directorio actual
        if input_path.exists():
            folder_path = input_path.absolute()
        else:
            # Buscar en ~/Escritorio
            escritorio = Path(os.path.expanduser('~/Escritorio'))
            folder_path = escritorio / input_path
            
            # Si no existe directamente, buscar en subdirectorios comunes
            if not folder_path.exists():
                # Intentar en 2ºCarrera
                alt_path = escritorio / '2ºCarrera' / input_path
                if alt_path.exists():
                    folder_path = alt_path
    else:
        folder_path = input_path
    
    folder_path = folder_path.absolute()
    
    # Verificar que existe
    if not folder_path.exists():
        print(f"❌ Error: No se encontró el directorio: {folder_path}")
        print(f"   Intentado también en ~/Escritorio y ~/Escritorio/2ºCarrera")
        return
    
    # Detectar curso y cuatrimestre
    detected = detect_folder_type(folder_path)
    if not detected:
        print(f"❌ Error: No se pudo detectar el tipo de carpeta: {folder_path.name}")
        print("   El nombre debe seguir el patrón: X-TEORIA-Y-CUATRI")
        print("   Ejemplos: 2-TEORIA-1-CUATRI, 3-TEORIA-2-CUATRI, etc.")
        return
    
    curso, cuatrimestre = detected
    
    print("=" * 60)
    print("🎓 INGESTA DE APUNTES UNIVERSITARIOS")
    print("=" * 60)
    print(f"📂 Origen: {folder_path}")
    print(f"📂 Destino: {dest_base / curso / cuatrimestre}")
    print(f"📚 Detectado: {curso} / {cuatrimestre}")
    if args.dry_run:
        print("🔍 Modo: DRY-RUN (sin cambios reales)")
    print("=" * 60)
    print()
    
    # Limpiar contenido anterior
    print("🗑️  Limpiando contenido anterior...")
    print("-" * 40)
    clean_dest_folder(dest_base, curso, cuatrimestre, args.dry_run)
    clean_images_folder(script_dir, curso, cuatrimestre, args.dry_run)
    print()
    
    # Escanear archivos
    print("🔍 Escaneando carpetas de origen...")
    print("-" * 40)
    files_to_copy = scan_source_folder(folder_path, curso, cuatrimestre)
    print()
    
    if not files_to_copy:
        print("❌ No se encontraron archivos para copiar.")
        return
    
    print(f"📊 Total de archivos encontrados: {len(files_to_copy)}")
    print()
    
    # Copiar imágenes PRIMERO para tener el mapeo de rutas
    print("🖼️  Copiando imágenes...")
    print("-" * 40)
    images_copied, image_map = copy_image_folders(folder_path, script_dir, curso, cuatrimestre, args.dry_run)
    print()
    
    # Copiar archivos markdown (usando el mapeo de imágenes)
    print("📋 Copiando archivos...")
    print("-" * 40)
    copied = copy_files(files_to_copy, dest_base, image_map, args.dry_run)
    print()
    
    # Crear índices
    print("📝 Creando archivos índice...")
    print("-" * 40)
    create_index_files(dest_base, files_to_copy, args.dry_run)
    print()
    
    # Resumen
    print("=" * 60)
    print("✅ INGESTA COMPLETADA")
    print(f"   Archivos procesados: {copied}")
    print(f"   Imágenes copiadas: {images_copied}")
    if args.dry_run:
        print("   (Modo DRY-RUN - no se realizaron cambios)")
    print("=" * 60)


if __name__ == '__main__':
    main()
