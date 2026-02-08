/** 大纲面板 */
import { useAppStore } from "@/stores/appStore";

export function OutlinePanel() {
  const { projectData } = useAppStore();
  const { outline } = projectData;

  if (!outline) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p className="text-sm">还没有创建大纲</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold">故事大纲</h3>

      <div className="space-y-3">
        {outline.acts.map((act) => (
          <div key={act.act_number} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">第{act.act_number}幕</span>
              <span className="text-xs text-muted-foreground">
                {act.percentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary rounded-full h-1.5"
                style={{ width: `${act.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{act.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
