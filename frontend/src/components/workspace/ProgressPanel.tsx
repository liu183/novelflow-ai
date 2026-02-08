/** 进度面板 */
import { useAppStore } from "@/stores/appStore";
import { CheckCircle2, Circle } from "lucide-react";

export function ProgressPanel() {
  const { currentProject, currentPhase } = useAppStore();

  const phases = [
    { id: "inspiration" as const, name: "灵感开发", description: "收集和扩展创意" },
    { id: "structure" as const, name: "结构设计", description: "搭建故事框架" },
    { id: "character" as const, name: "角色塑造", description: "创建立体人物" },
    { id: "plot" as const, name: "情节编织", description: "设计故事情节" },
    { id: "content" as const, name: "内容创作", description: "撰写场景内容" },
    { id: "rhythm" as const, name: "节奏调整", description: "优化叙事节奏" },
    { id: "editing" as const, name: "修改打磨", description: "提升作品质量" },
  ];

  const getCurrentPhaseIndex = () => {
    return phases.findIndex((p) => p.id === currentPhase);
  };

  const currentIndex = getCurrentPhaseIndex();

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold">创作进度</h3>

      <div className="space-y-1">
        {phases.map((phase, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={phase.id}
              className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                isCurrent ? "bg-primary/10" : ""
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              ) : (
                <Circle
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isCurrent ? "text-primary" : ""
                  }`}
                >
                  {phase.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 整体进度 */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">整体进度</span>
          <span className="font-medium">
            {Math.round(((currentIndex + 1) / phases.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all"
            style={{
              width: `${((currentIndex + 1) / phases.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
