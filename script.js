document.addEventListener("DOMContentLoaded", function() {
    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ff6fb7", "#a864fd", "#ffcc00", "#ffffff"]
            },
            "shape": {
                "type": ["circle", "star"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.7,
                "random": true
            },
            "size": {
                "value": 5,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
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
    
    // Elements
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    const openBtn = document.getElementById("openBtn");
    const memoryBtn = document.getElementById("memoryBtn");
    const gallery = document.getElementById("gallery");
    const specialModal = document.getElementById("specialModal");
    const closeModal = document.querySelector(".close-modal");
    
    // Music control
    let musicPlaying = false;
    
    musicToggle.addEventListener("click", function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = "🔇";
            musicPlaying = false;
        } else {
            bgMusic.play().catch(e => {
                console.log("Audio play failed:", e);
                alert("Please click again to play music. Browser may require user interaction first.");
            });
            musicToggle.textContent = "🎵";
            musicPlaying = true;
        }
    });
    
    // Surprise button
    openBtn.addEventListener("click", function() {
        createConfetti();
        specialModal.classList.add("active");
        
        if (!musicPlaying) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicToggle.textContent = "🎵";
            musicPlaying = true;
        }
    });
    
    // Close modal
    closeModal.addEventListener("click", function() {
        specialModal.classList.remove("active");
    });
    
    // Memory button
    memoryBtn.addEventListener("click", function() {
        if (gallery.style.display === "grid") {
            gsap.to(gallery, {duration: 0.5, opacity: 0, onComplete: function() {
                gallery.style.display = "none";
            }});
            memoryBtn.textContent = "Our Memories";
        } else {
            gallery.style.display = "grid";
            gsap.fromTo(gallery, 
                {opacity: 0, y: 20}, 
                {duration: 0.5, opacity: 1, y: 0}
            );
            memoryBtn.textContent = "Hide Memories";
        }
    });
    
    // GSAP Animations
    gsap.from(".card", {duration: 1, y: 50, opacity: 0, ease: "back.out(1.7)"});
    gsap.from(".birthday-text", {duration: 1, delay: 0.5, scale: 0.5, opacity: 0, ease: "elastic.out(1, 0.5)"});
    gsap.from(".message", {duration: 0.8, delay: 0.8, y: 20, opacity: 0});
    gsap.from(".buttons", {duration: 0.8, delay: 1, y: 20, opacity: 0, stagger: 0.2});
    
    // Animated cake elements
    gsap.from(".cake", {duration: 1.5, delay: 0.3, y: 50, opacity: 0, ease: "elastic.out(1, 0.5)"});
    gsap.from(".cake-bottom", {duration: 0.8, delay: 0.5, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".cake-middle", {duration: 0.8, delay: 0.7, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".cake-top", {duration: 0.8, delay: 0.9, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".candle", {duration: 0.5, delay: 1.1, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".flame", {duration: 0.5, delay: 1.3, scale: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    
    // Confetti function
    function createConfetti() {
        const colors = ['#ff6fb7', '#a864fd', '#ffcc00', '#ffffff', '#64c8ff'];
        const totalConfetti = 150;
        
        for (let i = 0; i < totalConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * window.innerWidth;
            
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${left}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            gsap.fromTo(confetti, 
                {y: -20, x: 0, rotation: 0, opacity: 1},
                {
                    duration: Math.random() * 3 + 2,
                    y: window.innerHeight + 100,
                    x: left + (Math.random() * 200 - 100),
                    rotation: Math.random() * 360,
                    opacity: 0,
                    ease: "power1.out",
                    onComplete: function() {
                        confetti.remove();
                    }
                }
            );
        }
    }
    
    // Create initial animated balloons
    function animateBalloons() {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach((balloon, index) => {
            const delay = index * 2; // Staggered start
            
            gsap.fromTo(balloon,
                { y: '100vh', opacity: 0 },
                { 
                    y: '-100vh', 
                    opacity: 0.8,
                    duration: 15 + Math.random() * 5,
                    delay: delay,
                    ease: "power1.inOut",
                    repeat: -1,
                    onRepeat: function() {
                        // Randomize horizontal position slightly on each repeat
                        const newLeft = parseFloat(balloon.style.left) + (Math.random() * 10 - 5) + '%';
                        balloon.style.left = newLeft;
                    }
                }
            );
        });
    }
    
    // Initialize balloon animations
    animateBalloons();
    
    // Create initial animation on load
    setTimeout(function() {
        createConfetti();
    }, 1500);
    
    // Add window resize handler
    window.addEventListener('resize', function() {
        const canvas = document.getElementById("particles-js");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});