// Countdown Timer for Product Launch
function startCountdown() {
    // Set the launch date (30 days from now for demo purposes)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    launchDate.setHours(12, 0, 0, 0); // Set to noon
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse animation to seconds
        const secondsElement = document.getElementById('seconds');
        secondsElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            secondsElement.style.transform = 'scale(1)';
        }, 200);
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-section h2').textContent = 'Launch Day is Here!';
            document.querySelector('.countdown').innerHTML = '<div class="launch-message">🎉 Our products are now available! 🎉</div>';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Smooth scrolling for better UX
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation
function addLoadingAnimation() {
    const cards = document.querySelectorAll('.card');
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    // Stagger animation for cards
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Stagger animation for countdown items
    countdownItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Add hover effects for better interactivity
function addInteractiveEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            }, 150);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    smoothScroll();
    addLoadingAnimation();
    addInteractiveEffects();
    
    // Add a subtle parallax effect to the header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header.intro');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add CSS for launch message
const style = document.createElement('style');
style.textContent = `
    .launch-message {
        font-size: 2em;
        color: #b86b77;
        font-weight: bold;
        padding: 40px;
        background: linear-gradient(135deg, #f6d6db 0%, #fceef1 100%);
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(184, 107, 119, 0.3);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

