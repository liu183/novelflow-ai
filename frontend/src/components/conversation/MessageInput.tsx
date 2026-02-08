/** 消息输入框组件 */
import { useState, KeyboardEvent } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { clsx } from "clsx";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  disabled = false,
  placeholder = "输入你的想法...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-card p-4">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        {/* 附件按钮 */}
        <button
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          title="添加附件"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* 输入框 */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={clsx(
              "w-full resize-none rounded-2xl border bg-background px-4 py-3 pr-12",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[48px] max-h-[200px]"
            )}
            style={{
              height: "auto",
              minHeight: "48px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
          />

          {/* 字符计数 */}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {message.length} / 2000
          </div>
        </div>

        {/* 语音按钮 */}
        <button
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          title="语音输入"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* 发送按钮 */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={clsx(
            "p-3 rounded-xl transition-all",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          title="发送 (Enter)"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
