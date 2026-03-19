#!/usr/bin/env python3
"""Detecta y elimina imágenes de public/images que no están referenciadas."""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from urllib.parse import unquote

IMAGE_PATTERN = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
RAW_PATTERN = re.compile(r'([("\'])((?:/ApuntesWeb/)?images/[^)"\'\s>]+)')
VALID_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp"}
TEXT_SUFFIXES = {".md", ".mdx", ".astro", ".css", ".mjs", ".js", ".ts"}


def normalize_ref(raw: str) -> str:
    value = raw.strip().split("?", 1)[0].split("#", 1)[0]
    if "/ApuntesWeb/" in value:
        value = value.split("/ApuntesWeb/", 1)[1]
    value = unquote(value.lstrip("/"))
    if "|" in value:
        head, tail = value.rsplit("|", 1)
        if re.fullmatch(r"[\dx]+", tail, re.IGNORECASE):
            value = head
    return value


def collect_refs(project_root: Path) -> set[str]:
    refs: set[str] = set()
    for path in (project_root / "src").rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            text = path.read_text(encoding="utf-8", errors="ignore")
            for match in IMAGE_PATTERN.finditer(text):
                if "/images/" in match.group(1):
                    refs.add(normalize_ref(match.group(1)))
            for match in RAW_PATTERN.finditer(text):
                refs.add(normalize_ref(match.group(2)))
    return refs


def main() -> int:
    parser = argparse.ArgumentParser(description="Elimina imágenes no usadas de public/images.")
    parser.add_argument("--delete", action="store_true", help="Borra los archivos encontrados.")
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent
    refs = collect_refs(project_root)
    public_images = project_root / "public" / "images"
    unused = [
        image
        for image in sorted(public_images.rglob("*"))
        if image.is_file()
        and image.suffix.lower() in VALID_SUFFIXES
        and image.relative_to(project_root / "public").as_posix() not in refs
    ]

    for image in unused:
        print(image.relative_to(project_root).as_posix())
        if args.delete:
            image.unlink()

    print(f"\nTotal: {len(unused)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
