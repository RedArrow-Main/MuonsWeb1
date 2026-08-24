import { readFile, writeFile } from 'node:fs/promises';

const homePath = new URL('../client/src/pages/Home.tsx', import.meta.url);
const source = await readFile(homePath, 'utf8');
const withoutImpactNav = source.replace('  { label: "Impact", href: "#outcomes" },\n', '');
if (withoutImpactNav === source) {
  throw new Error('Impact navigation item was not found.');
}
const cycleStart = withoutImpactNav.indexOf('\n        <section id="cycle"');
const regenerativeStart = withoutImpactNav.indexOf('\n        <section id="regenerative"', cycleStart);
if (cycleStart === -1 || regenerativeStart === -1 || regenerativeStart <= cycleStart) {
  throw new Error('Season cycle and Outcomes section boundaries were not found.');
}
const updated = withoutImpactNav.slice(0, cycleStart) + withoutImpactNav.slice(regenerativeStart);
await writeFile(homePath, updated, 'utf8');
console.log('Removed the Season cycle and Outcomes sections plus the Impact navigation item.');
