import {stages} from './content-v4.js';
export function mountProcess(){
 const player=document.querySelector('.process-player');if(!player)return;
 const video=player.querySelector('video'),buttons=[...player.querySelectorAll('[data-stage]')];
 let selected=-1,visible=false,manual=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||navigator.connection?.saveData;
 function display(index){if(index===selected)return;selected=index;const stage=stages[index];buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));player.querySelector('.stage-description h3').textContent=stage.title;player.querySelector('.stage-text').textContent=stage.text;player.querySelector('.stage-detail').textContent=stage.detail;}
 buttons.forEach((button,index)=>button.addEventListener('click',()=>{manual=true;video.currentTime=stages[index].time+.05;display(index);video.play().catch(()=>{});}));
 video.addEventListener('timeupdate',()=>{let index=0;stages.forEach((stage,i)=>{if(video.currentTime>=stage.time)index=i;});display(index);});
 video.addEventListener('pointerdown',()=>{manual=true;});video.addEventListener('keydown',()=>{manual=true;});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)video.pause();else if(!reduced&&!manual)video.play().catch(()=>{});},{threshold:.35});observer.observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(visible&&!manual&&!reduced)video.play().catch(()=>{});});display(0);
}
