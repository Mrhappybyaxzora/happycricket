(function() {
  console.log("Chat loader script starting");
  
  // Create chat button style
  const style = document.createElement('style');
  style.textContent = `
    .chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: var(--primary, #3B82F6);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: transform 0.2s;
    }
    .chat-button:hover {
      transform: scale(1.05);
    }
    .chat-button:active {
      transform: scale(0.95);
    }
    .chat-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      max-width: 90%;
      height: 450px;
      background-color: var(--card, #1E293B);
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      z-index: 50;
      overflow: hidden;
    }
    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(4px);
    }
    .chat-title-area {
      display: flex;
      align-items: center;
    }
    .chat-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(59, 130, 246, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    .chat-header-title {
      font-weight: 500;
      color: var(--foreground, #FFFFFF);
    }
    .chat-header-subtitle {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 2px;
      display: flex;
      align-items: center;
    }
    .chat-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #10B981;
      margin-right: 6px;
    }
    .chat-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--foreground, #FFFFFF);
      opacity: 0.7;
    }
    .chat-close:hover {
      opacity: 1;
    }
    .chat-message-area {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .chat-login-message {
      text-align: center;
      background-color: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 12px;
      border-radius: 8px;
      color: var(--foreground, #FFFFFF);
    }
    .chat-redirect-note {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 8px;
    }
    .chat-welcome {
      text-align: center;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .chat-welcome-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: rgba(59, 130, 246, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .chat-welcome-title {
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--foreground, #FFFFFF);
    }
    .chat-welcome-text {
      font-size: 14px;
      opacity: 0.7;
      text-align: center;
      color: var(--foreground, #FFFFFF);
    }
    .chat-message {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      margin-bottom: 10px;
      color: var(--foreground, #FFFFFF);
    }
    .chat-message-user {
      align-self: flex-end;
      background-color: var(--primary, #3B82F6);
      border-top-right-radius: 0;
    }
    .chat-message-bot {
      align-self: flex-start;
      background-color: var(--muted, #475569);
      border-top-left-radius: 0;
    }
    .chat-input-area {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(30, 41, 59, 0.8);
    }
    .chat-form {
      display: flex;
      gap: 8px;
    }
    .chat-input {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 8px 12px;
      color: var(--foreground, #FFFFFF);
      outline: none;
    }
    .chat-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    .chat-send {
      background-color: var(--primary, #3B82F6);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .chat-loader {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chat-spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
    }
  `;
  
  document.head.appendChild(style);
  
  // Function to create and append the chat button
  function createChatButton() {
    console.log("Creating chat button");
    
    // Create chat button
    const container = document.getElementById('chat-button-container');
    console.log("Chat button container found:", !!container);
    
    // If container doesn't exist, create one and append to body
    let button;
    if (!container) {
      console.log("Creating fallback container");
      const fallbackContainer = document.createElement('div');
      fallbackContainer.id = 'chat-button-container';
      document.body.appendChild(fallbackContainer);
      
      button = document.createElement('button');
      button.className = 'chat-button';
      button.setAttribute('aria-label', 'Chat with Mr. Happy');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
      fallbackContainer.appendChild(button);
    } else {
      button = document.createElement('button');
      button.className = 'chat-button';
      button.setAttribute('aria-label', 'Chat with Mr. Happy');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
      container.appendChild(button);
    }
    
    let chatWindow = null;
    let messages = [];
    let isLoadingResponse = false;
    
    // Check if user is logged in
    function checkLoggedIn() {
      return document.cookie.includes('next-auth.session-token') || 
             document.cookie.includes('__Secure-next-auth.session-token');
    }
    
    // Send a message to the API
    async function sendMessageToAPI(userMessage) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })), {
              role: 'user',
              content: userMessage
            }],
          }),
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.response;
      } catch (error) {
        console.error('Error sending chat message:', error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
      }
    }
    
    function createChatInterface() {
      if (chatWindow) {
        container.removeChild(chatWindow);
        chatWindow = null;
        return;
      }
      
      const isLoggedIn = checkLoggedIn();
      
      chatWindow = document.createElement('div');
      chatWindow.className = 'chat-window';
      
      // Create chat header
      const header = document.createElement('div');
      header.className = 'chat-header';
      
      const titleArea = document.createElement('div');
      titleArea.className = 'chat-title-area';
      
      const icon = document.createElement('div');
      icon.className = 'chat-icon';
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3A4 4 0 0 0 5 13a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Z"/><path d="M19 5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"/><path d="M12 9v3"/><path d="M12 9a3 3 0 0 0-3 3v1"/><path d="M9 13v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/><circle cx="5" cy="8" r="1"/><path d="M5.8 8.7A4 4 0 0 0 5 10a1 1 0 0 0 1 1"/><path d="M22 19v-4a8 8 0 0 0-16 0v4"/><path d="M2 19a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v1H2z"/></svg>';
      
      const titleText = document.createElement('div');
      
      const title = document.createElement('div');
      title.className = 'chat-header-title';
      title.textContent = 'Mr. Happy';
      
      const subtitle = document.createElement('div');
      subtitle.className = 'chat-header-subtitle';
      
      const statusDot = document.createElement('div');
      statusDot.className = 'chat-status-dot';
      
      subtitle.appendChild(statusDot);
      subtitle.appendChild(document.createTextNode('Online • happycricket.com'));
      
      titleText.appendChild(title);
      titleText.appendChild(subtitle);
      
      titleArea.appendChild(icon);
      titleArea.appendChild(titleText);
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'chat-close';
      closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      closeBtn.setAttribute('aria-label', 'Close chat');
      
      closeBtn.addEventListener('click', () => {
        container.removeChild(chatWindow);
        chatWindow = null;
      });
      
      header.appendChild(titleArea);
      header.appendChild(closeBtn);
      chatWindow.appendChild(header);
      
      // Create message area
      const messageArea = document.createElement('div');
      messageArea.className = 'chat-message-area';
      
      if (!isLoggedIn) {
        // Show login message for unauthenticated users
        const loginMessage = document.createElement('div');
        loginMessage.className = 'chat-login-message';
        loginMessage.innerHTML = 'Please log in to chat with Mr. Happy.<br><span class="chat-redirect-note">Redirecting to login...</span>';
        messageArea.appendChild(loginMessage);
        
        // Redirect to login after a delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        // Show welcome message for authenticated users
        if (messages.length === 0) {
          const welcomeDiv = document.createElement('div');
          welcomeDiv.className = 'chat-welcome';
          
          const welcomeIcon = document.createElement('div');
          welcomeIcon.className = 'chat-welcome-icon';
          welcomeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3A4 4 0 0 0 5 13a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Z"/><path d="M19 5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"/><path d="M12 9v3"/><path d="M12 9a3 3 0 0 0-3 3v1"/><path d="M9 13v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/><circle cx="5" cy="8" r="1"/><path d="M5.8 8.7A4 4 0 0 0 5 10a1 1 0 0 0 1 1"/><path d="M22 19v-4a8 8 0 0 0-16 0v4"/><path d="M2 19a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v1H2z"/></svg>';
          
          const welcomeTitle = document.createElement('div');
          welcomeTitle.className = 'chat-welcome-title';
          welcomeTitle.textContent = 'Welcome to Mr. Happy';
          
          const welcomeText = document.createElement('div');
          welcomeText.className = 'chat-welcome-text';
          welcomeText.innerHTML = 'Your friendly cricket assistant from happycricket.com.<br>Ask me anything about cricket!';
          
          welcomeDiv.appendChild(welcomeIcon);
          welcomeDiv.appendChild(welcomeTitle);
          welcomeDiv.appendChild(welcomeText);
          
          messageArea.appendChild(welcomeDiv);
        }
        
        // Display existing messages if any
        messages.forEach(msg => {
          const msgDiv = document.createElement('div');
          msgDiv.className = `chat-message ${msg.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'}`;
          msgDiv.textContent = msg.text;
          messageArea.appendChild(msgDiv);
        });
        
        // Show loading message if waiting for response
        if (isLoadingResponse) {
          const loadingDiv = document.createElement('div');
          loadingDiv.className = 'chat-message chat-message-bot';
          
          const loader = document.createElement('div');
          loader.className = 'chat-loader';
          
          const spinner = document.createElement('div');
          spinner.className = 'chat-spinner';
          spinner.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
          
          const loadingText = document.createElement('span');
          loadingText.textContent = 'Thinking...';
          
          loader.appendChild(spinner);
          loader.appendChild(loadingText);
          loadingDiv.appendChild(loader);
          
          messageArea.appendChild(loadingDiv);
        }
      }
      
      chatWindow.appendChild(messageArea);
      
      // Create input area (only for authenticated users)
      if (isLoggedIn) {
        const inputArea = document.createElement('div');
        inputArea.className = 'chat-input-area';
        
        const form = document.createElement('form');
        form.className = 'chat-form';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'chat-input';
        input.placeholder = 'Ask about cricket...';
        input.setAttribute('autocomplete', 'off');
        
        const sendBtn = document.createElement('button');
        sendBtn.type = 'submit';
        sendBtn.className = 'chat-send';
        sendBtn.disabled = isLoadingResponse;
        sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>';
        
        // Handle form submission
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const userMessage = input.value.trim();
          if (!userMessage || isLoadingResponse) return;
          
          // Clear input
          input.value = '';
          
          // Add message to the list
          messages.push({ sender: 'user', text: userMessage });
          
          // Set loading state
          isLoadingResponse = true;
          sendBtn.disabled = true;
          
          // Refresh chat interface to show new message and loading
          createChatInterface();
          
          // Get AI response
          const aiResponse = await sendMessageToAPI(userMessage);
          
          // Add AI response to messages
          messages.push({ sender: 'bot', text: aiResponse });
          
          // Clear loading state
          isLoadingResponse = false;
          
          // Refresh chat interface with new message
          createChatInterface();
          
          // Focus input again
          const newInput = chatWindow.querySelector('.chat-input');
          if (newInput) {
            newInput.focus();
          }
        });
        
        form.appendChild(input);
        form.appendChild(sendBtn);
        inputArea.appendChild(form);
        chatWindow.appendChild(inputArea);
        
        // Focus input
        setTimeout(() => {
          input.focus();
        }, 100);
      }
      
      container.appendChild(chatWindow);
      
      // Scroll to bottom of message area
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 10);
    }
    
    button.addEventListener('click', createChatInterface);
  }
  
  // Execute when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatButton);
  } else {
    createChatButton();
  }
  
  // Also try again after a delay to ensure everything is loaded
  setTimeout(createChatButton, 1000);
})(); 