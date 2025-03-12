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
    const card = document.querySelector(".card");
    const birthdayText = document.querySelector(".birthday-text");
    
    // Center birthday text and card properly
    function centerElements() {
        // Ensure card is centered
        const windowHeight = window.innerHeight;
        const cardHeight = card.offsetHeight;
        
        if (windowHeight > cardHeight + 80) {
            card.style.marginTop = Math.max(0, (windowHeight - cardHeight) / 2 - 40) + "px";
        } else {
            card.style.marginTop = "20px";
        }
        
        // Center birthday text
        birthdayText.style.textAlign = "center";
    }
    
    // Run centering on load and resize
    centerElements();
    window.addEventListener('resize', centerElements);
    
    // Music control - Attempt to play immediately with reduced delay
    let musicPlaying = false;
    
    // Try to play music with minimal delay
    setTimeout(playMusic, 100);
    
    // But also provide manual control
    musicToggle.addEventListener("click", function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = "🔇";
            musicPlaying = false;
        } else {
            playMusic();
        }
    });
    
    // Function to play music with user interaction handling
    function playMusic() {
        // Set volume to slightly lower level for better experience
        bgMusic.volume = 0.7;
        
        bgMusic.play().then(() => {
            musicToggle.textContent = "🎵";
            musicPlaying = true;
        }).catch(e => {
            console.log("Audio autoplay failed, waiting for user interaction:", e);
            musicToggle.textContent = "🔇";
            
            // Add one-time event listener for first user interaction to enable audio
            document.body.addEventListener('click', function enableAudioOnFirstClick() {
                if (!musicPlaying) {
                    bgMusic.play().then(() => {
                        musicToggle.textContent = "🎵";
                        musicPlaying = true;
                    });
                }
                document.body.removeEventListener('click', enableAudioOnFirstClick);
            });
        });
    }
    
    // Surprise button
    openBtn.addEventListener("click", function() {
        createConfetti();
        specialModal.classList.add("active");
        
        if (!musicPlaying) {
            playMusic();
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
    
    // Adjust candle positioning for better appearance
    function repositionCandles() {
        const candles = document.querySelectorAll('.candle');
        const cakeTop = document.querySelector('.cake-top');
        
        if (cakeTop && candles.length) {
            const cakeTopWidth = cakeTop.offsetWidth;
            const spacing = cakeTopWidth / 6;
            
            candles[0].style.left = `${spacing}px`;
            candles[1].style.left = `${spacing * 3}px`;
            candles[2].style.left = `${spacing * 5}px`;
        }
    }
    
    // GSAP Animations - Faster and with improved timing
    gsap.from(".card", {duration: 0.6, y: 30, opacity: 0, ease: "back.out(1.7)"});
    gsap.from(".birthday-text", {duration: 0.7, delay: 0.2, scale: 0.5, opacity: 0, ease: "elastic.out(1, 0.5)"});
    gsap.from(".message", {duration: 0.5, delay: 0.4, y: 20, opacity: 0});
    gsap.from(".buttons", {duration: 0.5, delay: 0.6, y: 20, opacity: 0, stagger: 0.1});
    
    // Animated cake elements - faster animations
    gsap.from(".cake", {duration: 0.8, delay: 0.2, y: 30, opacity: 0, ease: "elastic.out(1, 0.5)"});
    gsap.from(".cake-bottom", {duration: 0.5, delay: 0.3, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".cake-middle", {duration: 0.5, delay: 0.4, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)"});
    gsap.from(".cake-top", {duration: 0.5, delay: 0.5, scaleY: 0, transformOrigin: "bottom", ease: "back.out(1.7)", onComplete: repositionCandles});
    
    // Animation for multiple candles
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        gsap.from(candle, {
            duration: 0.4, 
            delay: 0.6 + (index * 0.1),
            scaleY: 0, 
            transformOrigin: "bottom", 
            ease: "back.out(1.7)"
        });
    });
    
    // Animation for flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        gsap.from(flame, {
            duration: 0.4, 
            delay: 0.8 + (index * 0.1),
            scale: 0, 
            transformOrigin: "bottom", 
            ease: "back.out(1.7)"
        });
        
        // Add perpetual random flicker to flames for more realism
        gsap.to(flame, {
            duration: 0.3 + Math.random() * 0.5,
            scaleX: 0.8 + Math.random() * 0.4,
            scaleY: 0.8 + Math.random() * 0.4,
            rotation: -5 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    
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
            const delay = index * 0.5; // Reduced staggered delay
            const randomLeft = 10 + (index * 20) + (Math.random() * 5);
            
            balloon.style.left = `${randomLeft}%`;
            
            gsap.fromTo(balloon,
                { y: '100vh', opacity: 0 },
                { 
                    y: '-100vh', 
                    opacity: 0.8,
                    duration: 10 + Math.random() * 5, // Faster animation
                    delay: delay,
                    ease: "power1.inOut",
                    repeat: -1,
                    onRepeat: function() {
                        // Randomize horizontal position slightly on each repeat
                        const newLeft = parseFloat(balloon.style.left) + (Math.random() * 6 - 3) + '%';
                        balloon.style.left = newLeft;
                    }
                }
            );
        });
    }
    
    // Initialize balloon animations
    animateBalloons();
    
    // Create initial confetti animation with reduced delay
    setTimeout(function() {
        createConfetti();
    }, 800);
    
    // Add window resize handler
    window.addEventListener('resize', function() {
        const canvas = document.getElementById("particles-js");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reposition candles on resize
        repositionCandles();
        
        // Recenter elements
        centerElements();
    });
    
    // Handle mobile responsiveness adjustments
    function handleMobileResponsiveness() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust cake size for mobile
        const cake = document.querySelector('.cake');
        if (cake) {
            if (isMobile) {
                cake.style.transform = 'scale(0.8)';
            } else {
                cake.style.transform = 'scale(1)';
            }
        }
        
        // Adjust balloon sizes for mobile
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            if (isMobile) {
                balloon.style.width = '40px';
                balloon.style.height = '50px';
            } else {
                balloon.style.width = '60px';
                balloon.style.height = '70px';
            }
        });
        
        // Adjust button layout for mobile
        const buttons = document.querySelector('.buttons');
        if (buttons) {
            if (isMobile) {
                buttons.style.flexDirection = 'column';
                buttons.style.alignItems = 'center';
            } else {
                buttons.style.flexDirection = 'row';
                buttons.style.alignItems = 'unset';
            }
        }
    }
    
    // Run mobile responsiveness handler on load and resize
    handleMobileResponsiveness();
    window.addEventListener('resize', handleMobileResponsiveness);
    
    // Handle gift box animation in modal
    function initGiftBoxAnimation() {
        const giftLid = document.querySelector('.gift-lid');
        
        if (giftLid) {
            giftLid.style.animation = 'none';
            
            // Reset and trigger animation when modal becomes visible
            specialModal.addEventListener('transitionend', function() {
                if (specialModal.classList.contains('active')) {
                    giftLid.style.animation = 'openLid 4s forwards ease-in-out';
                }
            });
        }
    }
    
    // Initialize gift box animation
    initGiftBoxAnimation();
    
    // Preload any images for smoother animations
    function preloadImages() {
        // No external images to preload in this implementation
        // This function can be expanded if image assets are added later
    }
    
    // Call preload function
    preloadImages();
    
    // Handle closing modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && specialModal.classList.contains('active')) {
            specialModal.classList.remove('active');
        }
    });
    
    // Click outside modal to close
    specialModal.addEventListener('click', function(e) {
        if (e.target === specialModal) {
            specialModal.classList.remove('active');
        }
    });
});