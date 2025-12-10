
document.addEventListener("DOMContentLoaded", () => {
    const line = document.getElementById("priceLine");
    const dot  = document.getElementById("priceDot");

    const W = 500;
    const H = 260;

    // Clean aesthetic slightly smaller waveform
    const BASELINE = 185;  
    const AMP = 22;  

    function generatePricePath() {
        let points = [];
        let xStep = W / 50;
        let price = BASELINE;

        for (let i = 0; i < 50; i++) {
            let swing = (Math.random() - 0.5) * AMP;
            price += swing;

            // Keep waveform small and clean
            price = Math.max(130, Math.min(230, price));

            points.push([i * xStep, price]);
        }
        return points;
    }

    function animatePath() {
        const path = generatePricePath();
        line.setAttribute("points", path.map(p => p.join(",")).join(" "));

        let t = 0;
        const speed = 0.002;

        function frame() {
            t += speed;
            if (t >= 1) return animatePath();

            let idx = Math.floor(t * (path.length - 1));

            dot.setAttribute("cx", path[idx][0]);
            dot.setAttribute("cy", path[idx][1]);

            requestAnimationFrame(frame);
        }
        frame();
    }

    animatePath();
});
