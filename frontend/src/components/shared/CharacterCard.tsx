/** 角色卡片组件 */
import { Character, CharacterProfile } from "@/types";
import { User, MapPin, Target, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "relationships" | "arc"
  >("profile");
  const profile = character.profile as CharacterProfile;

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {/* 卡片头部 */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{character.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                {character.role_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            档案
          </button>
          <button
            onClick={() => setActiveTab("relationships")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "relationships"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            关系
          </button>
          <button
            onClick={() => setActiveTab("arc")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "arc"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            成长
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {activeTab === "profile" && profile && (
          <div className="space-y-4">
            {/* 7要素展示 */}
            <div className="grid grid-cols-1 gap-3 text-sm">
              {profile.repetitive_behavior && (
                <div className="flex items-start gap-2 p-2 bg-accent rounded">
                  <span className="text-lg">🎭</span>
                  <div>
                    <div className="font-medium">第一印象</div>
                    <div className="text-muted-foreground">
                      {profile.repetitive_behavior.first_impression}
                    </div>
                  </div>
                </div>
              )}

              {profile.contrast_detail && (
                <div className="flex items-start gap-2 p-2 bg-accent rounded">
                  <span className="text-lg">🔄</span>
                  <div>
                    <div className="font-medium">反差细节</div>
                    <div className="text-muted-foreground">
                      外表：{profile.contrast_detail.outer_impression}
                    </div>
                    <div className="text-muted-foreground">
                      内在：{profile.contrast_detail.inner_reality}
                    </div>
                  </div>
                </div>
              )}

              {profile.strong_motivation && (
                <div className="flex items-start gap-2 p-2 bg-accent rounded">
                  <Target className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">核心动机</div>
                    <div className="text-muted-foreground">
                      {profile.strong_motivation.deep_motivation}
                    </div>
                  </div>
                </div>
              )}

              {profile.real_flaw && (
                <div className="flex items-start gap-2 p-2 bg-accent rounded">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">致命缺陷</div>
                    <div className="text-muted-foreground">
                      {profile.real_flaw.core_flaw}
                    </div>
                  </div>
                </div>
              )}

              {profile.special_talent && (
                <div className="flex items-start gap-2 p-2 bg-accent rounded">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">特殊特质</div>
                    <div className="text-muted-foreground">
                      {profile.special_talent.special_ability}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "relationships" && character.relationships && (
          <div className="space-y-2 text-sm">
            {Object.entries(character.relationships).map(([key, value]: [string, any]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-accent rounded">
                <span className="font-medium">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "arc" && character.arc_data && (
          <div className="space-y-3 text-sm">
            <div className="p-2 bg-accent rounded">
              <div className="font-medium mb-1">行为逻辑</div>
              <div className="text-muted-foreground">{character.arc_data.behavior_chain}</div>
            </div>
            {character.arc_data.goal_system && (
              <div className="p-2 bg-accent rounded">
                <div className="font-medium mb-1">目标体系</div>
                <div className="text-muted-foreground">
                  大目标：{character.arc_data.goal_system.big_goal}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
