// DOM Elements
const entryScreen = document.getElementById('entryScreen');
const letterScreen = document.getElementById('letterScreen');
const nameInput = document.getElementById('nameInput');
const openLetterBtn = document.getElementById('openLetterBtn');
const replayBtn = document.getElementById('replayBtn');
const shareBtn = document.getElementById('shareBtn');
const typewriterText = document.getElementById('typewriter-text');
const bgMusic = document.getElementById('bgMusic');
const particlesContainer = document.querySelector('.particles-container');
const musicOptions = document.querySelectorAll('.music-option');
const volumeSlider = document.getElementById('volumeSlider');
const roleSelect = document.getElementById('roleSelect');
const snowContainer = document.querySelector('.snow-container');

// Farewell Message Template
const farewellMessage = (name, role) => {
    if (role === 'teacher') {
        return `Dear Respected ${name} Sir/Madam,

With immense respect and heartfelt gratitude,
we, the 3rd year students of the ECE Department,
warmly invite you to grace the occasion of our Farewell Fest 2025,
organized in honor of our beloved final year seniors.

Your presence would mean a great deal to us,
as we bid farewell to a memorable batch whose journey you've guided, nurtured, and inspired.

Let us come together to celebrate their accomplishments,
reflect on shared memories, and wish them the very best for their future endeavors.

🎓 FAREWELL FEST 2025 🎓

📅 Date: Monday, 21st April 2025
🕑 Time: 2:00 PM onwards
📍 Venue: C. V. Raman Indoor Auditorium

We would be honored by your esteemed presence and blessings on this heartfelt occasion.

Warm regards,
3rd Year Students – ECE Department ❤️`;
    } else {
        return `Dear ${name},

With love in our hearts ❤️ and gratitude in every word,
we, your juniors from the ECE Department,
warmly invite you to an evening of celebration 💖 —
a tribute to the memories we've shared and the legacy you leave behind 💞.

Your presence has been a light in our journey ✨,
your guidance a gift we'll always cherish 💝.
As you step into a new chapter 📖,
allow us to honor your remarkable path with joy and admiration 💗.

🎓 HAPPY FAREWELL 2025 🎓

📅 Date: Monday, 21st April 2025
🕑 Time: 2:00 PM onwards
📍 Venue: C. V. Raman Indoor Auditorium

Let's gather to laugh, to remember, and to say —
not goodbye, but thank you 💓

With heartfelt wishes and endless love,
Your Juniors 💘`;
    }
};

// Typewriter Effect
function startTypewriter(name, role) {
    const typewriterText = document.getElementById('typewriter-text');
    typewriterText.innerHTML = '';
    const paragraphs = farewellMessage(name, role).split('\n\n');
    let currentParagraph = 0;
    let currentChar = 0;
    let isTyping = true;

    function type() {
        if (currentParagraph < paragraphs.length) {
            const paragraph = paragraphs[currentParagraph];
            
            if (currentChar === 0) {
                const p = document.createElement('p');
                if (paragraph.includes('🎓')) {
                    p.className = 'farewell-title';
                } else if (paragraph.includes('📍') || paragraph.includes('📅') || paragraph.includes('🕑')) {
                    p.className = 'detail-item';
                } else if (paragraph.includes('Your Juniors')) {
                    p.className = 'signature';
                }
                typewriterText.appendChild(p);
            }

            const currentP = typewriterText.lastElementChild;
            
            if (currentChar < paragraph.length) {
                currentP.textContent = paragraph.substring(0, currentChar + 1);
                currentChar++;
                // Vary the typing speed based on character type
                const delay = paragraph[currentChar - 1] === ' ' ? 20 : 30;
                setTimeout(type, delay);
            } else {
                currentParagraph++;
                currentChar = 0;
                if (currentParagraph < paragraphs.length) {
                    // Shorter pause between paragraphs
                    setTimeout(type, 200);
                } else {
                    isTyping = false;
                }
            }
        }
    }

    // Start with a slight delay to allow the letter animation to complete
    setTimeout(type, 500);
}

