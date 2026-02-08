/** 角色面板 */
import { useAppStore } from "@/stores/appStore";
import { Plus } from "lucide-react";

export function CharactersPanel() {
  const { projectData } = useAppStore();
  const { characters } = projectData;

  return (
    <div className="p-4 space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">角色</h3>
        <button className="p-1 rounded hover:bg-accent">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 角色列表 */}
      <div className="space-y-2">
        {characters.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            还没有创建角色
          </p>
        ) : (
          characters.map((character) => (
            <div
              key={character.id}
              className="p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                  {character.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{character.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {character.role_type}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
