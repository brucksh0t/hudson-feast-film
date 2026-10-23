(function(){
  var R=document.documentElement,exp=R.classList.contains('exp'),lite=R.classList.contains('lite');
  // open-now line in New York time; ?now=2026-10-24T13:00 previews another time
  var m=location.search.match(/now=([\d\-T:]+)/),now=m?new Date(m[1]):new Date();
  var ny=new Date(now.toLocaleString('en-US',{timeZone:'America/New_York'})),d=ny.getDay(),h=ny.getHours()+ny.getMinutes()/60,lunch=d===0||d>=5;
  var st=document.querySelector('[data-status]'),td=document.querySelector('[data-today]');
  if(st)st.textContent=lunch&&h>=12&&h<15?'Open now for lunch · until 3 pm':h>=17&&h<22?'Open now for dinner · until 10 pm':h<17&&!(lunch&&h<15)?'Dinner tonight from 5 pm':lunch&&h<12?'Lunch today from noon':'Regional Italian · Hudson, NY';
  if(td)td.textContent=lunch?'Today: lunch 12–3 · dinner 5–10':'Tonight: dinner 5–10';
  [].forEach.call(document.querySelectorAll('.hours tr'),function(tr){if(tr.dataset.d.split(',').indexOf(String(d))>=0)tr.classList.add('today');});
  // menu tabs (keyboard: arrows, Home, End)
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function sel(t,focus){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!on;});if(focus)t.focus();
    if(exp&&window.gsap){gsap.fromTo('#'+t.getAttribute('aria-controls')+' li',{clipPath:'inset(0 0 100% 0)',y:8},{clipPath:'inset(0 0 0% 0)',y:0,duration:.45,stagger:.04,ease:'expo.out',clearProps:'clipPath'});}}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){sel(b);});b.addEventListener('keydown',function(e){var k=e.key,n=tabs.length,j=k==='ArrowRight'?(i+1)%n:k==='ArrowLeft'?(i-1+n)%n:k==='Home'?0:k==='End'?n-1:-1;if(j>=0){e.preventDefault();sel(tabs[j],true);}});});
  // loops play only on screen (and, in the house, only when their chapter is showing); saveData / reduced motion keep posters
  var vids=[].slice.call(document.querySelectorAll('video.loop'));
  // video posters load on approach (or at once when the page is static), never in the first paint
  function poster(v){if(v.dataset.poster&&!v.poster)v.poster=v.dataset.poster;}
  if(!exp||!('IntersectionObserver' in window))vids.forEach(poster);else{var pio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){poster(e.target);pio.unobserve(e.target);}});},{rootMargin:'150% 0px'});vids.forEach(function(v){pio.observe(v);});}
  function playable(v){var s=v.closest('.shot');return !s||s.classList.contains('is-on')||s.dataset.on==='1';}
  var vis=new WeakMap();
  function sync(v){if(vis.get(v)&&playable(v)){if(v.preload!=='auto')v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();}
  if(exp&&!lite&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){vis.set(e.target,e.isIntersecting);sync(e.target);});},{rootMargin:'200px 0px'});vids.forEach(function(v){io.observe(v);});}
  if(!exp||!window.gsap||!window.ScrollTrigger)return;
  var G=gsap;G.registerPlugin(ScrollTrigger);
  // staggered type: words in hard-masked lines
  [].forEach.call(document.querySelectorAll('[data-split]'),function(el){var words=el.innerHTML.split(/\s+(?![^<]*>)/);
    el.innerHTML=words.map(function(w){return '<span class="line" style="display:inline-block"><span>'+w+'</span></span>';}).join(' ');
    var parts=el.querySelectorAll('.line>span');
    if(el.id==='hero-h')G.from(parts,{yPercent:110,duration:.9,stagger:.05,ease:'expo.out',delay:.05});
    else G.from(parts,{yPercent:110,duration:.85,stagger:.05,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 85%'}});});
  G.utils.toArray('.facts__row li,.src-grid li').forEach(function(el){G.from(el,{y:18,duration:.6,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%'}});});
  G.utils.toArray('.frame.clip').forEach(function(el){G.fromTo(el,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.95,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 85%'}});});
  // cut-out: the paper opens through "Floret" onto the flower stall
  var g=document.querySelector('.cut__g'),t=document.querySelector('.cut__t'),cut=document.querySelector('.cut');
  if(g&&t){var fit=function(){var bb=t.getBBox();g.dataset.s=Math.min(innerWidth*.86/bb.width,innerHeight*.5/bb.height);place(+g.dataset.p||0);};
    var place=function(p){var s=+g.dataset.s,k=s*Math.pow(45,Math.pow(p,1.6)),w=innerWidth,h=innerHeight;g.setAttribute('transform','translate('+w/2+' '+h/2+') scale('+k+') translate('+(-w/2)+' '+(-h/2)+')');g.dataset.p=p;};
    var o={p:0};fit();addEventListener('resize',fit);if(document.fonts)document.fonts.ready.then(fit);
    G.to(o,{p:1,ease:'none',scrollTrigger:{trigger:cut,start:'top top',end:'bottom bottom',scrub:.3},onUpdate:function(){place(o.p);}});
    G.from('.cut__cap > *',{y:30,duration:.7,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:cut,start:'45% top',toggleActions:'play none none reverse'}});}
  // pinned house: four chapters, each swaps the media with a hard top-down wipe
  var house=document.querySelector('.house'),chs=[].slice.call(document.querySelectorAll('.ch')),shots=[].slice.call(document.querySelectorAll('.house__media .shot'));
  if(house&&chs.length){var cur=0;var set=function(i){if(i===cur)return;cur=i;chs.forEach(function(c,j){c.classList.toggle('is-on',j===i);});
      shots.forEach(function(s,j){s.dataset.on=j===i?'1':'0';if(j===i){G.fromTo(s,{clipPath:'inset(0 0 100% 0)',zIndex:2},{clipPath:'inset(0 0 0% 0)',duration:.6,ease:'expo.out',onComplete:function(){shots.forEach(function(o,k){if(k!==i)o.classList.remove('is-on');});s.classList.add('is-on');G.set(s,{zIndex:1});vids.forEach(sync);}});}});vids.forEach(sync);};
    ScrollTrigger.create({trigger:house,start:'top top',end:'+=240%',pin:'.house__pin',pinSpacing:true,onUpdate:function(st){set(Math.min(chs.length-1,Math.floor(st.progress*chs.length*0.999)));}});}
  // film triggers were created before the pinned scenes: re-sort by page order so the pin spacing is counted
  ScrollTrigger.sort();ScrollTrigger.refresh();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.sort();ScrollTrigger.refresh();});
  addEventListener('load',function(){ScrollTrigger.sort();ScrollTrigger.refresh();});
})();
