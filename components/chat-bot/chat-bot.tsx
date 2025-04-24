"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "مرحباً! أنا المساعد الافتراضي لموقع معرض السيارات. كيف يمكنني مساعدتك اليوم؟",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call to get response
    setTimeout(() => {
      const responses = [
        "يمكنني مساعدتك في البحث عن سيارة تناسب احتياجاتك. هل تبحث عن سيارة جديدة أم مستعملة؟",
        "لدينا مجموعة متنوعة من السيارات الفاخرة. هل تفضل نوعاً معيناً من السيارات؟",
        "يمكنك تصفح المزادات النشطة حالياً من خلال قسم المزادات في الموقع.",
        "للمشاركة في المزادات، يجب عليك التسجيل في الموقع أولاً ثم تفعيل حسابك.",
        "نقدم خدمات ما بعد البيع وصيانة دورية لجميع السيارات المباعة من خلال معرضنا.",
        "يمكنك التواصل مع فريق المبيعات على الرقم 0555555555 أو من خلال صفحة اتصل بنا.",
      ]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-6 right-6 w-80 md:w-96 shadow-xl transition-all duration-300 z-50",
            isMinimized ? "h-14" : "h-[500px]",
          )}
        >
          <CardHeader
            className="py-3 px-4 flex flex-row items-center justify-between border-b cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/abstract-automotive-emblem.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm">مساعد معرض السيارات</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[calc(100%-110px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted max-w-[80%] rounded-lg px-3 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2 rtl:space-x-reverse">
                  <Input
                    placeholder="اكتب رسالتك هنا..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
