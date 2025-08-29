// Guest Name Management
function setGuestName(name) {
    document.getElementById('guestName').textContent = name || 'Tamu Undangan';
}

// You can call this function to set specific guest name
// setGuestName('Bapak/Ibu Ahmad');

// Background Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2025-11-10T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Music Control
let isPlaying = true;
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.className = 'fas fa-volume-mute';
        musicControl.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        musicIcon.className = 'fas fa-volume-up';
        musicControl.classList.add('playing');
        isPlaying = true;
    }
}

// Auto-play music when invitation is opened
function startBackgroundMusic() {
    setTimeout(() => {
        backgroundMusic.play().catch(e => {
            console.log('Auto-play failed, user interaction required:', e);
            // If auto-play fails, show a message or wait for user interaction
        });
    }, 1000);
}

// Footer Navigation
let footerVisible = true;
const footerNav = document.getElementById('footerNav');
const toggleFooterBtn = document.getElementById('toggleFooterBtn');
const toggleIcon = document.getElementById('toggleIcon');

function toggleFooter() {
    if (footerVisible) {
        // Hide footer
        footerNav.classList.add('hidden');
        toggleFooterBtn.style.display = 'flex';
        toggleFooterBtn.classList.remove('footer-visible');
        toggleFooterBtn.classList.add('footer-hidden');
        footerVisible = false;
    } else {
        // Show footer
        footerNav.classList.remove('hidden');
        toggleFooterBtn.style.display = 'none';
        footerVisible = true;
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const element = document.querySelector('.' + sectionId) || document.querySelector('#' + sectionId);
    if (element) {
        const offset = 80; // Account for fixed elements
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll behavior to sections
const sections = {
    'hero': document.querySelector('.hero'),
    'event-details': document.querySelector('.event-details'),
    'gallery': document.querySelector('.gallery'),
    'messages': document.querySelector('.messages')
};

// Floating hearts animation
function createFloatingHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
    });
}

// Open invitation
function openInvitation() {
    const landingPage = document.getElementById('landingPage');
    const mainContent = document.getElementById('mainContent');
    
    landingPage.classList.add('hidden');
    setTimeout(() => {
        mainContent.classList.add('visible');
        createFloatingHearts();
        startBackgroundMusic(); // Start music when invitation opens
        updateCountdown(); // Start countdown
    }, 800);
}

// Open video
function openVideo() {
    // Ganti dengan link YouTube video yang sebenarnya
    const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Contoh link
    window.open(videoUrl, '_blank');
}

// Handle message form
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('senderName').value;
    const message = document.getElementById('message').value;
    
    // Animasi submit
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form
            document.getElementById('messageForm').reset();
            
            alert(`Terima kasih ${name}! Pesan Anda telah terkirim.`);
        }, 1500);
    }, 2000);
});

// Scroll animations
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 100);
});

// Gallery click animation
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    });
});

// Copy account number functionality (optional)
function copyAccountNumber(accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        alert('Nomor rekening berhasil disalin!');
    });
}

// Add padding to main content to account for footer
document.querySelector('.main-content').style.paddingBottom = '100px';