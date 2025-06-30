// Profile and Settings functionality
class ProfileManager {
    constructor() {
        this.currentUser = null;
        this.settings = this.loadSettings();
        this.initializeProfile();
    }

    initializeProfile() {
        // Load current user data
        this.currentUser = window.authManager?.getCurrentUser();
        if (this.currentUser) {
            this.populateProfileForm();
        }
    }

    loadSettings() {
        const userId = window.authManager?.getCurrentUser()?.id;
        if (userId) {
            const saved = localStorage.getItem(`netwise_settings_${userId}`);
            return saved ? JSON.parse(saved) : this.getDefaultSettings();
        }
        return this.getDefaultSettings();
    }

    getDefaultSettings() {
        return {
            notifications: {
                email: true,
                safetyAlerts: true,
                weeklyReports: false,
                productUpdates: true
            },
            privacy: {
                shareAnalytics: false,
                twoFactorEnabled: false
            },
            app: {
                theme: 'light',
                language: 'en',
                autoSave: true
            },
            ai: {
                responseSpeed: 'balanced',
                saveChatHistory: true
            }
        };
    }

    saveSettings() {
        const userId = window.authManager?.getCurrentUser()?.id;
        if (userId) {
            localStorage.setItem(`netwise_settings_${userId}`, JSON.stringify(this.settings));
        }
    }

    populateProfileForm() {
        if (!this.currentUser) return;

        const nameField = document.getElementById('profileFullName');
        const emailField = document.getElementById('profileEmailField');
        const userTypeField = document.getElementById('profileUserType');
        const bioField = document.getElementById('profileBio');

        if (nameField) nameField.value = this.currentUser.name || '';
        if (emailField) emailField.value = this.currentUser.email || '';
        if (userTypeField) userTypeField.value = this.currentUser.type || 'parent';
        if (bioField) bioField.value = this.currentUser.bio || '';

        // Update profile display
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        if (profileName) profileName.textContent = this.currentUser.name;
        if (profileEmail) profileEmail.textContent = this.currentUser.email;
    }

    async updateProfile(formData) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update current user data
            if (this.currentUser) {
                this.currentUser.name = formData.fullName;
                this.currentUser.email = formData.email;
                this.currentUser.type = formData.userType;
                this.currentUser.bio = formData.bio;

                // Save to localStorage
                const storage = localStorage.getItem('netwise_user') ? localStorage : sessionStorage;
                storage.setItem('netwise_user', JSON.stringify(this.currentUser));

                // Update UI
                window.authManager.updateAuthUI(true);
                this.populateProfileForm();
            }

