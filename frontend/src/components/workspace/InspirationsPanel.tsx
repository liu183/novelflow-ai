/** 灵感面板 */
import { useAppStore } from "@/stores/appStore";
import { Plus } from "lucide-react";

export function InspirationsPanel() {
  const { projectData } = useAppStore();
  const { inspirations } = projectData;

  return (
    <div className="p-4 space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">灵感素材</h3>
        <button className="p-1 rounded hover:bg-accent">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 灵感列表 */}
      <div className="space-y-2">
        {inspirations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            还没有灵感素材
          </p>
        ) : (
          inspirations.map((inspiration) => (
            <div
              key={inspiration.id}
              className="p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
            >
              <p className="text-sm line-clamp-2">{inspiration.content}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-background">
                  {inspiration.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {inspiration.tags?.join(", ") || ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
