import { readFileSync } from 'node:fs';
import { cargarConfig } from './backend/src/config.js';
import { escanearVault, extraerEmbeds } from './backend/src/scanner.js';

const config = cargarConfig();
const v = config.vaults.find((x) => x.curso === 3 && x.cuatri === 1);
const vault = escanearVault(v, config);
const asig = vault.asignaturas.find((a) => a.nombre === 'IA');
const ruta = '/Users/adrianql5/Desktop/3-Carrera/3-TEORIA-1-CUATRI/IA/2. Búsqueda en Espacio de Estados.md';
const texto = readFileSync(ruta, 'utf8');
const embeds = extraerEmbeds(texto, asig, vault);
for (const e of embeds) {
  console.log((e.resuelta ? 'OK   ' : 'ROTO ') + e.objetivo);
}
