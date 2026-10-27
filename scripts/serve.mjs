import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.xml':'application/xml'};
http.createServer(async(req,res)=>{try{let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(url.startsWith('/Evermatter/'))url=url.slice('/Evermatter'.length);let p=path.resolve(root,'.'+url);if(!p.startsWith(root))throw new Error('Forbidden');try{if((await stat(p)).isDirectory())p=path.join(p,'index.html');}catch{p=path.join(root,'404.html');}const data=await readFile(p);res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:4173'));
