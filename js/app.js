
document.addEventListener("DOMContentLoaded", () => {
    const line = document.getElementById("priceLine");
    const dot  = document.getElementById("priceDot");

    const W = 500;
    const H = 180;

    function generatePricePath() {
        let points = [];
        let xStep = W / 50;
        let price = H/2;

        for (let i = 0; i < 50; i++) {
            let swing = (Math.random() - 0.5) * 90;
            price += swing;
            price = Math.max(10, Math.min(H-10, price));
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
            if (t >= 1) {
                animatePath();
                return;
            }
            let idx = Math.floor(t * (path.length-1));
            dot.setAttribute("cx", path[idx][0]);
            dot.setAttribute("cy", path[idx][1]);
            requestAnimationFrame(frame);
        }
        frame();
    }

    animatePath();
});
