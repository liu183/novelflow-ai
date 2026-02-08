/** 侧边栏面板组件 */
import { useAppStore } from "@/stores/appStore";
import { ProjectInfoPanel } from "./ProjectInfoPanel";
import { InspirationsPanel } from "./InspirationsPanel";
import { CharactersPanel } from "./CharactersPanel";
import { OutlinePanel } from "./OutlinePanel";
import { ProgressPanel } from "./ProgressPanel";

export function SidebarPanel() {
  const { sidebarPanel, currentProject } = useAppStore();

  if (!currentProject) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>未选择项目</p>
      </div>
    );
  }

  switch (sidebarPanel) {
    case "projectInfo":
      return <ProjectInfoPanel />;
    case "inspirations":
      return <InspirationsPanel />;
    case "characters":
      return <CharactersPanel />;
    case "outline":
      return <OutlinePanel />;
    case "progress":
      return <ProgressPanel />;
    default:
      return <ProjectInfoPanel />;
  }
}
