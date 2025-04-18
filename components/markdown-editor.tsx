"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, ImageIcon, Link, Heading1, Heading2, Heading3, FileText } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newValue = beforeText + prefix + selectedText + suffix + afterText
    onChange(newValue)

    // إعادة تعيين موضع المؤشر
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "bold":
        insertMarkdown("**", "**")
        break
      case "italic":
        insertMarkdown("*", "*")
        break
      case "h1":
        insertMarkdown("# ")
        break
      case "h2":
        insertMarkdown("## ")
        break
      case "h3":
        insertMarkdown("### ")
        break
      case "ul":
        insertMarkdown("- ")
        break
      case "ol":
        insertMarkdown("1. ")
        break
      case "link":
        insertMarkdown("[", "](https://example.com)")
        break
      case "image":
        insertMarkdown("![alt text](", ")")
        break
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-1 border-b">
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("bold")} title="تخثين">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("italic")} title="مائل">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h1")} title="عنوان 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h2")} title="عنوان 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("h3")} title="عنوان 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("ul")} title="قائمة نقطية">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("ol")} title="قائمة مرقمة">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("link")} title="رابط">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleToolbarAction("image")} title="صورة">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <Tabs
        defaultValue="write"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "write" | "preview")}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="write" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              كتابة
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              معاينة
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="write" className="p-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 focus-visible:ring-0 rounded-none resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 min-h-[200px] prose dark:prose-invert max-w-none">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">لا يوجد محتوى للمعاينة</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
