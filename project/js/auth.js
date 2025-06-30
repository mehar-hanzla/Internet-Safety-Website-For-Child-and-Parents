// Authentication functionality
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.initializeAuth();
    }

    initializeAuth() {
        // Check for existing session
        const savedUser = localStorage.getItem('netwise_user') || sessionStorage.getItem('netwise_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI(true);
        }
    }

    loadUsers() {
        const users = localStorage.getItem('netwise_users');
        return users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('netwise_users', JSON.stringify(this.users));
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    getPasswordStrength(password) {
        let strength = 0;
        let feedback = [];

        if (password.length >= 8) strength++;
        else feedback.push('At least 8 characters');

        if (/[a-z]/.test(password)) strength++;
        else feedback.push('One lowercase letter');

        if (/[A-Z]/.test(password)) strength++;
        else feedback.push('One uppercase letter');

        if (/\d/.test(password)) strength++;
        else feedback.push('One number');

        if (/[@$!%*?&]/.test(password)) strength++;
        else feedback.push('One special character');

        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return {
            score: strength,
            level: levels[Math.min(strength, 4)],
            feedback: feedback
        };
    }

    async login(email, password, rememberMe = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Find user
                const user = this.users.find(u => u.email === email);
                
                if (!user) {
                    reject(new Error('User not found'));
                    return;
                }

                if (user.password !== password) {
                    reject(new Error('Invalid password'));
                    return;
                }

                // Create session
                this.currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    loginTime: new Date().toISOString()
                };

                // Save session
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('netwise_user', JSON.stringify(this.currentUser));

                this.updateAuthUI(true);
                resolve(this.currentUser);
            }, 1000);
        });
    }

    async signup(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check if user already exists
                const existingUser = this.users.find(u => u.email === userData.email);
                if (existingUser) {
                    reject(new Error('User already exists'));
                    return;
                }

                // Validate data
                if (!this.validateEmail(userData.email)) {
                    reject(new Error('Invalid email format'));
                    return;
                }

                if (!this.validatePassword(userData.password)) {
                    reject(new Error('Password does not meet requirements'));
                    return;
                }

                // Create new user
                const newUser = {
                    id: generateId(),
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    type: userData.type,
                    signupTime: new Date().toISOString(),
                    verified: false
                };

                this.users.push(newUser);
                this.saveUsers();

                // Create session
                this.currentUser = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    type: newUser.type,
                    signupTime: newUser.signupTime
                };

                localStorage.setItem('netwise_user', JSON.stringify(this.currentUser));
                this.updateAuthUI(true);
                resolve(this.currentUser);
            }, 1500);
        });
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('netwise_user');
        sessionStorage.removeItem('netwise_user');
        this.updateAuthUI(false);
    }

    updateAuthUI(isLoggedIn) {
        const navAuth = document.getElementById('navAuth');
        const navUser = document.getElementById('navUser');
        
        if (isLoggedIn && this.currentUser) {
            navAuth.classList.add('hidden');
            navUser.classList.remove('hidden');
            
            // Update user info
            const userName = document.getElementById('userName');
            const profileName = document.getElementById('profileName');
            const profileEmail = document.getElementById('profileEmail');
            
            if (userName) userName.textContent = this.currentUser.name;
            if (profileName) profileName.textContent = this.currentUser.name;
            if (profileEmail) profileEmail.textContent = this.currentUser.email;
        } else {
            navAuth.classList.remove('hidden');
            navUser.classList.add('hidden');
        }
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            showAuthModal('login');
            return false;
        }
        return true;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Enhanced form handlers
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate inputs
    if (!email || !password) {
        showFormError(form, 'Please fill in all fields');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        const user = await authManager.login(email, password, rememberMe);
        closeAuthModal();
        showNotification(`Welcome back, ${user.name}!`, 'success');
        
        // Redirect based on user type
        if (user.type === 'parent') {
            showPage('parent-dashboard');
        } else if (user.type === 'student') {
            showPage('kids-learning');
        } else {
            showPage('home');
        }
    } catch (error) {
        showFormError(form, error.message);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword || !userType) {
        showFormError(form, 'Please fill in all fields');
        return;
    }
    
    if (!agreeTerms) {
        showFormError(form, 'Please agree to the Terms of Service');
        return;
    }
    
    if (password !== confirmPassword) {
        showFormError(form, 'Passwords do not match');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        const user = await authManager.signup({
            name,
            email,
            password,
            type: userType
        });
        
        closeAuthModal();
        showNotification(`Welcome to NetWise, ${user.name}!`, 'success');
        
        // Redirect based on user type
        if (user.type === 'parent') {
            showPage('parent-dashboard');
        } else if (user.type === 'student') {
            showPage('kids-learning');
        } else {
            showPage('home');
        }
    } catch (error) {
        showFormError(form, error.message);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function showFormError(form, message) {
    // Remove existing error
    const existingError = form.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #FEE2E2;
        color: #DC2626;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
        border: 1px solid #FECACA;
    `;
    errorDiv.textContent = message;
    
    // Insert at top of form
    form.insertBefore(errorDiv, form.firstChild);
}

function clearFormErrors(form) {
    const errors = form.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());
}

// Password strength indicator
function setupPasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    if (!passwordInput) return;
    
    // Create strength indicator
    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'password-strength';
    strengthDiv.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text"></div>
    `;
    
    passwordInput.parentNode.appendChild(strengthDiv);
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = authManager.getPasswordStrength(password);
        const fill = strengthDiv.querySelector('.strength-fill');
        const text = strengthDiv.querySelector('.strength-text');
        
        // Update visual indicator
        fill.className = `strength-fill ${strength.level.toLowerCase().replace(' ', '')}`;
        text.textContent = password ? `Strength: ${strength.level}` : '';
        
        // Show feedback
        if (password && strength.feedback.length > 0) {
            text.textContent += ` (Missing: ${strength.feedback.join(', ')})`;
        }
    });
}

// Initialize password strength on modal open
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (authModal.classList.contains('active')) {
                    setTimeout(setupPasswordStrength, 100);
                }
            }
        });
    });
    
    observer.observe(authModal, { attributes: true });
});

// Logout function
function logout() {
    authManager.logout();
    
    // Hide user menu
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.add('hidden');
    
    // Redirect to home
    showPage('home');
    
    showNotification('You have been logged out successfully.', 'success');
}

// Export auth manager for global access
window.authManager = authManager;