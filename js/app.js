const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");}});});
document.querySelectorAll(".fade-in-up").forEach(el=>observer.observe(el));

document.addEventListener("mousemove",(e)=>{
const x=(e.clientX/window.innerWidth)-0.5;
const y=(e.clientY/window.innerHeight)-0.5;
document.querySelectorAll(".sphere").forEach((s,i)=>{
const intensity=(i+1)*10;
s.style.transform=`translate(${x*intensity}px,${y*intensity}px)`;
});
});
