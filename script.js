document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");
    const openBtn = document.getElementById("openBtn");

    openBtn.addEventListener("click", function () {
        alert("🎊 Surprise Message! 🎊\nHappy Birthday KUSALI! 🎂🎁");
    });

    // Fireworks Effect
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    function createFirework() {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height / 2;
        let color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        fireworks.push({ x, y, color, size: Math.random() * 3 + 1 });
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            ctx.fillStyle = firework.color;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.fill();
            firework.y -= 2;
            firework.size -= 0.05;

            if (firework.size <= 0) {
                fireworks.splice(index, 1);
                createFirework();
            }
        });
        requestAnimationFrame(drawFireworks);
    }

    for (let i = 0; i < 20; i++) {
        createFirework();
    }

    drawFireworks();
});