            return { success: true };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, error: error.message };
        }
    }

    toggleSetting(category, setting) {
        if (this.settings[category] && this.settings[category].hasOwnProperty(setting)) {
            this.settings[category][setting] = !this.settings[category][setting];
            this.saveSettings();
            return this.settings[category][setting];
        }
        return false;
    }

    updateSetting(category, setting, value) {
        if (this.settings[category]) {
            this.settings[category][setting] = value;
            this.saveSettings();
        }
    }

    exportUserData() {
        const userData = {
            profile: this.currentUser,
            settings: this.settings,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        // Add additional data if available
        const userId = this.currentUser?.id;
        if (userId) {
            // Add progress data
            const progressData = localStorage.getItem(`netwise_progress_${userId}`);
            if (progressData) {
                userData.progress = JSON.parse(progressData);
            }

            // Add dashboard data
            const dashboardData = localStorage.getItem(`netwise_dashboard_${userId}`);
            if (dashboardData) {
                userData.dashboard = JSON.parse(dashboardData);
            }

            // Add chat history
            const chatHistory = localStorage.getItem(`netwise_chat_${userId}`);
            if (chatHistory) {
                userData.chatHistory = JSON.parse(chatHistory);
            }
        }

        // Create and download file
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `netwise-data-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        window.showNotification('Your data has been exported successfully!', 'success');
    }

    async deleteAccount() {
        if (!confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        if (!confirm('This will permanently delete all your data, progress, and settings. Type "DELETE" to confirm.')) {
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear all user data
            const userId = this.currentUser?.id;
            if (userId) {
                localStorage.removeItem(`netwise_settings_${userId}`);
                localStorage.removeItem(`netwise_progress_${userId}`);
                localStorage.removeItem(`netwise_dashboard_${userId}`);
                localStorage.removeItem(`netwise_chat_${userId}`);
                localStorage.removeItem(`netwise_downloads_${userId}`);
                localStorage.removeItem(`netwise_filters_${userId}`);
            }

            // Clear session
            localStorage.removeItem('netwise_user');
            sessionStorage.removeItem('netwise_user');
            localStorage.removeItem('netwise_hf_key');

            // Logout and redirect
            window.authManager.logout();
            window.showPage('home');
            window.showNotification('Your account has been deleted successfully.', 'success');

        } catch (error) {
            console.error('Account deletion error:', error);
            window.showNotification('Failed to delete account. Please try again.', 'error');
        }
    }

    changeTheme(theme) {
        this.updateSetting('app', 'theme', theme);
        this.applyTheme(theme);
        window.showNotification(`Theme changed to ${theme}`, 'success');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }

    setupTwoFactor() {
        // Simulate 2FA setup
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        if (confirm(`Two-Factor Authentication Setup\n\nYour verification code is: ${code}\n\nIn a real implementation, this would be sent to your phone or authenticator app.\n\nClick OK to enable 2FA.`)) {
            this.updateSetting('privacy', 'twoFactorEnabled', true);
            
            // Update UI
            const button = document.querySelector('[onclick="setupTwoFactor()"]');
            if (button) {
                button.textContent = 'Disable';
                button.setAttribute('onclick', 'disableTwoFactor()');
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');
            }
            
            window.showNotification('Two-Factor Authentication enabled successfully!', 'success');
        }
    }

    disableTwoFactor() {
        if (confirm('Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.')) {
            this.updateSetting('privacy', 'twoFactorEnabled', false);
            
            // Update UI
            const button = document.querySelector('[onclick="disableTwoFactor()"]');
            if (button) {
                button.textContent = 'Setup';
                button.setAttribute('onclick', 'setupTwoFactor()');
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline');
            }
            
            window.showNotification('Two-Factor Authentication disabled.', 'info');
        }
    }

    manageApiKey() {
        const currentKey = localStorage.getItem('netwise_hf_key') || '';
        const action = currentKey ? 'update' : 'add';
        
        const newKey = prompt(`${action === 'add' ? 'Add' : 'Update'} your Hugging Face API key:\n\n${currentKey ? 'Current key: ' + currentKey.substring(0, 8) + '...' : 'No key set'}`, '');
        
        if (newKey !== null) {
            if (newKey.trim()) {
                localStorage.setItem('netwise_hf_key', newKey.trim());
                window.showNotification('API key saved successfully!', 'success');
                
                // Update AI assistant if available
                if (window.aiAssistant) {
                    window.aiAssistant.apiKey = newKey.trim();
                }
            } else if (currentKey) {
                if (confirm('Remove the current API key?')) {
                    localStorage.removeItem('netwise_hf_key');
                    window.showNotification('API key removed.', 'info');
                    
                    if (window.aiAssistant) {
                        window.aiAssistant.apiKey = '';
                    }
                }
            }
        }
    }
}

// Initialize profile manager
const profileManager = new ProfileManager();

// Global functions for HTML handlers
function handleProfileUpdate(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `
        <div class="spinner" style="margin-right: 0.5rem;"></div>
        Updating...
    `;
    submitBtn.disabled = true;
    
    // Convert FormData to object
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    profileManager.updateProfile(data).then(result => {
        if (result.success) {
            window.showNotification('Profile updated successfully!', 'success');
        } else {
            window.showNotification('Failed to update profile: ' + result.error, 'error');
        }
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showChangePasswordModal() {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
        const confirmPassword = prompt('Confirm your new password:');
        if (newPassword === confirmPassword) {
            // Simulate password change
            setTimeout(() => {
                window.showNotification('Password changed successfully!', 'success');
            }, 1000);
        } else {
            window.showNotification('Passwords do not match!', 'error');
        }
    }
}

function confirmDeleteAccount() {
    profileManager.deleteAccount();
}

function toggleSetting(toggleElement) {
    toggleElement.classList.toggle('active');
    
    // Find the setting name from the label
    const settingItem = toggleElement.closest('.setting-item');
    const label = settingItem.querySelector('label').textContent.trim();
    
    // Map label to setting
    const settingMap = {
        'Email Notifications': ['notifications', 'email'],
        'Safety Alerts': ['notifications', 'safetyAlerts'],
        'Weekly Reports': ['notifications', 'weeklyReports'],
        'Product Updates': ['notifications', 'productUpdates'],
        'Share Usage Analytics': ['privacy', 'shareAnalytics'],
        'Auto-save Progress': ['app', 'autoSave'],
        'Save Chat History': ['ai', 'saveChatHistory']
    };
    
    const mapping = settingMap[label];
    if (mapping) {
        const [category, setting] = mapping;
        const newValue = profileManager.toggleSetting(category, setting);
        window.showNotification(`${label} ${newValue ? 'enabled' : 'disabled'}`, 'info');
    }
}

function changeTheme(theme) {
    profileManager.changeTheme(theme);
}

function setupTwoFactor() {
    profileManager.setupTwoFactor();
}

function disableTwoFactor() {
    profileManager.disableTwoFactor();
}

function exportUserData() {
    profileManager.exportUserData();
}

function manageApiKey() {
    profileManager.manageApiKey();
}

// Initialize settings page
function initializeSettings() {
    // Apply current theme
    const theme = profileManager.settings.app.theme;
    profileManager.applyTheme(theme);
    
    // Set theme selector
    const themeSelect = document.querySelector('select[onchange="changeTheme(this.value)"]');
    if (themeSelect) {
        themeSelect.value = theme;
    }
    
    // Update 2FA button based on current state
    const twoFactorButton = document.querySelector('[onclick="setupTwoFactor()"]');
    if (twoFactorButton && profileManager.settings.privacy.twoFactorEnabled) {
        twoFactorButton.textContent = 'Disable';
        twoFactorButton.setAttribute('onclick', 'disableTwoFactor()');
        twoFactorButton.classList.remove('btn-outline');
        twoFactorButton.classList.add('btn-primary');
    }
}

// Initialize profile page
function initializeProfile() {
    profileManager.populateProfileForm();
}

// Export for global access
window.profileManager = profileManager;
window.handleProfileUpdate = handleProfileUpdate;
window.showChangePasswordModal = showChangePasswordModal;
window.confirmDeleteAccount = confirmDeleteAccount;
window.toggleSetting = toggleSetting;
window.changeTheme = changeTheme;
window.setupTwoFactor = setupTwoFactor;
window.disableTwoFactor = disableTwoFactor;
window.exportUserData = exportUserData;
window.manageApiKey = manageApiKey;
window.initializeSettings = initializeSettings;
window.initializeProfile = initializeProfile;