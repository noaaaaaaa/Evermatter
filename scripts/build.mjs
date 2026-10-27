import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=path.join(root,'dist');
await mkdir(path.join(out,'assets'),{recursive:true});
let app=await readFile(path.join(root,'src/reference.app.js'),'utf8');
function replace(from,to){if(!app.includes(from))throw new Error('Missing reference text: '+from);app=app.split(from).join(to);}
const edits=JSON.parse(await readFile(path.join(root,'src/copy-edits.json'),'utf8'));
for(const [from,to] of edits)replace(from,to);
const urls=[...new Set(app.match(/https:\/\/material-image\.wanwang\.xin\/[^"\s]+/g))];
const imageMap={
  'd381aff8-e8d7-4e6a-b3e7-2a56426213ce.webp':'logo.webp',
  '78384c79-a95b-4e0c-8de9-a033ec794b8c.webp':'zhanheng.webp',
  '0232657a-a84a-455a-b47b-e86556538b58.webp':'song.webp',
  '5e6bc99b-0c40-4c0f-9221-d7826c3b3845.webp':'raya.webp'
};
for(const url of urls){const name=imageMap[url.split('/').pop()];if(!name)throw new Error('Unknown image '+url);replace(url,'assets/'+name);}
const concepts={
 'industrial-wastewater-treatment-piping-plant.jpg':'skid.jpg',
 'modern-laboratory-workspace-with-scientific-equipment.jpg':'lab.jpg',
 'white-potassium-crystals-powder-closeup.jpg':'powder.jpg'
};
for(const [name,local] of Object.entries(concepts))replace('https://baas-api.wanwang.xin/toc/image/preview/'+name+'?w=1000&h=800&q=80','assets/'+local);
app=app.replace(/f\.jsx\("img",\{src:"assets\/(?:lab|skid|powder)\.jpg",alt:"[^"]*",className:"[^"]*"\}\)/g,img=>'f.jsxs("figure",{className:"h-full",children:['+img+',f.jsx("figcaption",{className:"mt-2 font-mono text-xs text-brand-ink-muted",children:"Concept illustration · not a photograph of validated equipment or product"})]})');
replace('Sb(h4)','Sb(h4,{basename:window.__EVERMATTER_BASE__||"/"})');
replace('l=d=>{d.preventDefault(),a()&&o(!0)}','l=d=>{d.preventDefault();if(a()){const subject="Evermatter enquiry — "+e.name;const body="Name: "+e.name+"\\nEmail: "+e.email+"\\nOrganisation: "+e.organization+"\\n\\n"+e.message;window.location.href="mailto:"+Ye.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);o(!0)}}');
if(/https:\/\/(?:material-image|baas-api)\./.test(app))throw new Error('Unlocalised asset');
await writeFile(path.join(out,'assets/app.js'),app);
await cp(path.join(root,'src/reference.css'),path.join(out,'assets/app.css'));
await cp(path.join(root,'src/assets'),path.join(out,'assets'),{recursive:true});
const html=`<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#05090c"><title>Evermatter | Matter never ends.</title>
<meta name="description" content="Evermatter develops selective PF₆⁻ capture and a proposed KPF₆ recovery pathway for battery wastewater. Brisbane, Australia.">
<script>window.__EVERMATTER_BASE__=location.hostname.endsWith('.github.io')?'/Evermatter/':'/';document.write('<base href="'+window.__EVERMATTER_BASE__+'">');</script>
<link rel="icon" href="assets/logo.webp"><link rel="stylesheet" href="assets/app.css">
<script type="module" src="assets/app.js"></script></head><body><div id="root"></div>
<noscript>Please enable JavaScript to view this website. Contact postmaster@evermatter.tech.</noscript></body></html>`;
for(const route of ['', 'technology','about','milestones','contact']){await mkdir(path.join(out,route),{recursive:true});await writeFile(path.join(out,route,'index.html'),html);}
await writeFile(path.join(out,'404.html'),html);
await writeFile(path.join(out,'.nojekyll'),'');
await writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://evermatter.tech/sitemap.xml\n');
await writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','technology','about','milestones','contact'].map(r=>'<url><loc>https://evermatter.tech/'+r+'</loc></url>').join('')+'</urlset>');
console.log('Built five routes with local assets and verified copy replacements.');
