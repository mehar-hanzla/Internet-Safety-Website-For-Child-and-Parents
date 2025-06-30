import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Lightbulb, Shield, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm NetWise AI, your personal internet safety assistant. I'm here to help you and your family stay safe online. Ask me anything about cyberbullying, online scams, privacy settings, or any other internet safety concerns!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses for different safety topics
  const getAIResponse = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check if API key is available for real ChatGPT integration
    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are NetWise AI, an expert internet safety assistant for families. Provide helpful, age-appropriate advice about online safety, cyberbullying, privacy, and digital citizenship. Always be supportive and educational.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        // Fall back to simulated responses
      }
    }

    // Simulated responses based on keywords
    if (lowerMessage.includes('cyberbullying') || lowerMessage.includes('bullying')) {
      return "Cyberbullying is a serious issue that affects many young people. Here are some key steps:\n\n• **Don't respond** to bullying messages - it often makes things worse\n• **Save evidence** - take screenshots of harmful messages\n• **Block and report** the bully on the platform\n• **Tell a trusted adult** immediately\n• **Remember** - it's not your fault, and you deserve support\n\nWould you like specific advice for any particular platform or situation?";
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
    
    // Default response
    return "Thanks for your question! I'm here to help with all aspects of internet safety. I can provide guidance on:\n\n• **Cyberbullying** - prevention and response strategies\n• **Password security** - creating and managing strong passwords\n• **Privacy settings** - protecting your information on social media\n• **Online scams** - recognizing and avoiding fraud\n• **Screen time** - healthy digital habits\n• **Digital citizenship** - being a good online community member\n\nWhat specific topic would you like to explore? Feel free to ask about any situation you're facing!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000); // Simulate thinking time
    } catch (error) {
      setIsLoading(false);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I encountered an error. Please try again or contact support if the problem persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I report cyberbullying?",
    "What makes a strong password?",
    "How do I adjust privacy settings?",
    "What are common online scams?",
    "How much screen time is healthy?",
    "What should I do about inappropriate content?"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Bot className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">NetWise AI Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant, expert advice on internet safety, cyberbullying, privacy, and digital citizenship from our AI-powered assistant.
          </p>
        </motion.div>

        {/* API Key Setup */}
        {!apiKey && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">
                  For enhanced AI responses, add your OpenAI API key
                </span>
              </div>
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showApiKeyInput ? 'Cancel' : 'Setup'}
              </button>
            </div>
            {showApiKeyInput && (
              <div className="mt-4 flex space-x-2">
                <input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => setShowApiKeyInput(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-3xl ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-green-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-gray-600" />
                      <span className="text-gray-600">NetWise AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="border-t p-4">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about internet safety..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-yellow-800">
              <p className="font-medium mb-1">Important Safety Reminder</p>
              <p className="text-sm">
                While our AI assistant provides helpful guidance, always involve trusted adults (parents, teachers, counselors) 
                in serious safety situations. For emergencies, contact local authorities or call emergency services.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistant;