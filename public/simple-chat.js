(function() {
  // Create chat button
  function initChat() {
    const button = document.createElement('button');
    button.id = 'mrHappyButton';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
    button.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#3B82F6;color:white;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;z-index:9999;';
    document.body.appendChild(button);
    
    let chatWindow = null;
    let messages = [];
    
    // Function to check if user is logged in
    function isUserLoggedIn() {
      return document.cookie.includes('next-auth.session-token') || 
             document.cookie.includes('__Secure-next-auth.session-token');
    }
    
    button.addEventListener('click', function() {
      if (chatWindow) {
        chatWindow.remove();
        chatWindow = null;
        return;
      }
      
      chatWindow = document.createElement('div');
      chatWindow.id = 'mrHappyChatWindow';
      chatWindow.style.cssText = 'position:fixed;bottom:90px;right:20px;width:350px;height:450px;background:#1E293B;border:1px solid rgba(255,255,255,0.1);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.2);color:white;display:flex;flex-direction:column;z-index:9998;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;overflow:hidden;';
      
      // Add responsive styles
      if (window.innerWidth <= 480) {
        chatWindow.style.width = '90vw';
        chatWindow.style.right = '5vw';
      }
      
      // Create header
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(30,41,59,0.95);';
      
      const title = document.createElement('div');
      title.textContent = 'Chat with Mr. Happy';
      title.style.fontWeight = 'bold';
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = 'background:none;border:none;color:white;font-size:24px;cursor:pointer;';
      closeBtn.onclick = function() {
        chatWindow.remove();
        chatWindow = null;
      };
      
      header.appendChild(title);
      header.appendChild(closeBtn);
      
      // Create message area
      const messageArea = document.createElement('div');
      messageArea.style.cssText = 'flex:1;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;';
      
      // Check if user is logged in
      if (!isUserLoggedIn()) {
        // Create login message container
        const loginMsg = document.createElement('div');
        loginMsg.style.cssText = 'margin:auto;text-align:center;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);padding:20px;border-radius:8px;width:80%;';
        
        // Create login message text
        const loginText = document.createElement('p');
        loginText.textContent = 'Please login before you can access it.';
        loginText.style.cssText = 'margin-bottom:16px;';
        
        // Create login button
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.style.cssText = 'background:#3B82F6;color:white;border:none;border-radius:6px;padding:8px 16px;font-weight:500;cursor:pointer;width:100%;';
        loginButton.onclick = function() {
          window.location.href = '/login';
        };
        
        // Assemble login message
        loginMsg.appendChild(loginText);
        loginMsg.appendChild(loginButton);
        messageArea.appendChild(loginMsg);
        
        // Create empty input area to maintain layout
        const inputArea = document.createElement('div');
        inputArea.style.cssText = 'padding:12px 16px;border-top:1px solid rgba(255,255,255,0.1);background:rgba(30,41,59,0.95);';
        
        // Assemble and add to page
        chatWindow.appendChild(header);
        chatWindow.appendChild(messageArea);
        chatWindow.appendChild(inputArea);
        document.body.appendChild(chatWindow);
        
        return;
      }
      
      // Add welcome message
      const welcomeMsg = document.createElement('div');
      welcomeMsg.style.cssText = 'align-self:flex-start;background:#475569;border-radius:14px;border-top-left-radius:4px;padding:10px 14px;max-width:85%;';
      welcomeMsg.textContent = "👋 Hi! I'm Mr. Happy. How can I help?";
      messageArea.appendChild(welcomeMsg);
      
      // Add previous messages if any
      messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = msg.sender === 'user' 
          ? 'align-self:flex-end;background:#3B82F6;border-radius:14px;border-top-right-radius:4px;padding:10px 14px;max-width:85%;'
          : 'align-self:flex-start;background:#475569;border-radius:14px;border-top-left-radius:4px;padding:10px 14px;max-width:85%;';
        msgDiv.textContent = msg.text;
        messageArea.appendChild(msgDiv);
      });
      
      // Create input area
      const inputArea = document.createElement('div');
      inputArea.style.cssText = 'padding:12px 16px;border-top:1px solid rgba(255,255,255,0.1);background:rgba(30,41,59,0.95);display:flex;gap:8px;';
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Type your message...';
      input.style.cssText = 'flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:10px 12px;color:white;outline:none;';
      
      const sendBtn = document.createElement('button');
      sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>';
      sendBtn.style.cssText = 'background:#3B82F6;border:none;width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:white;';
      
      // Handle sending messages
      function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'align-self:flex-end;background:#3B82F6;border-radius:14px;border-top-right-radius:4px;padding:10px 14px;max-width:85%;';
        userMsg.textContent = text;
        messageArea.appendChild(userMsg);
        
        // Save message
        messages.push({ sender: 'user', text });
        
        // Clear input
        input.value = '';
        
        // Show loading indicator
        const loadingMsg = document.createElement('div');
        loadingMsg.style.cssText = 'align-self:flex-start;background:#475569;border-radius:14px;border-top-left-radius:4px;padding:10px 14px;max-width:85%;';
        loadingMsg.textContent = 'Thinking...';
        messageArea.appendChild(loadingMsg);
        
        // Scroll to bottom
        messageArea.scrollTop = messageArea.scrollHeight;
        
        // Simulate API call
        setTimeout(async function() {
          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: [{ role: 'user', content: text }],
                options: { concise: true } // Request concise responses
              })
            });
            
            const data = await response.json();
            const botText = data.response || "Can't answer now.";
            
            // Remove loading message
            messageArea.removeChild(loadingMsg);
            
            // Add bot response
            const botMsg = document.createElement('div');
            botMsg.style.cssText = 'align-self:flex-start;background:#475569;border-radius:14px;border-top-left-radius:4px;padding:10px 14px;max-width:85%;';
            botMsg.textContent = botText;
            messageArea.appendChild(botMsg);
            
            // Save message
            messages.push({ sender: 'bot', text: botText });
            
            // Scroll to bottom
            messageArea.scrollTop = messageArea.scrollHeight;
          } catch (error) {
            // Remove loading message
            messageArea.removeChild(loadingMsg);
            
            // Add error message
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = 'align-self:flex-start;background:#EF4444;border-radius:14px;border-top-left-radius:4px;padding:10px 14px;max-width:85%;';
            errorMsg.textContent = "Connection error. Try again.";
            messageArea.appendChild(errorMsg);
            
            // Scroll to bottom
            messageArea.scrollTop = messageArea.scrollHeight;
          }
        }, 1000);
      }
      
      // Add event listeners
      sendBtn.addEventListener('click', sendMessage);
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
      });
      
      inputArea.appendChild(input);
      inputArea.appendChild(sendBtn);
      
      // Assemble and add to page
      chatWindow.appendChild(header);
      chatWindow.appendChild(messageArea);
      chatWindow.appendChild(inputArea);
      document.body.appendChild(chatWindow);
      
      // Focus input
      setTimeout(() => input.focus(), 100);
    });
  }
  
  // Initialize when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    // Give React time to load first
    setTimeout(initChat, 500);
  }
})(); 