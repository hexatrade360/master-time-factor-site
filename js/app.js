// Re-trigger fade-in animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
});
document.querySelectorAll(".fade-in-up").forEach(el => observer.observe(el));

// Sharp price-follow animation on the forecast banner
document.addEventListener("DOMContentLoaded", () => {
    const path = document.getElementById("forecastPath");
    const dot  = document.getElementById("priceDot");

    if (!path || !dot) return;

    const total = path.getTotalLength();

    // Prepare the line for "draw-in" animation
    path.style.strokeDasharray  = total;
    path.style.strokeDashoffset = total;

    const duration = 1600; // ms for one full move
    let start = null;

    // Map smooth 0..1 -> "sharp" price-like progress along the path
    function sharpProgress(t){
        // piecewise mapping: holds, then jumps, then grinds, then late spike
        if (t < 0.10) return t * 0.2;           // slow start
        if (t < 0.25) return 0.02 + (t-0.10)*1.5; // first sharp burst
        if (t < 0.55) return 0.25 + (t-0.25)*0.4; // grind
        if (t < 0.80) return 0.37 + (t-0.55)*1.0; // acceleration
        return 0.62 + (t-0.80)*2.0;              // final spike
    }

    function easeOutCubic(x){
        const inv = 1 - x;
        return 1 - inv*inv*inv;
    }

    function frame(ts){
        if (!start) start = ts;
        const elapsed = (ts - start) % duration;
        const t = elapsed / duration;

        const eased = easeOutCubic(t);

        // Animate line drawing
        const lineProgress = eased;
        path.style.strokeDashoffset = total * (1 - lineProgress);

        // Animate price dot along "sharp" mapping
        const p = Math.min(1, Math.max(0, sharpProgress(eased)));
        const point = path.getPointAtLength(total * p);
        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
});
