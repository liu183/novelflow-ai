/** 工作区导航组件 */
import { useAppStore } from "@/stores/appStore";
import { clsx } from "clsx";
import {
  Lightbulb,
  Building2,
  Users,
  Clapperboard,
  PenTool,
  Clock,
  Wrench,
  LayoutDashboard,
  Database,
} from "lucide-react";

const navItems = [
  { id: "dashboard" as const, icon: LayoutDashboard, label: "仪表盘" },
  { id: "inspiration" as const, icon: Lightbulb, label: "灵感" },
  { id: "structure" as const, icon: Building2, label: "结构" },
  { id: "character" as const, icon: Users, label: "角色" },
  { id: "plot" as const, icon: Clapperboard, label: "场景" },
  { id: "content" as const, icon: PenTool, label: "内容" },
  { id: "rhythm" as const, icon: Clock, label: "节奏" },
  { id: "editing" as const, icon: Wrench, label: "修改" },
  { id: "knowledge" as const, icon: Database, label: "知识库" },
];

export function WorkspaceNav() {
  const { currentPhase, setCurrentPhase, sidebarPanel, setSidebarPanel } =
    useAppStore();

  return (
    <nav className="w-16 bg-card border-r flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">N</span>
        </div>
      </div>

      {/* 导航项 */}
      <div className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPhase === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPhase(item.id);
                // 根据选择的模块自动切换侧边栏
                if (item.id === "inspiration") {
                  setSidebarPanel("inspirations");
                } else if (item.id === "character") {
                  setSidebarPanel("characters");
                } else if (item.id === "structure") {
                  setSidebarPanel("outline");
                } else {
                  setSidebarPanel("projectInfo");
                }
              }}
              className={clsx(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-colors relative",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r" />
              )}
            </button>
          );
        })}
      </div>

      {/* 底部用户头像 */}
      <div className="mt-auto">
        <button className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </button>
      </div>
    </nav>
  );
}
