document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // 1. Button Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "Button clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
        clickBtn.classList.add('celebrate');
        
        setTimeout(() => {
            clickBtn.classList.remove('celebrate');
        }, 500);
    });
    
    // 2. Hover Effect
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseenter', function() {
        // Effect handled by CSS
    });
    
    // 3. Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `Last key pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // 4. Secret Double Click
    const secretBox = document.getElementById('secret-box');
    secretBox.addEventListener('dblclick', function() {
        secretBox.classList.add('secret-revealed');
        secretBox.innerHTML = '<p>🎉 You found the secret! 🎉</p>';
        
        // Add confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Create CSS for animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, 3000);
        }
    });
    
    // ========== Interactive Elements ========== //
    
    // 1. Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorDisplay = document.getElementById('color-display');
    
    colorBtn.addEventListener('click', function() {
        const randomColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
        colorDisplay.style.backgroundColor = randomColor;
    });
    
    // 2. Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 5000);
    
    // 3. Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });
    
    // ========== Form Validation ========== //
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formSuccess = document.getElementById('form-success');
    const strengthMeters = document.querySelectorAll('.strength-meter');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        // Reset strength meters
        strengthMeters.forEach(meter => {
            meter.style.backgroundColor = '#ddd';
        });
        
        if (passwordInput.value.length === 0) {
            passwordError.textContent = '';
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            
            // Calculate password strength
            let strength = 0;
            if (passwordInput.value.length >= 8) strength++;
            if (/[A-Z]/.test(passwordInput.value)) strength++;
            if (/[0-9]/.test(passwordInput.value)) strength++;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength++;
            
            // Update strength meters
            for (let i = 0; i < strength; i++) {
                let color;
                if (strength === 1) color = '#e74c3c';
                else if (strength === 2) color = '#f39c12';
                else color = '#2ecc71';
                
                strengthMeters[i].style.backgroundColor = color;
            }
            
            return true;
        }
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formSuccess.textContent = 'Form submitted successfully! 🎉';
            userForm.reset();
            
            // Reset strength meters
            strengthMeters.forEach(meter => {
                meter.style.backgroundColor = '#ddd';
            });
            
            setTimeout(() => {
                formSuccess.textContent = '';
            }, 3000);
        }
    });
});