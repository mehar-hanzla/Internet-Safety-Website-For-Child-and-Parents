// Global state
let currentUser = null;
let currentPage = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkAuthState();
    setupEventListeners();
    setupScrollEffect();
});

function initializeApp() {
    // Set initial page
    showPage('home');
    
    // Initialize navigation
    updateNavigation();
    
    // Load user preferences
    loadUserPreferences();
}

function checkAuthState() {
    const savedUser = localStorage.getItem('netwise_user') || sessionStorage.getItem('netwise_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI(true);
    } else {
        updateAuthUI(false);
    }
}

function updateAuthUI(isLoggedIn) {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    
    if (isLoggedIn && currentUser) {
        navAuth.classList.add('hidden');
        navUser.classList.remove('hidden');
        
        // Update user name
        const userName = document.getElementById('userName');
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        
        if (userName) userName.textContent = currentUser.name;
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
    } else {
        navAuth.classList.remove('hidden');
        navUser.classList.add('hidden');
    }
}

function setupEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function setupScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update navigation
        updateNavigation();
        
        // Initialize page-specific functionality
        initializePage(pageId);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializePage(pageId) {
    switch (pageId) {
        case 'kids-learning':
            if (typeof initializeKidsLearning === 'function') {
                initializeKidsLearning();
            }
            break;
        case 'parent-dashboard':
            if (typeof initializeDashboard === 'function') {
                initializeDashboard();
            }
            break;
        case 'ai-assistant':
            if (typeof initializeAIAssistant === 'function') {
                initializeAIAssistant();
            }
            break;
        case 'profile':
            if (typeof initializeProfile === 'function') {
                initializeProfile();
            }
            break;
        case 'settings':
            if (typeof initializeSettings === 'function') {
                initializeSettings();
            }
            break;
        default:
            break;
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('hidden');
    }
}

function showAuthModal(mode) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (mode === 'login') {
        title.textContent = 'Login';
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        title.textContent = 'Sign Up';
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
    
    modal.classList.add('active');
}

function switchAuthMode(mode) {
    const title = document.getElementById('authTitle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (mode === 'login') {
        title.textContent = 'Login';
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        title.textContent = 'Sign Up';
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
    
    // Reset forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (loginForm) loginForm.reset();
    if (signupForm) signupForm.reset();
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simulate login process
    const loginBtn = e.target.querySelector('button[type="submit"]');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = `
        <div class="spinner" style="margin-right: 0.5rem;"></div>
        Logging in...
    `;
    loginBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful login
        currentUser = {
            id: Date.now(),
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            type: 'parent',
            loginTime: new Date().toISOString()
        };
        
        // Save user data
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('netwise_user', JSON.stringify(currentUser));
        
        // Update UI
        updateAuthUI(true);
        closeAuthModal();
        
        // Show success message
        showNotification('Login successful! Welcome back.', 'success');
        
        // Reset button
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
        
        // Redirect based on user type
        if (currentUser.type === 'parent') {
            showPage('parent-dashboard');
        } else if (currentUser.type === 'student') {
            showPage('kids-learning');
        }
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate signup process
    const signupBtn = e.target.querySelector('button[type="submit"]');
    const originalText = signupBtn.textContent;
    signupBtn.innerHTML = `
        <div class="spinner" style="margin-right: 0.5rem;"></div>
        Creating account...
    `;
    signupBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful signup
        currentUser = {
            id: Date.now(),
            name: name,
            email: email,
            type: userType,
            signupTime: new Date().toISOString()
        };
        
        // Save user data
        localStorage.setItem('netwise_user', JSON.stringify(currentUser));
        
        // Update UI
        updateAuthUI(true);
        closeAuthModal();
        
        // Show success message
        showNotification('Account created successfully! Welcome to NetWise.', 'success');
        
        // Reset button
        signupBtn.textContent = originalText;
        signupBtn.disabled = false;
        
        // Redirect based on user type
        if (currentUser.type === 'parent') {
            showPage('parent-dashboard');
        } else if (currentUser.type === 'student') {
            showPage('kids-learning');
        }
    }, 2000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <div class="spinner" style="margin-right: 0.5rem;"></div>
        Sending...
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function logout() {
    // Clear user data
    localStorage.removeItem('netwise_user');
    sessionStorage.removeItem('netwise_user');
    currentUser = null;
    
    // Update UI
    updateAuthUI(false);
    
    // Hide user menu
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.add('hidden');
    }
    
    // Redirect to home
    showPage('home');
    
    // Show success message
    showNotification('You have been logged out successfully.', 'success');
}

function playIntroVideo() {
    showNotification('Video player would open here in a real implementation.', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 16px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .notification-success {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9));
                color: white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
                color: white;
            }
            
            .notification-warning {
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9));
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
                color: inherit;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .notification-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function loadUserPreferences() {
    const preferences = localStorage.getItem('netwise_preferences');
    if (preferences) {
        const prefs = JSON.parse(preferences);
        // Apply user preferences
        applyTheme(prefs.theme || 'light');
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Lesson modal functions
function closeLessonModal() {
    const modal = document.getElementById('lessonModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function startLesson() {
    showNotification('Lesson started! In a real implementation, this would launch the interactive lesson.', 'success');
    closeLessonModal();
}

// Dashboard tab functions
function showDashboardTab(tabId) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().replace(' ', '-') === tabId) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });

    const activePane = document.getElementById(`${tabId}-tab`);
    if (activePane) {
        activePane.classList.add('active');
    }
}

// Export functions for use in other files
window.NetWise = {
    showPage,
    showAuthModal,
    switchAuthMode,
    closeAuthModal,
    logout,
    showNotification,
    toggleMobileMenu,
    toggleUserMenu,
    currentUser: () => currentUser,
    isLoggedIn: () => !!currentUser
};

// Make functions globally available
window.showPage = showPage;
window.showAuthModal = showAuthModal;
window.switchAuthMode = switchAuthMode;
window.closeAuthModal = closeAuthModal;
window.logout = logout;
window.showNotification = showNotification;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleUserMenu = toggleUserMenu;
window.handleContactSubmit = handleContactSubmit;
window.playIntroVideo = playIntroVideo;
window.closeLessonModal = closeLessonModal;
window.startLesson = startLesson;
window.showDashboardTab = showDashboardTab;