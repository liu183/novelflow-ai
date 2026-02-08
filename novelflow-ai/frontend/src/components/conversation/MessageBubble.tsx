/** 消息气泡组件 */
import { clsx } from "clsx";
import { Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AIMessage } from "@/types";

const AI_ROLE_EMOJIS: Record<string, string> = {
  inspiration_collector: "💡",
  structure_architect: "🏗️",
  character_designer: "👤",
  plot_weaver: "🎬",
  dialogue_generator: "💬",
  scene_renderer: "🖼️",
  rhythm_adjuster: "⏱️",
  text_polisher: "✨",
  quality_inspector: "🔍",
};

interface MessageBubbleProps {
  message: AIMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    if (message.content) {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={clsx(
        "flex gap-3 mb-6 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* AI头像 */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-xl">
            {AI_ROLE_EMOJIS[message.ai_role || "inspiration_collector"] || "🤖"}
          </div>
        </div>
      )}

      {/* 消息内容 */}
      <div
        className={clsx(
          "flex-1 max-w-[80%]",
          isUser && "flex flex-col items-end"
        )}
      >
        {/* AI角色名称 */}
        {!isUser && message.ai_role && (
          <div className="text-xs text-muted-foreground mb-1 ml-1">
            {message.ai_role
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        )}

        {/* 消息气泡 */}
        <div
          className={clsx(
            "rounded-2xl px-4 py-3 relative",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <ReactMarkdown
            className="prose prose-sm max-w-none"
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code: ({ children }) => (
                <code className="bg-background/50 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              ),
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            }}
          >
            {message.content}
          </ReactMarkdown>

          {/* Token使用量 */}
          {message.metadata?.usage && (
            <div className="text-xs opacity-60 mt-2 pt-2 border-t border-current/20">
              {message.metadata.usage.input_tokens} → {message.metadata.usage.output_tokens} tokens
            </div>
          )}
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className={clsx(
            "opacity-0 group-hover:opacity-100 transition-opacity mt-1",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {copied ? (
            <CheckCheck className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
