// AI Assistant functionality with Hugging Face API integration
class AIAssistant {
    constructor() {
        this.messages = [];
        this.apiKey = localStorage.getItem('netwise_hf_key') || '';
        this.isLoading = false;
        this.initializeChat();
    }

    initializeChat() {
        // Add welcome message
        this.addMessage({
            type: 'ai',
            content: "Hello! I'm NetWise AI, your personal internet safety assistant. I'm here to help you and your family stay safe online. Ask me anything about cyberbullying, online scams, privacy settings, or any other internet safety concerns!",
            timestamp: new Date()
        });
    }

    addMessage(message) {
        this.messages.push({
            id: this.generateId(),
            ...message
        });
        this.renderMessages();
        this.scrollToBottom();
    }

    renderMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.messages.map(message => `
            <div style="display: flex; justify-content: ${message.type === 'user' ? 'flex-end' : 'flex-start'};">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; max-width: 75%; ${message.type === 'user' ? 'flex-direction: row-reverse;' : ''}">
                    <div style="padding: 0.5rem; border-radius: 50%; ${message.type === 'user' ? 'background-color: var(--primary);' : 'background-color: var(--secondary);'}">
                        ${message.type === 'user' ? this.getUserIcon() : this.getAIIcon()}
                    </div>
                    <div style="border-radius: 1rem; padding: 1rem; ${message.type === 'user' ? 'background-color: var(--primary); color: var(--white);' : 'background-color: var(--gray-100); color: var(--gray-900);'}">
                        <div style="white-space: pre-wrap;">${this.formatMessage(message.content)}</div>
                        <div style="font-size: 0.75rem; margin-top: 0.5rem; ${message.type === 'user' ? 'color: rgba(255, 255, 255, 0.7);' : 'color: var(--gray-500);'}">
                            ${this.formatTime(message.timestamp)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add loading indicator if needed
        if (this.isLoading) {
            container.innerHTML += `
                <div style="display: flex; justify-content: flex-start;">
                    <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                        <div style="padding: 0.5rem; border-radius: 50%; background-color: var(--secondary);">
                            ${this.getAIIcon()}
                        </div>
                        <div style="background-color: var(--gray-100); border-radius: 1rem; padding: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <div class="spinner"></div>
                                <span style="color: var(--gray-600);">NetWise AI is thinking...</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    getAIIcon() {
        return `
            <svg style="width: 1rem; height: 1rem; color: var(--white);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
            </svg>
        `;
    }

    getUserIcon() {
        return `
            <svg style="width: 1rem; height: 1rem; color: var(--white);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
    }

    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bull;');
    }

    formatTime(timestamp) {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffMinutes = Math.floor((now - messageTime) / (1000 * 60));

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
        return messageTime.toLocaleDateString();
    }

    scrollToBottom() {
        const container = document.getElementById('chatMessages');
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
    }

    async sendMessage(content) {
        if (!content.trim() || this.isLoading) return;

        // Add user message
        this.addMessage({
            type: 'user',
            content: content,
            timestamp: new Date()
        });

        // Clear input
        const input = document.getElementById('messageInput');
        if (input) input.value = '';

        // Show loading
        this.isLoading = true;
        this.renderMessages();

        try {
            const response = await this.getAIResponse(content);
            
            // Add AI response
            this.addMessage({
                type: 'ai',
                content: response,
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.addMessage({
                type: 'ai',
                content: "I'm sorry, I encountered an error. Please try again or contact support if the problem persists.",
                timestamp: new Date()
            });
        } finally {
            this.isLoading = false;
            this.renderMessages();
        }
    }

    async getAIResponse(message) {
        // Try Hugging Face API if key is available
        if (this.apiKey) {
            try {
                const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: `You are NetWise AI, an expert internet safety assistant for families. Provide helpful, age-appropriate advice about online safety, cyberbullying, privacy, and digital citizenship. Always be supportive and educational. User question: ${message}`,
                        parameters: {
                            max_length: 500,
                            temperature: 0.7,
                            do_sample: true
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                if (data && data[0] && data[0].generated_text) {
                    return data[0].generated_text.replace(message, '').trim();
                }
                throw new Error('Invalid response format');
            } catch (error) {
                console.error('Hugging Face API error:', error);
                // Fall back to simulated responses
            }
        }

        // Simulated responses based on keywords
        return this.getSimulatedResponse(message);
    }

    getSimulatedResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simulate thinking time
        return new Promise(resolve => {
            setTimeout(() => {
                let response = this.generateContextualResponse(lowerMessage);
                resolve(response);
            }, 1000 + Math.random() * 2000);
        });
    }

    generateContextualResponse(lowerMessage) {
        if (lowerMessage.includes('cyberbullying') || lowerMessage.includes('bullying')) {
            return "Cyberbullying is a serious issue that affects many young people. Here are key steps to handle it:\n\n• **Don't respond** to bullying messages - it often makes things worse\n• **Save evidence** - take screenshots of harmful messages\n• **Block and report** the bully on the platform\n• **Tell a trusted adult** immediately\n• **Remember** - it's not your fault, and you deserve support\n\nWould you like specific advice for any particular platform or situation?";
        }
        
        if (lowerMessage.includes('password') || lowerMessage.includes('security')) {
            return "Great question about password security! Here are the essential rules:\n\n• **Use unique passwords** for each account\n• **Make them long** - at least 12 characters\n• **Include** uppercase, lowercase, numbers, and symbols\n• **Avoid** personal information like birthdays or names\n• **Use a password manager** to keep track safely\n• **Enable two-factor authentication** when available\n\n**Example strong password**: MyDog$Love2Play!\n\nNeed help creating a password for a specific account?";
        }
        
        if (lowerMessage.includes('scam') || lowerMessage.includes('fraud')) {
            return "Online scams are unfortunately common, but you can protect yourself:\n\n• **Be skeptical** of 'too good to be true' offers\n• **Never give** personal info to unsolicited contacts\n• **Check URLs carefully** - scammers use fake websites\n• **Don't click** suspicious links in emails or texts\n• **Verify independently** - call companies directly\n• **Trust your instincts** - if something feels wrong, it probably is\n\n**Red flags**: Urgent deadlines, requests for passwords, poor grammar, unexpected prizes\n\nWhat type of scam are you concerned about?";
        }
        
        if (lowerMessage.includes('social media') || lowerMessage.includes('privacy')) {
            return "Social media privacy is crucial for staying safe online:\n\n• **Review privacy settings** regularly on all platforms\n• **Limit** who can see your posts and personal info\n• **Think before posting** - everything online can be permanent\n• **Be selective** about friend/follower requests\n• **Don't share** location, school, or family details publicly\n• **Use** privacy-friendly profile pictures\n\n**For parents**: Regularly discuss what your kids are sharing and seeing online.\n\nWhich platform would you like specific guidance for?";
        }
        
        if (lowerMessage.includes('screen time') || lowerMessage.includes('addiction')) {
            return "Healthy screen time habits are important for everyone:\n\n• **Set clear boundaries** - specific times for device use\n• **Create device-free zones** - bedrooms, dining areas\n• **Use built-in controls** - screen time limits on devices\n• **Plan offline activities** - sports, reading, family time\n• **Model good behavior** - adults should follow rules too\n• **Watch for signs** - mood changes, sleep problems, declining grades\n\n**Recommended daily limits**:\n- Ages 2-5: 1 hour\n- Ages 6+: Consistent limits that don't interfere with sleep, exercise, or school\n\nWhat specific challenges are you facing with screen time?";
        }

        if (lowerMessage.includes('sextortion') || lowerMessage.includes('exploitation')) {
            return "This is a very serious topic. Sextortion is when someone threatens to share intimate images unless you give them money or more images.\n\n**If this is happening:**\n• **Don't panic** - you're not alone and it's not your fault\n• **Don't pay** - it rarely stops the demands\n• **Save evidence** - screenshots of conversations\n• **Report immediately** to local police and the platform\n• **Tell a trusted adult** - parent, counselor, or teacher\n\n**Prevention:**\n• Never share intimate images online\n• Be cautious about video calls with people you don't know well\n• Cover webcams when not in use\n\n**Get help**: National Center for Missing & Exploited Children: 1-800-THE-LOST\n\nWould you like information about reporting or finding local support?";
        }

        if (lowerMessage.includes('parent') || lowerMessage.includes('family')) {
            return "Family internet safety is a team effort! Here are key strategies:\n\n**For Parents:**\n• **Open communication** - create a safe space for questions\n• **Set clear rules** together as a family\n• **Use parental controls** but don't rely on them alone\n• **Stay informed** about new apps and trends\n• **Model good behavior** - kids learn by watching\n\n**Family Activities:**\n• Regular 'digital check-ins' to discuss online experiences\n• Create a family media agreement\n• Explore new apps together\n• Discuss news stories about online safety\n\nWhat specific family situation would you like help with?";
        }
        
        // Default response
        return "Thanks for your question! I'm here to help with all aspects of internet safety. I can provide guidance on:\n\n• **Cyberbullying** - prevention and response strategies\n• **Password security** - creating and managing strong passwords\n• **Privacy settings** - protecting your information on social media\n• **Online scams** - recognizing and avoiding fraud\n• **Screen time** - healthy digital habits\n• **Digital citizenship** - being a good online community member\n• **Family safety** - tools and strategies for parents\n\nWhat specific topic would you like to explore? Feel free to ask about any situation you're facing!";
    }

    saveApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('netwise_hf_key', key);
        
        // Hide API setup
        const apiSetup = document.getElementById('apiSetup');
        if (apiSetup) {
            apiSetup.style.display = 'none';
        }
        
        this.showNotification('API key saved! You now have access to enhanced AI responses.', 'success');
    }

    clearChat() {
        this.messages = [];
        this.initializeChat();
        this.showNotification('Chat history cleared.', 'info');
    }

    exportChat() {
        const chatData = {
            messages: this.messages,
            exportDate: new Date().toISOString(),
            user: window.authManager?.getCurrentUser()?.name || 'Anonymous'
        };
        
        const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `netwise-chat-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Chat exported successfully!', 'success');
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    showNotification(message, type) {
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    }
}

// Initialize AI Assistant
const aiAssistant = new AIAssistant();

// Global functions for HTML handlers
function sendMessage() {
    const input = document.getElementById('messageInput');
    if (input && input.value.trim()) {
        aiAssistant.sendMessage(input.value.trim());
    }
}

function sendQuickQuestion(question) {
    aiAssistant.sendMessage(question);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function toggleApiKeyInput() {
    const apiInput = document.getElementById('apiKeyInput');
    if (apiInput) {
        apiInput.classList.toggle('hidden');
    }
}

function saveApiKey() {
    const input = document.getElementById('apiKeyField');
    if (input && input.value.trim()) {
        aiAssistant.saveApiKey(input.value.trim());
        input.value = '';
        toggleApiKeyInput();
    }
}

// Initialize AI Assistant page
function initializeAIAssistant() {
    // Set up event listeners
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', handleChatKeyPress);
        messageInput.addEventListener('input', function() {
            const isEmpty = !this.value.trim();
            if (sendBtn) {
                sendBtn.disabled = isEmpty;
                sendBtn.style.opacity = isEmpty ? '0.5' : '1';
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Set up quick question buttons
    const quickButtons = document.querySelectorAll('.quick-btn');
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent;
            sendQuickQuestion(question);
        });
    });
    
    // Check if API key is already set
    if (aiAssistant.apiKey) {
        const apiSetup = document.getElementById('apiSetup');
        if (apiSetup) {
            apiSetup.style.display = 'none';
        }
    }
    
    // Initial render
    aiAssistant.renderMessages();
}

// Export for global access
window.aiAssistant = aiAssistant;
window.sendMessage = sendMessage;
window.sendQuickQuestion = sendQuickQuestion;
window.handleChatKeyPress = handleChatKeyPress;
window.toggleApiKeyInput = toggleApiKeyInput;
window.saveApiKey = saveApiKey;
window.initializeAIAssistant = initializeAIAssistant;