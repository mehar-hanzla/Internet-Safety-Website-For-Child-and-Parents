// Parent Dashboard functionality
class DashboardManager {
    constructor() {
        this.activeTab = 'overview';
        this.children = [
            { 
                name: 'Emma', 
                age: 12, 
                avatar: '👧', 
                status: 'safe', 
                lastActivity: '2 min ago',
                screenTime: { today: 3.2, average: 2.8, limit: 4.0 }
            },
            { 
                name: 'Jack', 
                age: 8, 
                avatar: '👦', 
                status: 'warning', 
                lastActivity: '15 min ago',
                screenTime: { today: 1.8, average: 2.1, limit: 2.5 }
            }
        ];
        this.alerts = [
            {
                type: 'warning',
                child: 'Emma',
                message: 'Attempted to visit a blocked website',
                time: '10 minutes ago',
                severity: 'medium'
            },
            {
                type: 'info',
                child: 'Jack',
                message: 'Completed internet safety lesson',
                time: '1 hour ago',
                severity: 'low'
            },
            {
                type: 'alert',
                child: 'Emma',
                message: 'New friend request on social media',
                time: '2 hours ago',
                severity: 'high'
            }
        ];
        this.initializeDashboard();
    }

    initializeDashboard() {
        this.loadDashboardData();
        this.setupEventListeners();
    }

