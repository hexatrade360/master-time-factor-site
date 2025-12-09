// Re-trigger fade-in animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
        else entry.target.classList.remove("visible");
    });
});
document.querySelectorAll(".fade-in-up").forEach(el => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
    const path = document.getElementById("forecastPath");
    const dot  = document.getElementById("priceDot");

    if (!path || !dot) return;

    const total = path.getTotalLength();
    path.style.strokeDasharray  = total;
    path.style.strokeDashoffset = total;

    const duration = 9000;
    let start = null;

    function generatePattern() {
        let points = [];
        let last = 0;
        for (let i = 0; i < 12; i++) {
            let swing = (Math.random() * 0.6) - 0.3; 
            let next = last + swing;
            next = Math.max(0, Math.min(1, next));
            points.push(next);
            last = next;
        }
        return points;
    }

    let pattern = generatePattern();

    function randomPrice(t) {
        let idx = t * (pattern.length - 1);
        let low = Math.floor(idx);
        let high = Math.ceil(idx);
        let frac = idx - low;
        return pattern[low] * (1 - frac) + pattern[high] * frac;
    }

    function frame(ts){
        if (!start) start = ts;
        const elapsed = (ts - start) % duration;
        const t = elapsed / duration;

        if (elapsed < 16) pattern = generatePattern();

        path.style.strokeDashoffset = total * (1 - t);

        const p = randomPrice(t);
        const point = path.getPointAtLength(total * p);

        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});
