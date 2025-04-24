"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/components/SessionProvider'
import { useRouter } from 'next/navigation'
import { Bot, X, Send, MessageSquare, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChatMessage } from '@/lib/chatbot-api'

export default function ChatBot() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when opening chat
  useEffect(() => {
    if (isOpen && inputRef.current && user) {
      inputRef.current.focus()
    }
  }, [isOpen, user])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!input.trim() || isLoading) return

    // For unauthenticated users, show login prompt and redirect
    if (!user) {
      setIsOpen(false)
      router.push('/login')
      return
    }

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call API to get response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          options: { concise: true } // Request concise responses
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Add assistant response
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ])
    } catch (error) {
      console.error('Error getting chat response:', error)
      // Add error message
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: "Connection error. Try again."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle opening the chat
  const handleOpenChat = () => {
    // Simply open the chat - login prompt will be shown inside if needed
    setIsOpen(true)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform"
        aria-label="Chat with Mr. Happy"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 w-[95%] max-w-md h-[450px] md:h-[500px] md:bottom-24 md:right-8 
                     bg-card/95 backdrop-blur-sm rounded-xl shadow-2xl border border-border/50 
                     flex flex-col z-50 overflow-hidden transition-opacity duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 ai-pulse">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Mr. Happy</h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                  Online • happycricket.com
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages container - show auth warning or messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!user && !loading ? (
              <div className="animate-fade-in">
                <Alert className="bg-primary/10 text-foreground border border-primary/30">
                  <AlertDescription className="text-center py-2">
                    Please log in to chat with Mr. Happy.
                  </AlertDescription>
                </Alert>
                <div className="mt-4 text-center">
                  <Button 
                    onClick={() => router.push('/login')}
                    className="bg-primary text-primary-foreground"
                  >
                    Login
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-6 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ai-pulse">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">Welcome to Mr. Happy</h3>
                    <p className="text-sm text-muted-foreground">
                      Your cricket assistant.
                      <br />How can I help?
                    </p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  >
                    <div 
                      className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-muted text-foreground rounded-tl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start animate-slide-up">
                    <div className="max-w-[85%] px-4 py-2 rounded-2xl bg-muted text-foreground rounded-tl-none">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input area - show if authenticated */}
          {user && (
            <form onSubmit={handleSubmit} className="p-4 border-t bg-card/90 backdrop-blur-sm">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cricket..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="bg-primary text-primary-foreground"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  )
} 