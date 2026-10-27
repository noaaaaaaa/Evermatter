import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {documentPage,header,footer,about,technology,milestonePage,contact} from '../src/site/pages.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),out=path.join(root,'dist');
await mkdir(path.join(out,'assets/home'),{recursive:true});
const originalLogo=await readFile(path.join(root,'src/assets/logo.webp'));
const mark=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="300 40 850 850" width="850" height="850"><image width="1450" height="1085" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/webp;base64,${originalLogo.toString('base64')}"/></svg>`;
await writeFile(path.join(out,'assets/logo-mark.svg'),mark);
const assets=['home/resin.jpg','home/columns.jpg','home/heat.jpg','home/crystalliser.jpg','home/system.jpg','home/electric-car.jpg','home/dm-sans.font','home/DM-Sans-OFL.txt','zhanheng.webp','song.webp','raya.webp','ambc-pitch.jpg','evermatter-process-clean.mp4','process-captions-clean.vtt'];
for(const file of assets){await mkdir(path.dirname(path.join(out,'assets',file)),{recursive:true});await cp(path.join(root,'src/assets',file),path.join(out,'assets',file));}
// Existing media URLs also serve clean exports, with no baked overlays.
await cp(path.join(root,'src/assets/evermatter-process-clean.mp4'),path.join(out,'assets/evermatter-process-v2.mp4'));
await cp(path.join(root,'src/assets/home/system.jpg'),path.join(out,'assets/process-poster.jpg'));
for(const name of ['resin','columns','heat','crystalliser','system']){const data=await readFile(path.join(root,'src/assets/home',name+'.jpg'));if(data.readUInt16BE(0)!==0xffd8||data.includes(Buffer.from('Blender:'))||data.includes(Buffer.from('C:\\Users\\')))throw Error('Expected metadata-clean JPEG export: '+name);}
const describeVisuals=value=>value
 .replaceAll(' · Original concept rendering','').replaceAll(' · Concept rendering','').replaceAll(' · Concept render, not a product photograph','').replaceAll(' · Concept render','')
 .replaceAll('28-second process film · Concept installation. ','Follow the liquid from resin capture to the integrated recovery train. ').replaceAll(' · Concept installation','')
 .replaceAll('Concept equipment only. ','').replaceAll('Concept material flow. ','').replaceAll('Concept installation of ','').replaceAll('Concept rendering of ','').replaceAll('concept rendering of ','')
 .replaceAll(' — original concept rendering','').replaceAll(' concept animation',' animation').replaceAll('Concept integrated recovery system','Integrated recovery system')
 .replaceAll('Concept route comparison, not a balanced reaction or product-equivalence claim. Recovered KPF₆ is not finished LiPF₆.','The upper row shows HF-based virgin LiPF₆ production; the lower row shows KPF₆ recovery from PF₆⁻ already in wastewater.')
 .replaceAll('Illustrative installation · Site layout and capacity to be engineered','The equipment skids form a connected recovery system.')
 .replaceAll('Electric mobility · Application-context photograph','Electric mobility and the battery-materials supply chain.');
let home=await readFile(path.join(root,'src/home/home.html'),'utf8');
home=home.replace(/<header>[\s\S]*?<\/header>/,header('')).replace(/<footer>[\s\S]*?<\/footer>/,footer());
home=home.replace(/<link rel="icon"[^>]*>/,'<link rel="icon" type="image/svg+xml" href="assets/logo-mark.svg?v=4">').replace('assets/home/home-v3.css','assets/site-v4.css').replace('assets/home/home-v3.js','assets/site-v4.js').replaceAll('assets/evermatter-process-v2.mp4','assets/evermatter-process-clean.mp4').replaceAll('assets/process-captions.vtt','assets/process-captions-clean.vtt');
home=describeVisuals(home);
if(/concept|watermark|Huashu-Design/i.test(home))throw Error('Unexpected media label in homepage output');
await writeFile(path.join(out,'index.html'),home);
for(const [route,title,description,body] of [
 ['about','Company','The scientists and builders developing electrolyte recovery from battery wastewater.',about()],
 ['technology','Technology','Selective PF₆⁻ capture, regeneration development and KPF₆ recovery for battery wastewater.',technology()],
 ['milestones','Milestones','Evermatter’s company milestones and CEO pitch at AMBC.',milestonePage()],
 ['contact','Contact','Discuss wastewater treatment, pilot integration and recovery with Evermatter.',contact()]
]){await mkdir(path.join(out,route),{recursive:true});await writeFile(path.join(out,route,'index.html'),documentPage({title,description,route,body}));}
const baseCSS=await readFile(path.join(root,'src/home/base.css'),'utf8');
const css=baseCSS.replace('url(dm-sans.font)','url(home/dm-sans.font)')+'\n'+await readFile(path.join(root,'src/home/advantages.css'),'utf8')+'\n'+await readFile(path.join(root,'src/site/site.css'),'utf8');
await writeFile(path.join(out,'assets/site-v4.css'),css);
for(const [from,to] of [['site.js','site-v4.js'],['process.js','process-v4.js'],['content.mjs','content-v4.js']])await cp(path.join(root,'src/site',from),path.join(out,'assets',to));
await writeFile(path.join(out,'assets/home/advantages-v4.js'),describeVisuals(await readFile(path.join(root,'src/home/advantages.js'),'utf8')));
await writeFile(path.join(out,'404.html'),documentPage({route:'',title:'Page not found',description:'Find your way back to Evermatter.',body:'<section class="page-lead section"><h1>Let’s get you back to Evermatter.</h1><p><a class="text-link" href="./">Return to the homepage</a></p></section>'}));
await writeFile(path.join(out,'.nojekyll'),'');
await writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://evermatter.tech/sitemap.xml\n');
await writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','technology','about','milestones','contact'].map(route=>'<url><loc>https://evermatter.tech/'+route+(route?'/':'')+'</loc></url>').join('')+'</urlset>');
console.log('Built five unified pages, original-proportion brand mark, AMBC photo and clean process film.');
