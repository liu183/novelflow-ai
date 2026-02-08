/** 结构化响应渲染器 */
import { ConflictOptionsCard } from "./ConflictOptionsCard";
import { CharacterCard } from "../shared/CharacterCard";

interface StructuredResponseRendererProps {
  data: Record<string, any>;
  onAction: (action: { type: string; data: any }) => void;
}

export function StructuredResponseRenderer({
  data,
  onAction,
}: StructuredResponseRendererProps) {
  if (!data) return null;

  return (
    <div className="my-4 space-y-4">
      {/* 冲突方案选择 */}
      {data.conflict_options && (
        <ConflictOptionsCard
          options={data.conflict_options}
          onSelect={(option) =>
            onAction({ type: "select_conflict", data: option })
          }
        />
      )}

      {/* 角色卡片 */}
      {data.character && <CharacterCard character={data.character} />}

      {/* 结构大纲 */}
      {data.outline && (
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-semibold mb-3">📋 故事大纲</h3>
          <div className="space-y-2 text-sm">
            {data.outline.acts?.map((act: any, index: number) => (
              <div key={index} className="p-3 bg-accent rounded">
                <div className="font-medium">
                  第{act.act_number}幕：{act.title}
                </div>
                <div className="text-muted-foreground mt-1">
                  {act.percentage}% - {act.word_count}字
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 建议操作 */}
      {data.suggested_actions && data.suggested_actions.length > 0 && (
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-semibold mb-3">💡 建议下一步</h3>
          <div className="space-y-2">
            {data.suggested_actions.map((action: any, index: number) => (
              <button
                key={index}
                onClick={() => onAction(action)}
                className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <div className="font-medium">{action.label}</div>
                {action.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
