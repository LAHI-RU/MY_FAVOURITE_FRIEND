document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const openBtn = document.getElementById("openBtn");
    const memoryBtn = document.getElementById("memoryBtn");
    const gallery = document.getElementById("gallery");
    const specialModal = document.getElementById("specialModal");
    const closeModal = document.querySelector(".close-modal");

    // Auto-play music (with user interaction handling)
    function initializeAudio() {
        bgMusic.volume = 0.6;
        bgMusic.play().then(() => {
            musicToggle.textContent = "🎵";
        }).catch(e => {
            musicToggle.textContent = "🔇";
            // Add one-time click event listener for music
            document.body.addEventListener('click', function enableAudio() {
                bgMusic.play().then(() => {
                    musicToggle.textContent = "🎵";
                });
                document.body.removeEventListener('click', enableAudio);
            }, { once: true });
        });
    }

    // Initialize audio immediately
    initializeAudio();

    // Music Toggle
    musicToggle.addEventListener("click", function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "🎵";
        } else {
            bgMusic.pause();
            musicToggle.textContent = "🔇";
        }
    });

    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": {
                "value": ["#ff6fb7", "#a864fd", "#ffcc00", "#ffffff"]
            },
            "shape": {
                "type": ["circle", "star"],
                "stroke": { "width": 0 }
            },
            "opacity": {
                "value": 0.7,
                "random": true
            },
            "size": {
                "value": 5,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                }
            },
            "modes": {
                "bubble": {
                    "distance": 100,
                    "size": 8,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Special Surprise Modal
    openBtn.addEventListener("click", function() {
        createConfetti();
        specialModal.classList.add("active");
        gsap.from(".surprise-content", {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: "back.out(1.7)"
        });
    });

    closeModal.addEventListener("click", function() {
        specialModal.classList.remove("active");
    });

    // Close modal when clicking outside
    specialModal.addEventListener("click", function(e) {
        if (e.target === specialModal) {
            specialModal.classList.remove("active");
        }
    });

    // Memory Gallery Toggle
    memoryBtn.addEventListener("click", function() {
        if (gallery.style.display === "grid") {
            gsap.to(gallery, {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    gallery.style.display = "none";
                }
            });
            memoryBtn.innerHTML = '<span class="btn-icon">📸</span><span class="btn-text">Our Memories</span>';
        } else {
            gallery.style.display = "grid";
            gsap.fromTo(gallery,
                { opacity: 0, y: 20 },
                { duration: 0.5, opacity: 1, y: 0 }
            );
            memoryBtn.innerHTML = '<span class="btn-icon">📷</span><span class="btn-text">Hide Memories</span>';
        }
    });

    // Initial Animations
    function initialAnimation() {
        gsap.from(".birthday-text", {
            duration: 1,
            scale: 0.5,
            opacity: 0,
            ease: "elastic.out(1, 0.5)",
            delay: 0.5
        });

        gsap.from(".message", {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 1
        });

        gsap.from(".button-section", {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 1.5
        });

        createConfetti();
    }

    // Confetti Effect
    function createConfetti() {
        const colors = ['#ff6fb7', '#a864fd', '#ffcc00', '#ffffff', '#64c8ff'];
        const totalConfetti = 100;

        for (let i = 0; i < totalConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * window.innerWidth;
            
            confetti.style.cssText = `
                background-color: ${color};
                width: ${size}px;
                height: ${size}px;
                left: ${left}px;
                top: -10px;
                position: fixed;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 999;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                y: window.innerHeight + 100,
                x: left + (Math.random() * 200 - 100),
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                ease: "power1.out",
                onComplete: () => confetti.remove()
            });
        }
    }

    // Start initial animation
    initialAnimation();

    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bgMusic.pause();
        } else {
            if (musicToggle.textContent === "🎵") {
                bgMusic.play();
            }
        }
    });

    // Cleanup function
    function cleanup() {
        document.querySelectorAll('.confetti').forEach(el => el.remove());
        bgMusic.pause();
        gsap.killAll();
    }

    // Cleanup before unload
    window.addEventListener('beforeunload', cleanup);

    // Handle mobile touch events
    if ('ontouchstart' in window) {
        document.body.addEventListener('touchstart', function() {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
            }
        }, { once: true });
    }

    // Optimize performance for mobile
    let resizeTimer;
    window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.confetti').forEach(el => el.remove());
            }
        }, 250);
    });
});