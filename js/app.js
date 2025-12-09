
document.addEventListener("DOMContentLoaded", () => {

    const svg = document.getElementById("priceSVG");
    const line = document.getElementById("priceLine");
    const dot  = document.getElementById("priceDot");

    const W = 500;
    const H = 200;

    function generatePricePath() {
        let points = [];
        let xStep = W / 40;
        let price = H/2;

        for (let i = 0; i < 40; i++) {
            let swing = (Math.random() - 0.5) * 80; // big volatility
            price += swing;
            price = Math.max(10, Math.min(H-10, price));
            points.push([i * xStep, price]);
        }
        return points;
    }

    function animatePath() {
        const path = generatePricePath();
        let pts = path.map(p => p.join(",")).join(" ");
        line.setAttribute("points", pts);

        let t = 0;
        const speed = 0.002; // slower movement
        function frame() {
            t += speed;
            if (t >= 1) {
                animatePath();
                return;
            }
            let idx = Math.floor(t * (path.length-1));
            let nx = path[idx][0];
            let ny = path[idx][1];
            dot.setAttribute("cx", nx);
            dot.setAttribute("cy", ny);
            requestAnimationFrame(frame);
        }
        frame();
    }

    animatePath();
});
