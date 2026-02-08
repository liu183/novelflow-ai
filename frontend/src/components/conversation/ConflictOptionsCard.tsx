/** 冲突方案选择卡片 */
import { ConflictOption } from "@/types";

interface ConflictOptionsCardProps {
  options: ConflictOption[];
  onSelect: (option: ConflictOption) => void;
}

export function ConflictOptionsCard({
  options,
  onSelect,
}: ConflictOptionsCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 border">
      <h3 className="font-semibold mb-4">💥 冲突方案</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onSelect(option)}
            className="p-4 rounded-lg border-2 border-transparent hover:border-primary hover:bg-accent transition-all cursor-pointer group"
          >
            {/* 方案标题 */}
            <h4 className="font-semibold mb-3 group-hover:text-primary transition-colors">
              方案{String.fromCharCode(65 + index)}：{option.type}
            </h4>

            {/* 方案详情 */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground flex-shrink-0">日常：</span>
                <span>{option.routine_element}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-muted-foreground flex-shrink-0">反常：</span>
                <span>{option.abnormal_element}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-muted-foreground flex-shrink-0">目标：</span>
                <span>{option.goal}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-muted-foreground flex-shrink-0">阻碍：</span>
                <span>{option.obstacle}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-muted-foreground flex-shrink-0">困境：</span>
                <span>{option.inescapable}</span>
              </div>
            </div>

            {/* 选择提示 */}
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground group-hover:text-primary transition-colors">
              点击选择此方案 →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