// Particle System (Sakura Petals)
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.size = Math.random() * 5 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 1;
        this.rotation = Math.random() * 360;
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.element.style.cssText = `
            position: absolute;
            width: ${this.size}px;
            height: ${this.size}px;
            background: rgba(255, 192, 203, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += 2;

        if (this.y > window.innerHeight) {
            this.reset();
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
}

// Initialize Particles
const particles = [];
const PARTICLE_COUNT = 30;

function initParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = new Particle();
        particles.push(particle);
        particlesContainer.appendChild(particle.element);
    }
}

function animateParticles() {
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animateParticles);
}

// Snow Effect
class SnowElement {
    constructor(type) {
        this.type = type;
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.size = this.type === 'flake' ? Math.random() * 3 + 2 : Math.random() * 15 + 10;
        this.speed = this.type === 'flake' ? Math.random() * 2 + 1 : Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = this.type === 'flake' ? Math.random() * 2 - 1 : Math.random() * 3 - 1.5;
        this.element = document.createElement('div');
        this.element.className = this.type === 'flake' ? 'snowflake' : 'snow-crystal';
        this.element.style.cssText = `
            width: ${this.size}px;
            height: ${this.size}px;
            left: ${this.x}px;
            top: ${this.y}px;
            animation-duration: ${this.type === 'flake' ? 5 + Math.random() * 5 : 8 + Math.random() * 7}s;
            animation-delay: ${Math.random() * 10}s;
        `;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.element.style.transform = `translateY(${this.y}px) rotate(${this.rotation}deg)`;

        if (this.y > window.innerHeight) {
            this.reset();
        }
    }
}

const snowElements = [];
const SNOWFLAKE_COUNT = 25;
const CRYSTAL_COUNT = 15;

function initSnow() {
    // Create snowflakes
    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
        const snowflake = new SnowElement('flake');
        snowElements.push(snowflake);
        snowContainer.appendChild(snowflake.element);
    }
    
    // Create snow crystals
    for (let i = 0; i < CRYSTAL_COUNT; i++) {
        const crystal = new SnowElement('crystal');
        snowElements.push(crystal);
        snowContainer.appendChild(crystal.element);
    }
}

function animateSnow() {
    snowElements.forEach(element => element.update());
    requestAnimationFrame(animateSnow);
}

// Set initial volume
bgMusic.volume = 0.3;
volumeSlider.value = 30;

// Handle music selection
musicOptions.forEach(option => {
    option.addEventListener('click', () => {
        const source = option.dataset.source;
        bgMusic.src = source;
        bgMusic.play();
        
        // Update active state
        musicOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Handle volume control
volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value / 100;
});

// Handle autoplay restrictions
document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    }
}, { once: true });

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
});

// Update openLetterBtn click handler
openLetterBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const role = roleSelect.value;
    
    if (name && role) {
        entryScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
        startTypewriter(name, role);
        bgMusic.play();
    } else {
        alert('Please enter your name and select your role');
    }
});

// Update replayBtn click handler
replayBtn.addEventListener('click', () => {
    const typewriterText = document.getElementById('typewriter-text');
    typewriterText.innerHTML = '';
    startTypewriter(nameInput.value.trim(), roleSelect.value);
    bgMusic.currentTime = 0;
    bgMusic.play();
});

shareBtn.addEventListener('click', async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Farewell Invitation',
                text: 'Join us for a beautiful farewell celebration!',
                url: window.location.href
            });
        } else {
            alert('Sharing is not supported on this device/browser.');
        }
    } catch (error) {
        console.error('Error in shareBtn click handler:', error);
        alert('Failed to share. Please try again.');
    }
});

// Initialize
window.addEventListener('load', () => {
    try {
        initParticles();
        animateParticles();
        initSnow();
        animateSnow();
    } catch (error) {
        console.error('Error in initialization:', error);
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        try {
            particles.forEach(particle => particle.reset());
            snowElements.forEach(element => element.reset());
        } catch (error) {
            console.error('Error in resize handler:', error);
        }
    }, 250);
}); 