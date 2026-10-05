const header=document.querySelector('[data-header]');
const updateHeader=()=>{if(header) header.classList.toggle('scrolled',window.scrollY>40)};
updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});

const menu=document.querySelector('.menu');
const mobileNav=document.querySelector('.mobile-nav');
menu?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.querySelectorAll('i')[0].style.transform=open?'translateY(4px) rotate(45deg)':'';menu.querySelectorAll('i')[1].style.transform=open?'translateY(-3px) rotate(-45deg)':''});
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelectorAll('i').forEach(i=>i.style.transform='')}));
const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target)}})},{threshold:.14});
document.querySelectorAll('.intro,.machine-head,.product-stage,.machine-bottom,.details-image,.details-copy,.ritual-media,.ritual-copy,.range-head,.range article,.statement-image,.statement-copy,.journal-main,.journal-side article,.contact-grid').forEach(el=>{el.classList.add('reveal');reveal.observe(el)});


const progress=document.querySelector('.scroll-progress');
const updateScrollProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight; if(progress) progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`};
window.addEventListener('scroll',updateScrollProgress,{passive:true});
updateScrollProgress();

if(window.matchMedia('(pointer:fine)').matches){
 const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring'); let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
 window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot&&ring){dot.style.opacity=1;ring.style.opacity=1;dot.style.left=mx+'px';dot.style.top=my+'px'}});
 function cursor(){if(ring){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursor)} cursor();
 document.querySelectorAll('a,button,.gallery-item,.process-card,.product-stage,.details-image,.ritual-media').forEach(el=>{el.addEventListener('mouseenter',()=>ring?.classList.add('active'));el.addEventListener('mouseleave',()=>ring?.classList.remove('active'))});
 document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
}
