"use client"

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, MessageSquare, ChevronUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I\'m HappyCricket AI assistant. How can I help you with cricket insights today?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Scroll to the bottom of messages when new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return
    
    // Add user message with explicit role type
    const newMessages = [...messages, { role: 'user' as const, content: inputValue.trim() }]
    setMessages(newMessages)
    setInputValue('')
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "The match is scheduled to start at 3:00 PM IST tomorrow.",
        "India has a 65% win probability based on our AI analysis.",
        "Based on historical data, the average score on this pitch is 168 runs.",
        "Looking at recent performance, Virat Kohli is most likely to be the top scorer.",
        "Our AI predicts a close match with the team batting second having a slight advantage.",
        "According to our analysis, the best fantasy picks for today's match would be Rohit Sharma, Pat Cummins, and Jos Buttler.",
        "Weather conditions look favorable with a 10% chance of rain during the match."
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages([...newMessages, { role: 'assistant' as const, content: randomResponse }])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="bg-muted text-foreground p-3 rounded-lg flex items-center gap-1">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating button - Positioned for visibility on all devices */}
      <div className="fixed bottom-5 right-5 z-[30] md:bottom-8 md:right-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            className={`rounded-full shadow-xl video-container-glow ${isOpen ? 'bg-card hover:bg-card/90' : 'bg-primary hover:bg-primary/90'} 
                        w-16 h-16 md:w-16 md:h-16 flex items-center justify-center group`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <div className="relative flex items-center justify-center">
                <MessageSquare className="h-7 w-7 transition-transform group-hover:scale-110" />
                <div className="absolute w-5 h-5 -top-1 -right-1 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
            )}
          </Button>
        </motion.div>
        
        {/* Text bubble that appears above the button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-12 right-0 bg-card rounded-full py-2 px-4 shadow-lg border border-border text-xs font-medium whitespace-nowrap"
            >
              Ask me about cricket! <ChevronUp className="h-3 w-3 inline-block ml-1 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-5 w-[95%] max-w-md h-[350px] md:h-[400px] md:bottom-28 md:right-8 
                       bg-card/95 backdrop-blur-sm rounded-xl shadow-2xl border border-border/50 
                       flex flex-col z-[30] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 video-container-glow">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">HappyCricket AI</h3>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                    Online • Cricket Assistant
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-primary/10">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-background/50 backdrop-blur-sm">
              {messages.map((message, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mr-2 self-end mb-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-card text-foreground rounded-tl-none border border-border/50'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && <TypingIndicator />}
              
              <div ref={messageEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about cricket..."
                  className="flex-1 bg-background/50 backdrop-blur-sm border border-border/60 rounded-full px-4 py-2 text-sm 
                            focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-inner"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage} 
                  disabled={inputValue.trim() === ''} 
                  className="bg-primary rounded-full w-9 h-9 flex-shrink-0 hover:bg-primary/90 transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-2 px-2">
                Powered by HappyCricket AI • For cricket insights and predictions
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 