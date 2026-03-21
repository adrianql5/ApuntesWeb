#!/usr/bin/env python3
"""Ingesta de apuntes Markdown a Starlight.

Uso rápido:
    python3 ingest.py 3-TEORIA-1-CUATRI
    python3 ingest.py ~/Escritorio/3-TEORIA-1-CUATRI --dry-run
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable
from urllib.parse import quote

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp"}
IGNORED_FILES = {"LICENSE", "README.md", "TO-DO.md", "TODO.md"}
IGNORED_PATTERNS = (r"^Sin título", r"^Untitled")
FOLDER_PATTERNS = {
    "1-TEORIA-1-CUATRI": ("primero", "primer-cuatrimestre"),
    "1-TEORIA-2-CUATRI": ("primero", "segundo-cuatrimestre"),
    "2-TEORIA-1-CUATRI": ("segundo", "primer-cuatrimestre"),
    "2-TEORIA-2-CUATRI": ("segundo", "segundo-cuatrimestre"),
    "3-TEORIA-1-CUATRI": ("tercero", "primer-cuatrimestre"),
    "3-TEORIA-2-CUATRI": ("tercero", "segundo-cuatrimestre"),
    "4-TEORIA-1-CUATRI": ("cuarto", "primer-cuatrimestre"),
    "4-TEORIA-2-CUATRI": ("cuarto", "segundo-cuatrimestre"),
}
SUBJECT_MAPPING = {
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
    "CIBER": "ciber",
    "COMPINT": "compint",
    "DAW": "daw",
    "SEGINFO": "seginfo",
    "XPI": "xpi",
}


@dataclass(frozen=True)
class Target:
    source: Path
    course: str
    term: str

    @property
    def label(self) -> str:
        return f"{self.course}/{self.term}"


TRANSLATION = str.maketrans(
    {
        "á": "a",
        "à": "a",
        "ä": "a",
        "â": "a",
        "é": "e",
        "è": "e",
        "ë": "e",
        "ê": "e",
        "í": "i",
        "ì": "i",
        "ï": "i",
        "î": "i",
        "ó": "o",
        "ò": "o",
        "ö": "o",
        "ô": "o",
        "ú": "u",
        "ù": "u",
        "ü": "u",
        "û": "u",
        "ñ": "n",
    }
)


def slugify(value: str) -> str:
    value = value.lower().translate(TRANSLATION)
    value = re.sub(r"[\s_]+", "-", value)
    value = re.sub(r"[^a-z0-9-]", "", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-")


def should_ignore_file(path: Path) -> bool:
    if path.suffix.lower() != ".md":
        return True
    if path.name in IGNORED_FILES:
        return True
    return any(re.match(pattern, path.name, re.IGNORECASE) for pattern in IGNORED_PATTERNS)


def should_ignore_folder(path: Path) -> bool:
    name = path.name
    return name.startswith(".") or name.endswith("_PDF") or name.lower() == "archivos"


def subject_slug(name: str) -> str:
    return SUBJECT_MAPPING.get(name.upper(), slugify(name))


def resolve_source(source_arg: str, source_root: Path) -> Path:
    candidate = Path(source_arg).expanduser()
    if candidate.is_absolute() or candidate.exists():
        return candidate.resolve()

    fallbacks = [
        Path.cwd() / candidate,
        source_root / candidate,
        source_root / "2ºCarrera" / candidate,
    ]
    for option in fallbacks:
        if option.exists():
            return option.resolve()

    raise FileNotFoundError(
        f"No se encontró '{source_arg}'. Probado en el cwd, {source_root} y {source_root / '2ºCarrera'}."
    )


def detect_target(source: Path) -> Target:
    folder_name = source.name.upper()
    for pattern, (course, term) in FOLDER_PATTERNS.items():
        if pattern in folder_name:
            return Target(source=source, course=course, term=term)
    raise ValueError(
        f"No se pudo detectar el curso/cuatrimestre de '{source.name}'. "
        "Usa nombres tipo 2-TEORIA-1-CUATRI."
    )


def iter_subject_dirs(source: Path) -> Iterable[Path]:
    for item in sorted(source.iterdir()):
        if item.is_dir() and not should_ignore_folder(item):
            yield item


def title_from_filename(path: Path) -> str:
    title = re.sub(r"^[\d]+[\.\-\s]+", "", path.stem).strip()
    return title or path.stem


def extract_link_target(raw_target: str) -> str:
    target = raw_target.strip()
    if "|" in target:
        target = target.split("|", 1)[0]
    filename = Path(target).name
    return filename.rsplit(".", 1)[0] if "." in filename else filename


def clean_wikilinks(content: str) -> str:
    content = re.sub(r"\[\[[^\]]*\|([^\]]+)\]\]", r"\1", content)
    return re.sub(r"\[\[([^\]]+)\]\]", lambda m: extract_link_target(m.group(1)), content)


def convert_images(content: str, mapping: Dict[str, str]) -> str:
    def resolve_image(path_str: str) -> str:
        clean = path_str.strip().lstrip("./")
        if clean in mapping:
            return mapping[clean]
        filename = Path(clean).name
        return mapping.get(filename, clean)

    def replace_obsidian(match: re.Match[str]) -> str:
        return f"![]({resolve_image(match.group(1))})"

    def replace_markdown(match: re.Match[str]) -> str:
        alt, img_path = match.group(1), match.group(2)
        if img_path.startswith(("http://", "https://", "/ApuntesWeb/")):
            return match.group(0)
        return f"![{alt}]({resolve_image(img_path)})"

    content = re.sub(r"!\[\[([^\]]+)\]\]", replace_obsidian, content)
    return re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace_markdown, content)


def convert_obsidian_callouts(content: str) -> str:
    variants = {
        "NOTE": "note",
        "INFO": "note",
        "TIP": "tip",
        "WARNING": "caution",
        "CAUTION": "caution",
        "DANGER": "danger",
    }
    lines = content.splitlines()
    converted = []
    index = 0

    while index < len(lines):
        match = re.match(r"^\s*>\s*\[!([A-Z]+)\]\s*(.*)$", lines[index], re.IGNORECASE)
        if not match:
            converted.append(lines[index])
            index += 1
            continue

        variant = variants.get(match.group(1).upper())
        if not variant:
            converted.append(lines[index])
            index += 1
            continue

        title = match.group(2).strip()
        body = []
        index += 1

        while index < len(lines) and re.match(r"^\s*> ?", lines[index]):
            body.append(re.sub(r"^\s*> ?", "", lines[index]))
            index += 1

        while body and not body[0].strip():
            body.pop(0)
        while body and not body[-1].strip():
            body.pop()

        converted.append(f":::{variant}[{title}]" if title else f":::{variant}")
        converted.extend(body)
        converted.append(":::")

    return "\n".join(converted)


def add_frontmatter(content: str, title: str) -> str:
    if content.lstrip().startswith("---"):
        return content
    return f'---\ntitle: "{title}"\n---\n\n{content}'


def clean_target(project_root: Path, target: Target, dry_run: bool) -> None:
    docs_term = project_root / "src" / "content" / "docs" / target.course / target.term
    images_term = project_root / "public" / "images" / target.course / target.term

    for base in (docs_term, images_term):
        if not base.exists():
            continue
        for item in sorted(base.iterdir()):
            if item.is_file() and item.name.startswith("index"):
                continue
            if dry_run:
                print(f"[DRY-RUN] eliminar {item}")
            else:
                shutil.rmtree(item) if item.is_dir() else item.unlink()


def copy_images(project_root: Path, target: Target, dry_run: bool) -> Dict[str, Dict[str, str]]:
    public_root = project_root / "public" / "images"
    result: Dict[str, Dict[str, str]] = {}

    for subject_dir in iter_subject_dirs(target.source):
        slug = subject_slug(subject_dir.name)
        key = f"{target.course}/{target.term}/{slug}"
        result[key] = {}

        for file in sorted(subject_dir.rglob("*")):
            if not file.is_file() or file.suffix.lower() not in IMAGE_EXTENSIONS:
                continue

            relative = file.relative_to(subject_dir)
            destination = public_root / target.course / target.term / slug / relative
            encoded_parts = [quote(part, safe="") for part in relative.parts]
            web_path = f"/ApuntesWeb/images/{target.course}/{target.term}/{slug}/{'/'.join(encoded_parts)}"

            result[key][relative.as_posix()] = web_path
            result[key][file.name] = web_path

            if dry_run:
                print(f"[DRY-RUN] imagen {file} -> {destination}")
            else:
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(file, destination)

    return result


def copy_notes(project_root: Path, target: Target, image_map: Dict[str, Dict[str, str]], dry_run: bool) -> int:
    docs_root = project_root / "src" / "content" / "docs"
    copied = 0

    for subject_dir in iter_subject_dirs(target.source):
        slug = subject_slug(subject_dir.name)
        image_key = f"{target.course}/{target.term}/{slug}"
        subject_images = image_map.get(image_key, {})

        for note in sorted(subject_dir.rglob("*.md")):
            if should_ignore_file(note):
                continue

            relative = note.relative_to(subject_dir)
            destination = docs_root / target.course / target.term / slug / relative.parent / f"{slugify(note.stem)}.md"

            original = note.read_text(encoding="utf-8")
            rewritten = clean_wikilinks(convert_images(original, subject_images))
            rewritten = convert_obsidian_callouts(rewritten)
            rewritten = add_frontmatter(rewritten, title_from_filename(note))

            if dry_run:
                print(f"[DRY-RUN] nota {note} -> {destination}")
            else:
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_text(rewritten, encoding="utf-8")
            copied += 1

    return copied


def rebuild_indexes(project_root: Path, target: Target, dry_run: bool) -> None:
    docs_root = project_root / "src" / "content" / "docs"
    term_path = docs_root / target.course / target.term
    subjects = []

    for subject_dir in iter_subject_dirs(target.source):
        slug = subject_slug(subject_dir.name)
        files = [
            slugify(path.stem)
            for path in sorted(subject_dir.rglob("*.md"))
            if not should_ignore_file(path)
        ]
        if files:
            subjects.append((subject_dir.name, slug, files[0]))

    if not subjects:
        return

    title = "Primer Cuatrimestre" if "primer" in target.term else "Segundo Cuatrimestre"
    course_title = target.course.capitalize()
    lines = [
        "---",
        f"title: {title}",
        f"description: Asignaturas del {title.lower()} - {course_title}",
        "---",
        "",
        "import { LinkCard, CardGrid } from '@astrojs/starlight/components';",
        "",
        f"# {title}",
        "",
        "<CardGrid>",
    ]
    for label, slug, first_topic in subjects:
        lines.extend(
            [
                "  <LinkCard",
                f'    title="{label}"',
                f'    href="/ApuntesWeb/{target.course}/{target.term}/{slug}/{first_topic}/"',
                "  />",
            ]
        )
    lines.extend(["</CardGrid>", ""])
    content = "\n".join(lines)

    index_path = term_path / "index.mdx"
    if dry_run:
        print(f"[DRY-RUN] reconstruir índice {index_path}")
    else:
        index_path.write_text(content, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingesta de apuntes Markdown a Starlight.")
    parser.add_argument("source", help="Carpeta a procesar, por ejemplo 3-TEORIA-1-CUATRI.")
    parser.add_argument(
        "--source-root",
        default="~/Escritorio",
        help="Raíz donde buscar la carpeta si no pasas una ruta absoluta.",
    )
    parser.add_argument("--dry-run", action="store_true", help="Muestra cambios sin escribir nada.")
    parser.add_argument(
        "--no-clean",
        action="store_true",
        help="No borra el contenido existente del curso/cuatrimestre antes de copiar.",
    )
    parser.add_argument(
        "--skip-images",
        action="store_true",
        help="No copia imágenes ni reescribe rutas de imagen.",
    )
    parser.add_argument(
        "--rebuild-indexes",
        action="store_true",
        help="Regenera el index.mdx del cuatrimestre procesado.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    project_root = Path(__file__).resolve().parent

    try:
        source = resolve_source(args.source, Path(args.source_root).expanduser())
        target = detect_target(source)
    except (FileNotFoundError, ValueError) as exc:
        print(f"❌ {exc}")
        return 1

    print("=" * 60)
    print("INGESTA DE APUNTES")
    print("=" * 60)
    print(f"Origen:  {target.source}")
    print(f"Destino: src/content/docs/{target.label}")
    print(f"Modo:    {'dry-run' if args.dry_run else 'normal'}")
    print("=" * 60)

    if not args.no_clean:
        clean_target(project_root, target, args.dry_run)

    image_map: Dict[str, Dict[str, str]] = {}
    copied_images = 0
    if not args.skip_images:
        image_map = copy_images(project_root, target, args.dry_run)
        copied_images = sum(len(subject.values()) // 2 for subject in image_map.values())

    copied_notes = copy_notes(project_root, target, image_map, args.dry_run)

    if args.rebuild_indexes:
        rebuild_indexes(project_root, target, args.dry_run)

    print("-" * 60)
    print(f"Notas:   {copied_notes}")
    print(f"Imágenes:{copied_images}")
    if args.rebuild_indexes:
        print("Índices: regenerados")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
