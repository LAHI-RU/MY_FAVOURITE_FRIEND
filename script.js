document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const openBtn = document.getElementById("openBtn");
    const giftBtn = document.getElementById("giftBtn");
    const specialModal = document.getElementById("specialModal");
    const closeModal = document.querySelector(".close-modal");

    // Set dark theme as default
    document.body.setAttribute('data-theme', 'dark');

    // Initialize audio
    function initializeAudio() {
        const bgMusicTime = localStorage.getItem('bgMusicTime');
        if (bgMusicTime) {
            bgMusic.currentTime = bgMusicTime;
        }
        bgMusic.volume = 0.6;
        bgMusic.play().then(() => {
            musicToggle.textContent = "🎵";
        }).catch(e => {
            musicToggle.textContent = "🔇";
            // Add click event listener for music
            document.body.addEventListener('click', function enableAudio() {
                bgMusic.play().then(() => {
                    musicToggle.textContent = "🎵";
                });
                document.body.removeEventListener('click', enableAudio);
            }, { once: true });
        });

        // Store the background music in localStorage
        localStorage.setItem('bgMusic', bgMusic.src);
    }

    // Initialize audio immediately
    initializeAudio();

    // Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.body.setAttribute('data-theme', button.dataset.theme);
        });
    });

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

    // Gift Button
    giftBtn.addEventListener("click", function() {
        // Store the current time of the music before navigating
        localStorage.setItem('bgMusicTime', bgMusic.currentTime);
        window.location.href = 'select_gift.html';
    });

    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ff71d4", "#9d4edd", "#ffd700"]
            },
            "shape": {
                "type": ["circle", "star"],
                "stroke": {
                    "width": 0
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#9d4edd",
                "opacity": 0.2,
                "width": 1
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
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 150,
                    "size": 8,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });

    // Confetti Effect
    function createConfetti() {
        const colors = ['#ff71d4', '#9d4edd', '#ffd700', '#ffffff'];
        const totalConfetti = window.innerWidth < 768 ? 50 : 100; // Reduce on mobile

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
                opacity: 0.8;
            `;
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                y: window.innerHeight + 100,
                x: left + (Math.random() * 200 - 100),
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                ease: "power1.out",
                opacity: 0,
                onComplete: () => confetti.remove()
            });
        }
    }

    // Initial animations
    gsap.from(".birthday-text", {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        onComplete: createConfetti
    });

    gsap.from(".message", {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
    });

    gsap.from(".button-section", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        delay: 1,
        ease: "power2.out"
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            bgMusic.pause();
        } else {
            if (musicToggle.textContent === "🎵") {
                bgMusic.play().catch(() => {});
            }
        }
    });

    // Mobile optimizations
    if ('ontouchstart' in window) {
        document.body.addEventListener('touchstart', function() {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
            }
        }, { once: true });
    }

    // Performance optimization for mobile
    let resizeTimer;
    window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.confetti').forEach(el => el.remove());
            }
        }, 250);
    });

    // Cleanup function
    function cleanup() {
        document.querySelectorAll('.confetti').forEach(el => el.remove());
        localStorage.setItem('bgMusicTime', bgMusic.currentTime);
        bgMusic.pause();
        gsap.killAll();
    }

    // Cleanup before unload
    window.addEventListener('beforeunload', cleanup);
});