"use client"

import { useEffect } from 'react'
import ClientOnly from './client-only'
import ChatBot from './chat-bot'

export default function ChatBotWrapper() {
  useEffect(() => {
    console.log('ChatBotWrapper mounted');
  }, []);

  return (
    <ClientOnly>
      <ChatBot />
    </ClientOnly>
  )
} 