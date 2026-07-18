// Slugs ASCII para URLs: "3. Herencia y Polimorfismo.md" → "3-herencia-y-polimorfismo"
export function slug(texto) {
  return texto
    .replace(/\.md$/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'sin-nombre';
}

// Generador de slugs únicos dentro de un ámbito (añade -2, -3… si colisiona)
export function crearSlugger() {
  const usados = new Map();
  return (texto) => {
    const base = slug(texto);
    const n = usados.get(base) ?? 0;
    usados.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  };
}
