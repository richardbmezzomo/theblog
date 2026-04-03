"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  postContent?: string
}

export const MarkdownEditor = ({ postContent }: MarkdownEditorProps) => {
  const [content, setContent] = useState(postContent || "")
  return (
    <div className="grid grid-cols-2 gap-4 border h-full p-4">
      <div className="flex flex-col gap-1 overflow-hidden">
        <Label htmlFor="content" className="text-2xl pb-1">
          Markdown
        </Label>
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          autoCorrect="off"
          className="flex-1 resize-none overflow-y-auto"
        />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <Label className="text-2xl pb-1">Preview</Label>
        <div className="flex-1 border border-border rounded-lg p-4 overflow-y-auto">
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-semibold tracking-tight mt-10 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mt-8 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium mt-6 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="leading-7 mb-4 text-foreground/90">{children}</p>
              ),
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "")
                return match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
                    {children}
                  </code>
                )
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground my-4">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  {children}
                </ol>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content || "_Nothing to preview yet..._"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
