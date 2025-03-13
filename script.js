document.addEventListener("DOMContentLoaded", function() {
    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
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
    const giftBoxContainer = document.querySelector(".gift-box-container");
    
    // Center birthday text and card properly
    function centerElements() {
        // Ensure card is centered
        const windowHeight = window.innerHeight;
        const cardHeight = card.offsetHeight;
        
        if (windowHeight > cardHeight + 60) {
            card.style.marginTop = Math.max(0, (windowHeight - cardHeight) / 2 - 30) + "px";
        } else {
            card.style.marginTop = "20px";
        }
        
        // Ensure birthday text is properly centered
        birthdayText.style.textAlign = "center";
        birthdayText.style.width = "100%";
        
        // Adjust card content for better spacing
        document.querySelector(".message").style.maxWidth = "90%";
        document.querySelector(".message").style.margin = "20px auto";
    }
    
    // Music control
    let musicPlaying = false;
    
    // Try to play music with minimal delay
    setTimeout(playMusic, 100);
    
    // Provide manual control
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
        bgMusic.volume = 0.6;
        
        bgMusic.play().then(() => {
            musicToggle.textContent = "🎵";
            musicPlaying = true;
        }).catch(e => {
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
        
        // Simplify and shorten the modal content
        const modalContent = document.querySelector(".modal-content p");
        modalContent.innerHTML = `
            Dear KUSALI,<br><br>
            May your day be filled with joy and wonderful moments! 
            Your kindness lights up everyone's lives.<br><br>
            <span style="font-weight: bold; color: var(--primary);">With love & best wishes!</span>
        `;
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
    
    // GSAP Animations with improved timing and flow
    gsap.from(".card", {duration: 0.6, y: 30, opacity: 0, ease: "back.out(1.7)"});
    gsap.from(".birthday-text", {
        duration: 0.8, 
        scale: 0.5, 
        opacity: 0, 
        ease: "elastic.out(1, 0.5)", 
        onComplete: function() {
            // Add a subtle pulse animation to birthday text
            gsap.to(".birthday-text", {
                scale: 1.05,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
    
    // Simplify the message
    const message = document.querySelector(".message");
    message.innerHTML = 'Dear <span class="highlight">KUSALI</span>, on your special day, I celebrate you and all the joy you bring! Here\'s to your amazing journey ahead!';
    
    gsap.from(".message", {duration: 0.5, delay: 0.3, y: 20, opacity: 0});
    gsap.from(".buttons", {duration: 0.5, delay: 0.5, y: 20, opacity: 0, stagger: 0.1});
    
    // Gift box animation
    gsap.from(".gift-box-container", {
        duration: 1.2, 
        y: -100, 
        opacity: 0, 
        ease: "bounce.out",
        delay: 0.2
    });
    
    // Improved confetti function
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
            confetti.style.opacity = '1';
            confetti.style.position = 'fixed';
            confetti.style.top = '0';
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                y: window.innerHeight + 100,
                x: left + (Math.random() * 200 - 100),
                rotation: Math.random() * 360,
                duration: 3 + Math.random() * 2,
                ease: "power1.out",
                onComplete: function() {
                    document.body.removeChild(confetti);
                }
            });
        }
    }
    
    // Ensure layout is responsive and elements are properly centered
    window.addEventListener('resize', function() {
        centerElements();
    });
    
    // Initialize layout
    centerElements();
    
    // Create a few confetti pieces on load for initial excitement
    setTimeout(function() {
        const startConfetti = 30;
        for (let i = 0; i < startConfetti; i++) {
            setTimeout(function() {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const colors = ['#ff6fb7', '#a864fd', '#ffcc00', '#ffffff', '#64c8ff'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 8 + 4;
                const left = Math.random() * window.innerWidth;
                
                confetti.style.backgroundColor = color;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.left = `${left}px`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.opacity = '1';
                confetti.style.position = 'fixed';
                confetti.style.top = '0';
                
                document.body.appendChild(confetti);
                
                gsap.to(confetti, {
                    y: window.innerHeight + 100,
                    x: left + (Math.random() * 100 - 50),
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 1.5,
                    ease: "power1.out",
                    onComplete: function() {
                        document.body.removeChild(confetti);
                    }
                });
            }, i * 100);
        }
    }, 1000);
});