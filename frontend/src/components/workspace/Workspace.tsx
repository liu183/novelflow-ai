/** 主工作台组件 */
import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import { WorkspaceNav } from "./WorkspaceNav";
import { ConversationArea } from "../conversation/ConversationArea";
import { SidebarPanel } from "./SidebarPanel";

export function Workspace() {
  const { currentProject, setCurrentProject, user, setIsLoading } = useAppStore();

  useEffect(() => {
    // TODO: 从URL或状态加载当前项目
    if (!currentProject) {
      // 可以显示项目选择器或创建新项目
      console.log("No project loaded");
    }
  }, [currentProject]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">欢迎使用 NovelFlow AI</h1>
          <p className="text-muted-foreground mb-6">
            选择一个项目或创建新项目开始创作
          </p>
          <button className="btn-primary">创建新项目</button>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace flex h-screen bg-background">
      {/* 左侧导航栏 */}
      <WorkspaceNav />

      {/* 中央对话区 */}
      <main className="flex-1 flex flex-col">
        <ConversationArea />
      </main>

      {/* 右侧辅助面板 */}
      <aside className="w-80 border-l bg-card">
        <SidebarPanel />
      </aside>
    </div>
  );
}
