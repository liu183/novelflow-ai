/** 项目信息面板 */
import { useAppStore } from "@/stores/appStore";
import { BookOpen, Target, TrendingUp, Calendar } from "lucide-react";

export function ProjectInfoPanel() {
  const { currentProject } = useAppStore();

  if (!currentProject) return null;

  const progress = currentProject.target_word_count
    ? Math.round((currentProject.current_word_count / currentProject.target_word_count) * 100)
    : 0;

  return (
    <div className="p-4 space-y-4">
      {/* 项目标题 */}
      <div>
        <h2 className="font-semibold text-lg mb-1">{currentProject.title}</h2>
        <p className="text-sm text-muted-foreground">
          {currentProject.genre || "未设置类型"}
        </p>
      </div>

      {/* 项目状态 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">状态</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
            {currentProject.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">结构类型</span>
          <span>{currentProject.structure_type || "未设置"}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">创建时间</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(currentProject.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 字数统计 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">字数统计</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {currentProject.current_word_count.toLocaleString()}
          </span>
          <span className="text-muted-foreground">/ {currentProject.target_word_count?.toLocaleString() || "∞"}</span>
        </div>
        {/* 进度条 */}
        {currentProject.target_word_count && (
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
        <div className="text-xs text-muted-foreground text-right">
          {progress}% 完成
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="pt-4 border-t space-y-2">
        <button className="w-full p-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          继续写作
        </button>
        <button className="w-full p-2 text-sm rounded-lg border hover:bg-accent transition-colors">
          查看大纲
        </button>
      </div>
    </div>
  );
}
