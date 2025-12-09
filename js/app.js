const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("visible");});});
document.querySelectorAll(".fade-in-up").forEach(el=>obs.observe(el));
