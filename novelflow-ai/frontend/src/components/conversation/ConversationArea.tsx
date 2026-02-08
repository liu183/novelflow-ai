/** 对话区域组件 */
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import { useMutation } from "@tanstack/react-query";
import { aiAPI, conversationAPI } from "@/services/api";
import { Send, Loader2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { StructuredResponseRenderer } from "./StructuredResponseRenderer";
import { MessageInput } from "./MessageInput";
import type { AIMessage, AIRoleType } from "@/types";

const AI_ROLE_CONFIG: Record<
  AIRoleType,
  { name: string; emoji: string; description: string }
> = {
  inspiration_collector: { name: "灵感采集器", emoji: "💡", description: "捕捉和扩展创意灵感" },
  structure_architect: { name: "结构建筑师", emoji: "🏗️", description: "设计故事框架" },
  character_designer: { name: "角色塑造师", emoji: "👤", description: "创建立体角色" },
  plot_weaver: { name: "情节编织机", emoji: "🎬", description: "编织故事情节" },
  dialogue_generator: { name: "对话生成器", emoji: "💬", description: "创作高质量对话" },
  scene_renderer: { name: "场景渲染器", emoji: "🖼️", description: "营造场景氛围" },
  rhythm_adjuster: { name: "节奏调音师", emoji: "⏱️", description: "控制叙事节奏" },
  text_polisher: { name: "文字打磨匠", emoji: "✨", description: "润色文字" },
  quality_inspector: { name: "质检验收员", emoji: "🔍", description: "检查质量问题" },
};

export function ConversationArea() {
  const {
    currentProject,
    activeAIConversation,
    setActiveAIConversation,
    currentPhase,
    setIsLoading,
  } = useAppStore();

  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoadingLocal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 获取当前AI角色
  const getCurrentRole = (): AIRoleType => {
    const phaseToRole: Partial<Record<typeof currentPhase, AIRoleType>> = {
      inspiration: "inspiration_collector",
      structure: "structure_architect",
      character: "character_designer",
      plot: "plot_weaver",
      content: "scene_renderer",
      rhythm: "rhythm_adjuster",
      editing: "text_polisher",
    };
    return phaseToRole[currentPhase] || "inspiration_collector";
  };

  const currentRole = getCurrentRole();
  const roleConfig = AI_ROLE_CONFIG[currentRole];

  // 发送消息mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!currentProject) throw new Error("No project selected");

      // 如果没有活跃对话，创建一个
      let conversation = activeAIConversation;
      if (!conversation) {
        conversation = await conversationAPI.create({
          project_id: currentProject.id,
          ai_role: currentRole,
        });
        setActiveAIConversation(conversation);
      }

      // 发送消息
      const response = await conversationAPI.addMessage(
        conversation.id,
        message,
        currentRole
      );

      return response;
    },
    onSuccess: (data) => {
      // 添加用户消息
      const userMessage: AIMessage = {
        role: "user",
        content: data.message.content || "", // 这里的content应该是用户发送的消息
        timestamp: new Date().toISOString(),
      };

      // 添加AI响应消息
      const aiMessage: AIMessage = {
        role: "assistant",
        content: data.message.content,
        ai_role: currentRole,
        metadata: data.message.metadata,
        structured_data: data.message.structured_data,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, aiMessage]);
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
    onSettled: () => {
      setIsLoadingLocal(false);
    },
  });

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoadingLocal(true);
    sendMessageMutation.mutate(message);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* AI角色指示器 */}
      <header className="h-14 border-b bg-card px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{roleConfig.emoji}</span>
          <div>
            <h2 className="font-semibold">{roleConfig.name}</h2>
            <p className="text-xs text-muted-foreground">{roleConfig.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
            在线
          </span>
        </div>
      </header>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="text-4xl mb-4">{roleConfig.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">
                与{roleConfig.name}对话
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {roleConfig.description}，开始你的创作之旅吧！
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button
                  onClick={() =>
                    handleSendMessage(`我想开始${currentPhase === "inspiration" ? "记录" : "处理"}${currentPhase === "inspiration" ? "灵感" : ""}`)
                  }
                  className="p-3 rounded-lg border hover:bg-accent text-left"
                >
                  💡 开始新项目
                </button>
                <button
                  onClick={() => handleSendMessage("请介绍一下你的功能")}
                  className="p-3 rounded-lg border hover:bg-accent text-left"
                >
                  🎯 介绍功能
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index}>
                <MessageBubble message={message} />
                {/* 渲染结构化响应 */}
                {message.role === "assistant" &&
                  message.structured_data && (
                    <StructuredResponseRenderer
                      data={message.structured_data}
                      onAction={(action) => {
                        console.log("Action:", action);
                        // 处理建议的操作
                      }}
                    />
                  )}
              </div>
            ))}

            {/* 加载指示器 */}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI正在思考...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 输入框 */}
      <MessageInput
        onSend={handleSendMessage}
        disabled={isLoading}
        placeholder={
          currentPhase === "inspiration"
            ? "输入你的灵感片段..."
            : currentPhase === "structure"
            ? "讨论故事结构..."
            : currentPhase === "character"
            ? "创建或优化角色..."
            : "描述你的需求..."
        }
      />
    </div>
  );
}
