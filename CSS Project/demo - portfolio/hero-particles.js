// Particle effect for hero section
const canvas = document.querySelector('.hero-particles');
const heroSection = document.querySelector('.hero');
let particles = [];
let mouse = { x: 0, y: 0, hovering: false };

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
    const colors = ['#FFD700', '#0D6EFD', '#FF007F', '#9B51E0', '#FFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function emitParticles(x, y) {
    for (let i = 0; i < 6; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            size: Math.random() * 6 + 4,
            color: randomColor(),
            life: 60 + Math.random() * 30
        });
    }
}

heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouse.x = x;
    mouse.y = y;
    mouse.hovering = true;
    emitParticles(x, y);
});

heroSection.addEventListener('mouseleave', () => {
    mouse.hovering = false;
});

function drawParticles(ctx) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.globalAlpha = Math.max(p.life / 80, 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.97;
        p.life--;
        if (p.life <= 0 || p.size < 1) {
            particles.splice(i, 1);
        }
    }
    ctx.globalAlpha = 1;
}

function animate() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx);
    requestAnimationFrame(animate);
}

animate(); 