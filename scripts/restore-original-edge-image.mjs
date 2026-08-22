import { readFile, writeFile } from 'node:fs/promises';

const homePath = new URL('../client/src/pages/Home.tsx', import.meta.url);
const dataUriPath = new URL('../../webdev-static-assets/muons-edge-physical-infrastructure-data-uri.txt', import.meta.url);
const current = await readFile(homePath, 'utf8');
const dataUri = (await readFile(dataUriPath, 'utf8')).trim();
const oldReference = 'const edgeInfrastructureImage = `${mediaOrigin}/muons-technology-sensor.jpg`;';
const newReference = `const edgeInfrastructureImage = ${JSON.stringify(dataUri)};`;
if (!current.includes(oldReference)) {
  throw new Error('Expected edge infrastructure image reference was not found.');
}
await writeFile(homePath, current.replace(oldReference, newReference), 'utf8');
console.log(`Restored original edge image as an inline data URI (${dataUri.length} characters).`);
