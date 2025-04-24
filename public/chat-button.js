// Completely isolated chat button implementation that doesn't interact with React DOM
(function() {
  console.log("Chat button script starting");
  
  // Variables to store chat state
  let chatMessages = [];
  let isLoadingResponse = false;
  
  // Create an iframe to host our chat button
  function createChatButtonFrame() {
    console.log("Creating chat button iframe");
    
    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '60px';
    iframe.style.height = '60px';
    iframe.style.border = 'none';
    iframe.style.background = 'transparent';
    iframe.style.zIndex = '9999';
    iframe.title = "Chat with Mr. Happy";
    
    // Add to document
    document.body.appendChild(iframe);
    
    // Get the iframe document
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Write HTML content to iframe
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            #chatButton {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background-color: #3B82F6;
              color: white;
              border: none;
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: transform 0.2s;
            }
            #chatButton:hover {
              transform: scale(1.05);
            }
          </style>
        </head>
        <body>
          <button id="chatButton" aria-label="Chat with Mr. Happy">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <script>
            document.getElementById('chatButton').addEventListener('click', function() {
              window.parent.postMessage('openChat', '*');
            });
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
    
    // Listen for messages from the iframe
    window.addEventListener('message', function(event) {
      if (event.data === 'openChat') {
        showChatModal();
      }
    });
  }
  
  // Function to check if user is logged in
  function checkLoggedIn() {
    return document.cookie.includes('next-auth.session-token') || 
           document.cookie.includes('__Secure-next-auth.session-token');
  }
  
  // Function to send message to API
  async function sendMessageToAPI(userMessage) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages.map(m => ({
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
      return data.response || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error('Error sending chat message:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  }
  
  // Function to show chat modal
  function showChatModal() {
    // Check if modal already exists
    if (document.getElementById('mrHappyChatModal')) {
      return;
    }
    
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'mrHappyChatModal';
    modal.style.position = 'fixed';
    modal.style.bottom = '90px';
    modal.style.right = '20px';
    modal.style.width = '350px';
    modal.style.height = '450px';
    modal.style.backgroundColor = '#1E293B';
    modal.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '9998';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.color = 'white';
    modal.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Add responsiveness
    const mediaQuery = window.matchMedia('(max-width: 480px)');
    if (mediaQuery.matches) {
      modal.style.width = '90%';
      modal.style.right = '5%';
    }
    
    // Create header
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '12px 16px';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    header.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
    
    const titleArea = document.createElement('div');
    titleArea.style.display = 'flex';
    titleArea.style.alignItems = 'center';
    
    const icon = document.createElement('div');
    icon.style.width = '32px';
    icon.style.height = '32px';
    icon.style.borderRadius = '50%';
    icon.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.marginRight = '12px';
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3A4 4 0 0 0 5 13a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Z"/><path d="M19 5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"/><path d="M12 9v3"/><path d="M12 9a3 3 0 0 0-3 3v1"/><path d="M9 13v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/><circle cx="5" cy="8" r="1"/><path d="M5.8 8.7A4 4 0 0 0 5 10a1 1 0 0 0 1 1"/><path d="M22 19v-4a8 8 0 0 0-16 0v4"/><path d="M2 19a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v1H2z"/></svg>';
    
    const titleText = document.createElement('div');
    
    const title = document.createElement('div');
    title.style.fontWeight = '600';
    title.style.fontSize = '16px';
    title.textContent = 'Mr. Happy';
    
    const subtitle = document.createElement('div');
    subtitle.style.fontSize = '12px';
    subtitle.style.opacity = '0.7';
    subtitle.style.marginTop = '2px';
    subtitle.style.display = 'flex';
    subtitle.style.alignItems = 'center';
    
    const statusDot = document.createElement('div');
    statusDot.style.width = '6px';
    statusDot.style.height = '6px';
    statusDot.style.borderRadius = '50%';
    statusDot.style.backgroundColor = '#10B981';
    statusDot.style.marginRight = '6px';
    
    subtitle.appendChild(statusDot);
    subtitle.appendChild(document.createTextNode('Cricket AI Assistant'));
    
    titleText.appendChild(title);
    titleText.appendChild(subtitle);
    
    titleArea.appendChild(icon);
    titleArea.appendChild(titleText);
    
    const closeBtn = document.createElement('button');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.opacity = '0.7';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.width = '24px';
    closeBtn.style.height = '24px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close chat');
    
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    header.appendChild(titleArea);
    header.appendChild(closeBtn);
    
    // Create message area
    const messageArea = document.createElement('div');
    messageArea.style.flex = '1';
    messageArea.style.padding = '16px';
    messageArea.style.overflowY = 'auto';
    messageArea.style.display = 'flex';
    messageArea.style.flexDirection = 'column';
    
    // Check if user is logged in
    const isLoggedIn = checkLoggedIn();
    
    if (!isLoggedIn) {
      // Show login message
      const loginMsg = document.createElement('div');
      loginMsg.style.textAlign = 'center';
      loginMsg.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      loginMsg.style.border = '1px solid rgba(59, 130, 246, 0.3)';
      loginMsg.style.padding = '16px';
      loginMsg.style.borderRadius = '8px';
      loginMsg.style.margin = 'auto';
      
      const loginText = document.createElement('p');
      loginText.textContent = 'Please log in to chat with Mr. Happy';
      loginText.style.marginBottom = '10px';
      
      const redirectNote = document.createElement('div');
      redirectNote.textContent = 'Redirecting to login...';
      redirectNote.style.fontSize = '12px';
      redirectNote.style.opacity = '0.7';
      
      loginMsg.appendChild(loginText);
      loginMsg.appendChild(redirectNote);
      messageArea.appendChild(loginMsg);
      
      // Redirect to login after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } else {
      // Show welcome message if no previous messages
      if (chatMessages.length === 0) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.style.textAlign = 'center';
        welcomeDiv.style.margin = 'auto';
        welcomeDiv.style.display = 'flex';
        welcomeDiv.style.flexDirection = 'column';
        welcomeDiv.style.alignItems = 'center';
        welcomeDiv.style.padding = '20px';
        
        const welcomeIcon = document.createElement('div');
        welcomeIcon.style.width = '64px';
        welcomeIcon.style.height = '64px';
        welcomeIcon.style.borderRadius = '50%';
        welcomeIcon.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        welcomeIcon.style.display = 'flex';
        welcomeIcon.style.alignItems = 'center';
        welcomeIcon.style.justifyContent = 'center';
        welcomeIcon.style.marginBottom = '16px';
        welcomeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3A4 4 0 0 0 5 13a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Z"/><path d="M19 5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"/><path d="M12 9v3"/><path d="M12 9a3 3 0 0 0-3 3v1"/><path d="M9 13v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/><circle cx="5" cy="8" r="1"/><path d="M5.8 8.7A4 4 0 0 0 5 10a1 1 0 0 0 1 1"/><path d="M22 19v-4a8 8 0 0 0-16 0v4"/><path d="M2 19a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v1H2z"/></svg>';
        
        const welcomeTitle = document.createElement('h3');
        welcomeTitle.textContent = 'Welcome to Mr. Happy';
        welcomeTitle.style.fontWeight = '500';
        welcomeTitle.style.marginBottom = '8px';
        
        const welcomeText = document.createElement('p');
        welcomeText.innerHTML = 'Your friendly cricket AI assistant from happycricket.com.<br>Ask me anything about cricket!';
        welcomeText.style.fontSize = '14px';
        welcomeText.style.opacity = '0.7';
        welcomeText.style.textAlign = 'center';
        
        welcomeDiv.appendChild(welcomeIcon);
        welcomeDiv.appendChild(welcomeTitle);
        welcomeDiv.appendChild(welcomeText);
        
        messageArea.appendChild(welcomeDiv);
      }
      
      // Display previous messages
      chatMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.style.maxWidth = '85%';
        msgDiv.style.padding = '10px 14px';
        msgDiv.style.borderRadius = '14px';
        msgDiv.style.marginBottom = '10px';
        msgDiv.style.fontSize = '14px';
        msgDiv.style.lineHeight = '1.5';
        
        if (msg.sender === 'user') {
          msgDiv.style.alignSelf = 'flex-end';
          msgDiv.style.backgroundColor = '#3B82F6';
          msgDiv.style.borderTopRightRadius = '4px';
        } else {
          msgDiv.style.alignSelf = 'flex-start';
          msgDiv.style.backgroundColor = '#475569';
          msgDiv.style.borderTopLeftRadius = '4px';
        }
        
        msgDiv.textContent = msg.text;
        messageArea.appendChild(msgDiv);
      });
    }
    
    // Create input area (only for logged in users)
    const inputArea = document.createElement('div');
    inputArea.style.padding = '12px 16px';
    inputArea.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
    inputArea.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
    
    if (isLoggedIn) {
      const form = document.createElement('form');
      form.style.display = 'flex';
      form.style.gap = '8px';
      
      const input = document.createElement('input');
      input.type = 'text';
      input.style.flex = '1';
      input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      input.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      input.style.borderRadius = '8px';
      input.style.padding = '10px 12px';
      input.style.color = 'white';
      input.style.outline = 'none';
      input.placeholder = 'Ask about cricket...';
      input.setAttribute('autocomplete', 'off');
      
      const sendBtn = document.createElement('button');
      sendBtn.type = 'submit';
      sendBtn.style.backgroundColor = '#3B82F6';
      sendBtn.style.border = 'none';
      sendBtn.style.width = '40px';
      sendBtn.style.height = '40px';
      sendBtn.style.borderRadius = '8px';
      sendBtn.style.display = 'flex';
      sendBtn.style.alignItems = 'center';
      sendBtn.style.justifyContent = 'center';
      sendBtn.style.cursor = 'pointer';
      sendBtn.disabled = isLoadingResponse;
      sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>';
      
      if (isLoadingResponse) {
        sendBtn.style.opacity = '0.5';
        sendBtn.style.cursor = 'not-allowed';
      }
      
      // Handle form submission
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userMessage = input.value.trim();
        if (!userMessage || isLoadingResponse) return;
        
        // Clear input
        input.value = '';
        
        // Add user message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.style.maxWidth = '85%';
        userMsgDiv.style.padding = '10px 14px';
        userMsgDiv.style.borderRadius = '14px';
        userMsgDiv.style.marginBottom = '10px';
        userMsgDiv.style.fontSize = '14px';
        userMsgDiv.style.lineHeight = '1.5';
        userMsgDiv.style.alignSelf = 'flex-end';
        userMsgDiv.style.backgroundColor = '#3B82F6';
        userMsgDiv.style.borderTopRightRadius = '4px';
        userMsgDiv.textContent = userMessage;
        messageArea.appendChild(userMsgDiv);
        
        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.style.display = 'flex';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.style.gap = '8px';
        loadingDiv.style.padding = '8px 14px';
        loadingDiv.style.backgroundColor = '#475569';
        loadingDiv.style.borderRadius = '14px';
        loadingDiv.style.borderTopLeftRadius = '4px';
        loadingDiv.style.marginBottom = '10px';
        loadingDiv.style.alignSelf = 'flex-start';
        loadingDiv.style.width = 'fit-content';
        
        for (let i = 0; i < 3; i++) {
          const dot = document.createElement('div');
          dot.style.width = '8px';
          dot.style.height = '8px';
          dot.style.borderRadius = '50%';
          dot.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          dot.style.animation = 'typingAnimation 1.4s infinite ease-in-out';
          dot.style.animationDelay = `${i * 0.2}s`;
          loadingDiv.appendChild(dot);
        }
        
        const style = document.createElement('style');
        style.textContent = `
          @keyframes typingAnimation {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
        `;
        document.head.appendChild(style);
        
        messageArea.appendChild(loadingDiv);
        
        // Scroll to bottom
        messageArea.scrollTop = messageArea.scrollHeight;
        
        // Add message to the list
        chatMessages.push({ sender: 'user', text: userMessage });
        
        // Set loading state
        isLoadingResponse = true;
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
        sendBtn.style.cursor = 'not-allowed';
        
        // Get AI response
        const aiResponse = await sendMessageToAPI(userMessage);
        
        // Remove loading indicator
        messageArea.removeChild(loadingDiv);
        
        // Add AI response
        const botMsgDiv = document.createElement('div');
        botMsgDiv.style.maxWidth = '85%';
        botMsgDiv.style.padding = '10px 14px';
        botMsgDiv.style.borderRadius = '14px';
        botMsgDiv.style.marginBottom = '10px';
        botMsgDiv.style.fontSize = '14px';
        botMsgDiv.style.lineHeight = '1.5';
        botMsgDiv.style.alignSelf = 'flex-start';
        botMsgDiv.style.backgroundColor = '#475569';
        botMsgDiv.style.borderTopLeftRadius = '4px';
        botMsgDiv.textContent = aiResponse;
        messageArea.appendChild(botMsgDiv);
        
        // Add bot message to the list
        chatMessages.push({ sender: 'bot', text: aiResponse });
        
        // Clear loading state
        isLoadingResponse = false;
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
        sendBtn.style.cursor = 'pointer';
        
        // Scroll to bottom
        messageArea.scrollTop = messageArea.scrollHeight;
        
        // Focus input again
        input.focus();
      });
      
      form.appendChild(input);
      form.appendChild(sendBtn);
      inputArea.appendChild(form);
      
      // Focus input
      setTimeout(() => {
        input.focus();
      }, 100);
    }
    
    // Assemble modal
    modal.appendChild(header);
    modal.appendChild(messageArea);
    if (isLoggedIn) {
      modal.appendChild(inputArea);
    }
    document.body.appendChild(modal);
    
    // Scroll to bottom of message area
    messageArea.scrollTop = messageArea.scrollHeight;
  }
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatButtonFrame);
  } else {
    // Give React a chance to initialize first
    setTimeout(createChatButtonFrame, 500);
  }
})(); 