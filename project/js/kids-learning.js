// Kids Learning functionality
class KidsLearningManager {
    constructor() {
        this.currentAge = '6-8';
        this.progress = {
            '6-8': { completed: 3, total: 8 },
            '9-12': { completed: 5, total: 10 },
            '13-16': { completed: 2, total: 12 }
        };
        this.lessons = this.initializeLessons();
    }

    initializeLessons() {
        return {
            '6-8': [
                {
                    id: 1,
                    title: 'Stranger Danger Online',
                    description: 'Learn about talking to strangers on the internet',
                    duration: '10 min',
                    type: 'Interactive Story',
                    completed: true,
                    icon: 'user'
                },
                {
                    id: 2,
                    title: 'Password Heroes',
                    description: 'Create strong passwords to protect your accounts',
                    duration: '15 min',
                    type: 'Game',
                    completed: true,
                    icon: 'lock'
                },
                {
                    id: 3,
                    title: 'Kind Words Online',
                    description: 'How to be nice to others on the internet',
                    duration: '12 min',
                    type: 'Video + Quiz',
                    completed: true,
                    icon: 'message-circle'
                },
                {
                    id: 4,
                    title: 'Safe Sharing',
                    description: 'What information is safe to share online',
                    duration: '8 min',
                    type: 'Interactive Game',
                    completed: false,
                    icon: 'user'
                },
                {
                    id: 5,
                    title: 'Digital Footprints',
                    description: 'Understanding what you leave behind online',
                    duration: '10 min',
                    type: 'Story + Activity',
                    completed: false,
                    icon: 'user'
                },
                {
                    id: 6,
                    title: 'Screen Time Balance',
                    description: 'Learning healthy internet habits',
                    duration: '12 min',
                    type: 'Interactive Guide',
                    completed: false,
                    icon: 'clock'
                },
                {
                    id: 7,
                    title: 'Asking for Help',
                    description: 'When and how to tell a trusted adult',
                    duration: '8 min',
                    type: 'Role Play',
                    completed: false,
                    icon: 'help-circle'
                },
                {
                    id: 8,
                    title: 'Internet Safety Quiz',
                    description: 'Test what you have learned',
                    duration: '15 min',
                    type: 'Final Quiz',
                    completed: false,
                    icon: 'award'
                }
            ],
            '9-12': [
                {
                    id: 1,
                    title: 'Cyberbullying Defense',
                    description: 'Recognize and respond to online bullying',
                    duration: '20 min',
                    type: 'Scenario Training',
                    completed: true,
                    icon: 'shield'
                },
                {
                    id: 2,
                    title: 'Social Media Safety',
                    description: 'How to use social media responsibly',
                    duration: '25 min',
                    type: 'Interactive Course',
                    completed: true,
                    icon: 'users'
                },
                {
                    id: 3,
                    title: 'Digital Footprint Detective',
                    description: 'Understanding your online presence',
                    duration: '18 min',
                    type: 'Investigation Game',
                    completed: true,
                    icon: 'search'
                },
                {
                    id: 4,
                    title: 'Scam Spotter',
                    description: 'Identify and avoid online scams',
                    duration: '22 min',
                    type: 'Challenge Game',
                    completed: true,
                    icon: 'alert-triangle'
                },
                {
                    id: 5,
                    title: 'Privacy Settings Master',
                    description: 'Control who sees your information',
                    duration: '20 min',
                    type: 'Hands-on Tutorial',
                    completed: true,
                    icon: 'lock'
                },
                {
                    id: 6,
                    title: 'Online Friendship Rules',
                    description: 'Making safe connections online',
                    duration: '15 min',
                    type: 'Interactive Story',
                    completed: false,
                    icon: 'heart'
                },
                {
                    id: 7,
                    title: 'Digital Citizenship',
                    description: 'Being a good online community member',
                    duration: '25 min',
                    type: 'Project-based Learning',
                    completed: false,
                    icon: 'globe'
                },
                {
                    id: 8,
                    title: 'Content Creation Safety',
                    description: 'Sharing your creativity safely',
                    duration: '20 min',
                    type: 'Creative Workshop',
                    completed: false,
                    icon: 'camera'
                },
                {
                    id: 9,
                    title: 'Emergency Response',
                    description: 'What to do in serious situations',
                    duration: '18 min',
                    type: 'Emergency Training',
                    completed: false,
                    icon: 'phone'
                },
                {
                    id: 10,
                    title: 'Safety Certification',
                    description: 'Earn your digital safety certificate',
                    duration: '30 min',
                    type: 'Comprehensive Test',
                    completed: false,
                    icon: 'award'
                }
            ],
            '13-16': [
                {
                    id: 1,
                    title: 'Advanced Privacy Controls',
                    description: 'Master privacy controls across platforms',
                    duration: '30 min',
                    type: 'Technical Training',
                    completed: true,
                    icon: 'settings'
                },
                {
                    id: 2,
                    title: 'Sextortion Awareness',
                    description: 'Understand and prevent online exploitation',
                    duration: '35 min',
                    type: 'Serious Discussion',
                    completed: true,
                    icon: 'shield'
                },
                {
                    id: 3,
                    title: 'Digital Rights & Laws',
                    description: 'Understanding your legal rights online',
                    duration: '28 min',
                    type: 'Educational Course',
                    completed: false,
                    icon: 'book'
                },
                {
                    id: 4,
                    title: 'Mental Health & Technology',
                    description: 'Healthy relationship with technology',
                    duration: '32 min',
                    type: 'Wellness Program',
                    completed: false,
                    icon: 'heart'
                },
                {
                    id: 5,
                    title: 'Advanced Scam Detection',
                    description: 'Sophisticated fraud prevention',
                    duration: '25 min',
                    type: 'Advanced Training',
                    completed: false,
                    icon: 'eye'
                },
                {
                    id: 6,
                    title: 'Online Reputation Management',
                    description: 'Building and protecting your digital identity',
                    duration: '30 min',
                    type: 'Strategic Planning',
                    completed: false,
                    icon: 'user'
                },
                {
                    id: 7,
                    title: 'Cybersecurity Fundamentals',
                    description: 'Protecting yourself and others',
                    duration: '40 min',
                    type: 'Technical Course',
                    completed: false,
                    icon: 'shield'
                },
                {
                    id: 8,
                    title: 'Digital Leadership',
                    description: 'Becoming a positive online influence',
                    duration: '35 min',
                    type: 'Leadership Training',
                    completed: false,
                    icon: 'star'
                },
                {
                    id: 9,
                    title: 'Career & Digital Presence',
                    description: 'Professional online presence',
                    duration: '30 min',
                    type: 'Career Preparation',
                    completed: false,
                    icon: 'briefcase'
                },
                {
                    id: 10,
                    title: 'Teaching Others Safety',
                    description: 'Sharing knowledge with peers',
                    duration: '25 min',
                    type: 'Peer Education',
                    completed: false,
                    icon: 'users'
                },
                {
                    id: 11,
                    title: 'Advanced Threat Recognition',
                    description: 'Identifying sophisticated online threats',
                    duration: '35 min',
                    type: 'Advanced Security',
                    completed: false,
                    icon: 'alert-triangle'
                },
                {
                    id: 12,
                    title: 'Digital Safety Mastery',
                    description: 'Comprehensive final assessment',
                    duration: '45 min',
                    type: 'Master Certification',
                    completed: false,
                    icon: 'award'
                }
            ]
        };
    }

