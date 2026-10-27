import {renderAdvantage} from './home/advantages-v4.js';
import {mountProcess} from './process-v4.js';
const container=document.querySelector('#adv-content'),buttons=[...document.querySelectorAll('[data-adv]')];
if(container){const select=index=>{buttons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===index)));renderAdvantage(container,index);};buttons.forEach((b,index)=>b.addEventListener('click',()=>select(index)));select(0);}
const menu=document.querySelector('.menu'),navigation=document.querySelector('#main-navigation');
const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');navigation?.classList.remove('open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});navigation?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
export function draftURL(values){const subject='Evermatter enquiry — '+values.name;const body='Name: '+values.name+'\nEmail: '+values.email+'\nOrganisation: '+(values.organisation||'')+'\n\n'+values.message;return 'mailto:postmaster@evermatter.tech?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);}
const form=document.querySelector('#enquiry-form');form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));document.querySelector('#form-status').textContent='Your email draft is ready. Review it in your email app and press Send.';location.href=draftURL(values);});
mountProcess();
