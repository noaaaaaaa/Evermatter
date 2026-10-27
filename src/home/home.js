import {panels,renderAdvantage} from './advantages-v3.js';
const container=document.querySelector('#adv-content'),buttons=[...document.querySelectorAll('[data-adv]')];
function select(index){buttons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===index)));renderAdvantage(container,index);}
buttons.forEach((button,index)=>button.addEventListener('click',()=>select(index)));select(0);
const menu=document.querySelector('.menu'),navigation=document.querySelector('nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelectorAll('video').forEach(video=>video.addEventListener('error',()=>{const caption=video.parentElement.querySelector('figcaption');caption.textContent='The film could not load. Read the complete process description on our Technology page.';}));
