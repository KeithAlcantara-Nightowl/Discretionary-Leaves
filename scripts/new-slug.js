#!/usr/bin/env node
// Generates/decodes FAQ version slugs.
// Scheme: epoch seconds + SECRET_OFFSET, digits replaced by letters
//   0→k 1→r 2→d 3→x 4→m 5→q 6→z 7→p 8→w 9→f
// (Mirrors the Airtable formula — see README.)
//
// Usage:
//   node scripts/new-slug.js                      -> slug for right now
//   node scripts/new-slug.js 2026-06-12           -> slug for a specific date
//   node scripts/new-slug.js --decode rpwwkqxzxf  -> decode an existing slug

const SECRET_OFFSET = 8675309;
const D2L = { 0:'k',1:'r',2:'d',3:'x',4:'m',5:'q',6:'z',7:'p',8:'w',9:'f' };
const L2D = Object.fromEntries(Object.entries(D2L).map(([d, l]) => [l, d]));

const args = process.argv.slice(2);

if (args[0] === '--decode') {
  const slug = args[1];
  if (!slug || !/^[krdxmqzpwf]+$/.test(slug)) {
    console.error('Provide a valid slug to decode.'); process.exit(1);
  }
  const digits = slug.split('').map((c) => L2D[c]).join('');
  const epoch = parseInt(digits, 10) - SECRET_OFFSET;
  console.log(`${slug} -> ${new Date(epoch * 1000).toISOString()}`);
  process.exit(0);
}

const date = args[0] ? new Date(args[0]) : new Date();
if (isNaN(date.getTime())) { console.error('Invalid date.'); process.exit(1); }

const shifted = Math.floor(date.getTime() / 1000) + SECRET_OFFSET;
const slug = String(shifted).split('').map((d) => D2L[d]).join('');

console.log(`Date:  ${date.toISOString()}`);
console.log(`Slug:  ${slug}`);
console.log(`URL:   https://discretionary-leaves.vercel.app/v/${slug}`);
