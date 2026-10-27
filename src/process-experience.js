export function createProcessTeaser(React) {
  const h=React.createElement;
  return function EvermatterProcessTeaser(){return h('section',{className:'em-process-teaser'},h('div',null,h('h2',null,'See the recovery train take shape.'),h('p',null,'From the resin bed to a modular installation. Explore our proposed PF₆⁻ recovery process.')),h('a',{className:'em-process-home',href:'technology/#recovery-process'},h('figure',null,h('img',{src:'assets/process-poster.jpg',alt:'Concept installation of Evermatter multi-column recovery system',loading:'lazy'}),h('figcaption',null,'Explore the recovery system',h('small',null,'28-second process film · Concept visualisation')))));};
}
export function createProcessExperience(React) {
  const h = React.createElement;
  const stages = [
    {time:0, label:'Selective capture', title:'Start with the resin, not the whole waste stream.', text:'PF₆⁻-bearing battery wastewater passes through an ion-exchange resin bed. Selective adsorption has been tested in actual battery wastewater.', detail:'The yellow-green liquid represents the wastewater. Capture does not imply decolourisation.'},
    {time:6, label:'Alternating columns', title:'One column captures while another regenerates.', text:'The proposed multi-column train alternates adsorption and elution duties. Loaded columns move into regeneration while other columns continue treating the incoming stream.', detail:'Four columns illustrate the operating concept; final column count, sizing and switching logic remain to be engineered.'},
    {time:13, label:'Elution & heat exchange', title:'Move the captured material into a recovery stream.', text:'The proposed thermal-elution stage releases captured PF₆⁻ from the resin. The rich eluate then passes through a heat exchanger before crystallisation.', detail:'Elution conditions, resin reuse and the integrated thermal circuit are still under development.'},
    {time:18, label:'Crystallisation', title:'Recover value as a potassium salt.', text:'A proposed fluidised-bed crystallisation stage operates at ambient temperature to recover KPF₆. Product yield, purity and suitability for sale still require validation.', detail:'Potassium addition, mother-liquor handling and product specifications will be defined during process development.'},
    {time:23, label:'Integrated system', title:'Build around the treatment line already on site.', text:'Adsorption, elution, heat exchange and crystallisation are brought together as a modular recovery train. The aim is to integrate with a partner’s wastewater process.', detail:'This is a concept installation, not an operating plant or a representation of Livium’s site.'}
  ];
  return function EvermatterProcess() {
    const ref=React.useRef(null), userPaused=React.useRef(false), [active,setActive]=React.useState(0), [playing,setPlaying]=React.useState(false), [failed,setFailed]=React.useState(false);
    React.useEffect(()=>{
      const video=ref.current;
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const saveData=navigator.connection?.saveData;
      let visible=false;
      const sync=()=>{let index=0;stages.forEach((s,i)=>{if(video.currentTime>=s.time)index=i;});setActive(index);};
      const onPlay=()=>setPlaying(true), onPause=()=>setPlaying(false);
      const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)video.pause();else if(!reduced&&!saveData&&!userPaused.current)video.play().catch(()=>{});},{threshold:.35});
      const visibility=()=>{if(document.hidden)video.pause();else if(visible&&!userPaused.current&&!reduced&&!saveData)video.play().catch(()=>{});};
      const manual=()=>{userPaused.current=true;};
      video.addEventListener('timeupdate',sync);video.addEventListener('play',onPlay);video.addEventListener('pause',onPause);
      video.addEventListener('pointerdown',manual);video.addEventListener('keydown',manual);
      document.addEventListener('visibilitychange',visibility);observer.observe(video);
      if(location.hash==='#recovery-process')requestAnimationFrame(()=>document.getElementById('recovery-process')?.scrollIntoView());
      return()=>{observer.disconnect();video.removeEventListener('timeupdate',sync);video.removeEventListener('play',onPlay);video.removeEventListener('pause',onPause);video.removeEventListener('pointerdown',manual);video.removeEventListener('keydown',manual);document.removeEventListener('visibilitychange',visibility);};
    },[]);
    function seek(index){const v=ref.current;setActive(index);v.currentTime=stages[index].time+.05;v.play().catch(()=>{});}
    const stage=stages[active];
    return h('section',{className:'em-process',id:'recovery-process','aria-labelledby':'em-process-title'},
      h('div',{className:'em-process-heading'},h('h2',{id:'em-process-title'},'From selective capture to a modular recovery train.'),h('p',null,'Follow the proposed PF₆⁻ recovery pathway, from the resin bed to an integrated system.')),
      h('div',{className:'em-process-film'},h('video',{ref,controls:true,muted:true,playsInline:true,preload:'metadata',poster:'assets/process-poster.jpg','aria-label':'Evermatter proposed PF6 recovery process, 28-second concept animation','aria-describedby':'em-process-status',onError:()=>setFailed(true)},h('source',{src:'assets/evermatter-process-v2.mp4',type:'video/mp4'}),h('track',{kind:'captions',src:'assets/process-captions.vtt',srcLang:'en',label:'English'}),'Your browser does not support video.'),failed&&h('p',{className:'em-process-error'},'The animation could not load. The process description remains available below.')),
      h('div',{className:'em-process-navigation','aria-label':'Explore the process'},stages.map((s,i)=>h('button',{key:s.label,type:'button','aria-pressed':active===i,onClick:()=>seek(i)},h('span',null,s.label),h('span',{'aria-hidden':true,className:'em-process-marker'})))),
      h('div',{className:'em-process-description'},h('h3',null,stage.title),h('div',null,h('p',null,stage.text),h('p',{className:'em-process-detail'},stage.detail)),h('button',{type:'button',className:'em-process-play',onClick:()=>{const v=ref.current;userPaused.current=true;if(v.paused){if(v.ended)v.currentTime=0;v.play().catch(()=>{});}else v.pause();},'aria-label':playing?'Pause animation':'Play animation'},playing?'Pause film':'Play film')),
      h('p',{id:'em-process-status',className:'em-process-status'},'Development status: adsorption tested in real wastewater. Regeneration, KPF₆ recovery and integrated pilot operation remain to be validated. Equipment, column count and installation are illustrative.'),
      h('details',{className:'em-process-transcript'},h('summary',null,'Read the complete process description'),stages.map(s=>h('div',{key:s.label},h('h3',null,s.label),h('p',null,s.text),h('p',null,s.detail))))
    );
  };
}