    selectAgeGroup(age) {
        this.currentAge = age;
        this.updateAgeButtons();
        this.updateProgress();
        this.renderLessons();
    }

    updateAgeButtons() {
        const buttons = document.querySelectorAll('.age-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.age === this.currentAge) {
                btn.classList.add('active');
            }
        });
    }

    updateProgress() {
        const progress = this.progress[this.currentAge];
        const percentage = Math.round((progress.completed / progress.total) * 100);
        
        const progressText = document.getElementById('progressText');
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (progressText) progressText.textContent = `${progress.completed}/${progress.total} Completed`;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressPercentage) progressPercentage.textContent = `${percentage}% Complete`;
    }

    renderLessons() {
        const lessonsGrid = document.getElementById('lessonsGrid');
        if (!lessonsGrid) return;
        
        const lessons = this.lessons[this.currentAge];
        
        lessonsGrid.innerHTML = lessons.map(lesson => `
            <div class="lesson-card ${lesson.completed ? 'completed' : ''}" onclick="kidsLearning.openLesson(${lesson.id})">
                <div class="lesson-header">
                    <div class="lesson-icon ${lesson.completed ? 'completed' : ''}">
                        ${this.getIconSVG(lesson.icon)}
                    </div>
                    ${lesson.completed ? '<div class="lesson-badge">🏆</div>' : ''}
                </div>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-description">${lesson.description}</p>
                <div class="lesson-meta">
                    <span class="lesson-type">${lesson.type}</span>
                    <span class="lesson-duration">${lesson.duration}</span>
                </div>
                <button class="lesson-btn ${lesson.completed ? 'completed' : ''}">
                    ${lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                </button>
            </div>
        `).join('');
    }

    getIconSVG(iconName) {
        const icons = {
            'user': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
            'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
            'message-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
            'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
            'help-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            'award': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>',
            'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
            'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
            'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
            'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
            'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
            'camera': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
            'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
            'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
            'book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
            'eye': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
            'star': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>',
            'briefcase': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
        };
        
        return icons[iconName] || icons['user'];
    }

    openLesson(lessonId) {
        const lesson = this.lessons[this.currentAge].find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Update modal content
        const modal = document.getElementById('lessonModal');
        const title = document.getElementById('lessonTitle');
        const duration = document.getElementById('lessonDuration');
        
        if (title) title.textContent = lesson.title;
        if (duration) duration.textContent = lesson.duration;
        
        // Show modal
        modal.classList.add('active');
        
        // Track lesson view
        this.trackLessonView(lessonId);
    }

    closeLessonModal() {
        const modal = document.getElementById('lessonModal');
        modal.classList.remove('active');
    }

    completeLesson(lessonId) {
        const lesson = this.lessons[this.currentAge].find(l => l.id === lessonId);
        if (lesson && !lesson.completed) {
            lesson.completed = true;
            this.progress[this.currentAge].completed++;
            
            // Update UI
            this.updateProgress();
            this.renderLessons();
            
            // Save progress
            this.saveProgress();
            
            // Show completion message
            showNotification(`Congratulations! You completed "${lesson.title}"!`, 'success');
            
            // Close modal
            this.closeLessonModal();
        }
    }

    saveProgress() {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const progressKey = `netwise_progress_${userId}`;
            localStorage.setItem(progressKey, JSON.stringify({
                progress: this.progress,
                lessons: this.lessons,
                lastUpdated: new Date().toISOString()
            }));
        }
    }

    loadProgress() {
        const userId = authManager.getCurrentUser()?.id;
        if (userId) {
            const progressKey = `netwise_progress_${userId}`;
            const saved = localStorage.getItem(progressKey);
            if (saved) {
                const data = JSON.parse(saved);
                this.progress = data.progress || this.progress;
                this.lessons = data.lessons || this.lessons;
            }
        }
    }

    trackLessonView(lessonId) {
        // Track analytics
        const event = {
            type: 'lesson_view',
            lessonId: lessonId,
            ageGroup: this.currentAge,
            timestamp: new Date().toISOString(),
            userId: authManager.getCurrentUser()?.id
        };
        
        // Store in local analytics
        const analytics = JSON.parse(localStorage.getItem('netwise_analytics') || '[]');
        analytics.push(event);
        localStorage.setItem('netwise_analytics', JSON.stringify(analytics));
    }

    getCompletionStats() {
        const stats = {};
        Object.keys(this.progress).forEach(age => {
            const progress = this.progress[age];
            stats[age] = {
                completed: progress.completed,
                total: progress.total,
                percentage: Math.round((progress.completed / progress.total) * 100)
            };
        });
        return stats;
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.progress = {
                '6-8': { completed: 0, total: 8 },
                '9-12': { completed: 0, total: 10 },
                '13-16': { completed: 0, total: 12 }
            };
            
            // Reset lesson completion
            Object.keys(this.lessons).forEach(age => {
                this.lessons[age].forEach(lesson => {
                    lesson.completed = false;
                });
            });
            
            this.updateProgress();
            this.renderLessons();
            this.saveProgress();
            
            showNotification('Progress has been reset.', 'info');
        }
    }
}

// Initialize kids learning manager
const kidsLearning = new KidsLearningManager();

// Global functions for HTML onclick handlers
function selectAgeGroup(age) {
    kidsLearning.selectAgeGroup(age);
}

function closeLessonModal() {
    kidsLearning.closeLessonModal();
}

// Initialize kids learning page
function initializeKidsLearning() {
    // Load user progress
    kidsLearning.loadProgress();
    
    // Set up age group buttons
    const ageButtons = document.querySelectorAll('.age-btn');
    ageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const age = btn.dataset.age;
            selectAgeGroup(age);
        });
    });
    
    // Initial render
    kidsLearning.updateProgress();
    kidsLearning.renderLessons();
    
    // Check if user is logged in for progress tracking
    if (!authManager.isLoggedIn()) {
        showNotification('Sign in to save your progress!', 'info');
    }
}

// Export for global access
window.kidsLearning = kidsLearning;
window.selectAgeGroup = selectAgeGroup;
window.closeLessonModal = closeLessonModal;