    loadDashboardData() {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const savedData = localStorage.getItem(`netwise_dashboard_${userId}`);
            if (savedData) {
                const data = JSON.parse(savedData);
                this.children = data.children || this.children;
                this.alerts = data.alerts || this.alerts;
            }
        }
    }

    saveDashboardData() {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const data = {
                children: this.children,
                alerts: this.alerts,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(`netwise_dashboard_${userId}`, JSON.stringify(data));
        }
    }

    setupEventListeners() {
        // Tab navigation
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.textContent.toLowerCase().replace(' ', '-');
                this.showDashboardTab(tabId);
            });
        });

        // Toggle switches
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle')) {
                e.target.classList.toggle('active');
                this.handleToggleChange(e.target);
            }
        });

        // Time sliders
        const sliders = document.querySelectorAll('.time-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleTimeSliderChange(e.target);
            });
        });
    }

    showDashboardTab(tabId) {
        this.activeTab = tabId;
        
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

        // Load tab-specific content
        this.loadTabContent(tabId);
    }

    loadTabContent(tabId) {
        switch (tabId) {
            case 'monitoring':
                this.updateMonitoringData();
                break;
            case 'controls':
                this.updateControlsData();
                break;
            case 'resources':
                this.updateResourcesData();
                break;
            default:
                break;
        }
    }

    updateMonitoringData() {
        // Update screen time data
        this.children.forEach(child => {
            const screenTimeItem = document.querySelector(`[data-child="${child.name}"] .progress-fill`);
            if (screenTimeItem) {
                const percentage = (child.screenTime.today / child.screenTime.limit) * 100;
                screenTimeItem.style.width = `${Math.min(percentage, 100)}%`;
                
                // Update color based on usage
                if (percentage > 100) {
                    screenTimeItem.style.backgroundColor = '#EF4444'; // Red
                } else if (percentage > 80) {
                    screenTimeItem.style.backgroundColor = '#F59E0B'; // Yellow
                } else {
                    screenTimeItem.style.backgroundColor = '#10B981'; // Green
                }
            }
        });

        // Simulate real-time updates
        this.simulateActivityUpdates();
    }

    updateControlsData() {
        // Update content filters
        const filters = [
            { name: 'Adult Content', enabled: true },
            { name: 'Violence', enabled: true },
            { name: 'Social Media', enabled: false },
            { name: 'Gaming Sites', enabled: false },
            { name: 'Shopping', enabled: true }
        ];

        const filterList = document.querySelector('.filter-list');
        if (filterList) {
            filterList.innerHTML = filters.map(filter => `
                <div class="filter-item">
                    <span>${filter.name}</span>
                    <div class="toggle ${filter.enabled ? 'active' : ''}" data-filter="${filter.name}"></div>
                </div>
            `).join('');
        }

        // Update time limits
        this.children.forEach(child => {
            const slider = document.querySelector(`[data-child="${child.name}"] .time-slider`);
            if (slider) {
                slider.value = child.screenTime.limit;
            }
        });
    }

    updateResourcesData() {
        const resources = [
            { title: 'Parent Safety Guide', description: 'Comprehensive guide to online safety', type: 'PDF' },
            { title: 'Conversation Starters', description: 'Questions to discuss with your kids', type: 'PDF' },
            { title: 'Emergency Contacts', description: 'Important numbers and resources', type: 'PDF' },
            { title: 'Social Media Guide', description: 'Platform-specific safety tips', type: 'PDF' },
            { title: 'Cyberbullying Response', description: 'What to do if your child is bullied', type: 'PDF' },
            { title: 'Screen Time Guidelines', description: 'Age-appropriate recommendations', type: 'PDF' }
        ];

        const resourcesGrid = document.querySelector('.resources-grid');
        if (resourcesGrid) {
            resourcesGrid.innerHTML = resources.map(resource => `
                <div class="resource-card">
                    <h4>${resource.title}</h4>
                    <p>${resource.description}</p>
                    <button class="btn btn-primary" onclick="dashboard.downloadResource('${resource.title}')">
                        Download ${resource.type}
                    </button>
                </div>
            `).join('');
        }
    }

    handleToggleChange(toggle) {
        const filterName = toggle.dataset.filter;
        const isEnabled = toggle.classList.contains('active');
        
        // Save filter state
        this.saveFilterState(filterName, isEnabled);
        
        // Show notification
        showNotification(
            `${filterName} filter ${isEnabled ? 'enabled' : 'disabled'}`,
            'info'
        );
    }

    handleTimeSliderChange(slider) {
        const childName = slider.closest('[data-child]')?.dataset.child;
        const newLimit = parseFloat(slider.value);
        
        if (childName) {
            const child = this.children.find(c => c.name === childName);
            if (child) {
                child.screenTime.limit = newLimit;
                
                // Update display
                const display = slider.parentNode.querySelector('.time-display');
                if (display) {
                    display.textContent = `${newLimit}h`;
                }
                
                // Save changes
                this.saveDashboardData();
                
                showNotification(
                    `Screen time limit for ${childName} updated to ${newLimit} hours`,
                    'success'
                );
            }
        }
    }

    saveFilterState(filterName, enabled) {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const filtersKey = `netwise_filters_${userId}`;
            const filters = JSON.parse(localStorage.getItem(filtersKey) || '{}');
            filters[filterName] = enabled;
            localStorage.setItem(filtersKey, JSON.stringify(filters));
        }
    }

    addAlert(alert) {
        this.alerts.unshift({
            id: generateId(),
            timestamp: new Date().toISOString(),
            ...alert
        });
        
        // Keep only last 10 alerts
        this.alerts = this.alerts.slice(0, 10);
        
        this.saveDashboardData();
        this.renderAlerts();
        
        // Show notification for high severity alerts
        if (alert.severity === 'high') {
            showNotification(`Alert: ${alert.message}`, 'warning');
        }
    }

    renderAlerts() {
        const alertsList = document.querySelector('.alerts-list');
        if (!alertsList) return;

        alertsList.innerHTML = this.alerts.map(alert => `
            <div class="alert-item ${alert.severity}">
                <div class="alert-content">
                    <p class="alert-message">${alert.message}</p>
                    <p class="alert-meta">Child: ${alert.child} • ${alert.time}</p>
                </div>
                <button class="alert-action" onclick="dashboard.viewAlertDetails('${alert.id}')">
                    View Details
                </button>
            </div>
        `).join('');
    }

    viewAlertDetails(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            // Show alert details modal or navigate to details page
            showNotification(`Viewing details for: ${alert.message}`, 'info');
        }
    }

    downloadResource(resourceTitle) {
        // Simulate resource download
        showNotification(`Downloading ${resourceTitle}...`, 'info');
        
        setTimeout(() => {
            showNotification(`${resourceTitle} downloaded successfully!`, 'success');
        }, 2000);
        
        // Track download
        this.trackResourceDownload(resourceTitle);
    }

    trackResourceDownload(resourceTitle) {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const downloadsKey = `netwise_downloads_${userId}`;
            const downloads = JSON.parse(localStorage.getItem(downloadsKey) || '[]');
            downloads.push({
                resource: resourceTitle,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(downloadsKey, JSON.stringify(downloads));
        }
    }

    simulateActivityUpdates() {
        // Simulate real-time activity updates
        setInterval(() => {
            if (this.activeTab === 'monitoring') {
                // Randomly update screen time
                this.children.forEach(child => {
                    const increase = Math.random() * 0.1; // Up to 6 minutes
                    child.screenTime.today = Math.min(
                        child.screenTime.today + increase,
                        child.screenTime.limit + 1
                    );
                });
                
                this.updateMonitoringData();
                this.saveDashboardData();
            }
        }, 30000); // Update every 30 seconds
    }

    generateReport() {
        const report = {
            generatedAt: new Date().toISOString(),
            children: this.children.map(child => ({
                name: child.name,
                age: child.age,
                status: child.status,
                screenTime: child.screenTime,
                recentAlerts: this.alerts.filter(a => a.child === child.name).slice(0, 5)
            })),
            summary: {
                totalAlerts: this.alerts.length,
                highSeverityAlerts: this.alerts.filter(a => a.severity === 'high').length,
                averageScreenTime: this.children.reduce((sum, child) => sum + child.screenTime.today, 0) / this.children.length
            }
        };

        // Download report as JSON
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `netwise-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        showNotification('Family safety report generated!', 'success');
    }

    resetDashboard() {
        if (confirm('Are you sure you want to reset all dashboard data? This cannot be undone.')) {
            const userId = authManager.getCurrentUser()?.id;
            if (userId) {
                localStorage.removeItem(`netwise_dashboard_${userId}`);
                localStorage.removeItem(`netwise_filters_${userId}`);
                localStorage.removeItem(`netwise_downloads_${userId}`);
            }
            
            // Reset to defaults
            this.children = [
                { name: 'Emma', age: 12, avatar: '👧', status: 'safe', lastActivity: '2 min ago', screenTime: { today: 0, average: 2.8, limit: 4.0 } },
                { name: 'Jack', age: 8, avatar: '👦', status: 'safe', lastActivity: '15 min ago', screenTime: { today: 0, average: 2.1, limit: 2.5 } }
            ];
            this.alerts = [];
            
            this.loadTabContent(this.activeTab);
            showNotification('Dashboard reset successfully.', 'success');
        }
    }
}

// Initialize dashboard manager
const dashboard = new DashboardManager();

// Global functions for HTML handlers
function showDashboardTab(tabId) {
    dashboard.showDashboardTab(tabId);
}

// Initialize dashboard page
function initializeDashboard() {
    // Check if user is logged in
    if (!authManager.isLoggedIn()) {
        showNotification('Please log in to access the parent dashboard.', 'warning');
        showAuthModal('login');
        return;
    }

    // Load initial data
    dashboard.loadDashboardData();
    dashboard.showDashboardTab('overview');
    dashboard.renderAlerts();
    
    // Set up periodic updates
    dashboard.simulateActivityUpdates();
}

// Export for global access
window.dashboard = dashboard;
window.showDashboardTab = showDashboardTab;