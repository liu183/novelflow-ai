/** 全局状态管理 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  Project,
  Inspiration,
  Character,
  Conversation,
  CreationPhase,
  SidebarPanel,
  Outline,
  Chapter,
  Scene,
  Notification,
} from "@/types";

interface AppStore {
  // 用户状态
  user: User | null;
  setUser: (user: User | null) => void;

  // 项目状态
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;

  // 创作阶段
  currentPhase: CreationPhase;
  setCurrentPhase: (phase: CreationPhase) => void;

  // AI对话
  activeAIConversation: Conversation | null;
  setActiveAIConversation: (conversation: Conversation | null) => void;

  // 侧边栏面板
  sidebarPanel: SidebarPanel;
  setSidebarPanel: (panel: SidebarPanel) => void;

  // 项目数据
  projectData: {
    inspirations: Inspiration[];
    characters: Character[];
    outline: Outline | null;
    chapters: Chapter[];
    scenes: Scene[];
  };
  setProjectData: (data: Partial<AppStore["projectData"]>) => void;

  // 灵感操作
  addInspiration: (inspiration: Inspiration) => void;
  updateInspiration: (id: string, data: Partial<Inspiration>) => void;
  removeInspiration: (id: string) => void;

  // 角色操作
  addCharacter: (character: Character) => void;
  updateCharacter: (id: string, data: Partial<Character>) => void;
  removeCharacter: (id: string) => void;

  // UI状态
  ui: {
    isLoading: boolean;
    activeModal: string | null;
    notifications: Notification[];
    theme: "light" | "dark";
  };
  setIsLoading: (loading: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void;
  removeNotification: (id: string) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // 用户状态
      user: null,
      setUser: (user) => set({ user }),

      // 项目状态
      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),

      // 创作阶段
      currentPhase: "inspiration",
      setCurrentPhase: (phase) => set({ currentPhase: phase }),

      // AI对话
      activeAIConversation: null,
      setActiveAIConversation: (conversation) =>
        set({ activeAIConversation: conversation }),

      // 侧边栏面板
      sidebarPanel: "projectInfo",
      setSidebarPanel: (panel) => set({ sidebarPanel: panel }),

      // 项目数据
      projectData: {
        inspirations: [],
        characters: [],
        outline: null,
        chapters: [],
        scenes: [],
      },
      setProjectData: (data) =>
        set((state) => ({
          projectData: { ...state.projectData, ...data },
        })),

      // 灵感操作
      addInspiration: (inspiration) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            inspirations: [...state.projectData.inspirations, inspiration],
          },
        })),
      updateInspiration: (id, data) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            inspirations: state.projectData.inspirations.map((insp) =>
              insp.id === id ? { ...insp, ...data } : insp
            ),
          },
        })),
      removeInspiration: (id) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            inspirations: state.projectData.inspirations.filter((insp) => insp.id !== id),
          },
        })),

      // 角色操作
      addCharacter: (character) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            characters: [...state.projectData.characters, character],
          },
        })),
      updateCharacter: (id, data) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            characters: state.projectData.characters.map((char) =>
              char.id === id ? { ...char, ...data } : char
            ),
          },
        })),
      removeCharacter: (id) =>
        set((state) => ({
          projectData: {
            ...state.projectData,
            characters: state.projectData.characters.filter((char) => char.id !== id),
          },
        })),

      // UI状态
      ui: {
        isLoading: false,
        activeModal: null,
        notifications: [],
        theme: "dark",
      },
      setIsLoading: (loading) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: loading },
        })),
      setActiveModal: (modal) =>
        set((state) => ({
          ui: { ...state.ui, activeModal: modal },
        })),
      addNotification: (notification) =>
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: [
              ...state.ui.notifications,
              {
                ...notification,
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
              },
            ],
          },
        })),
      removeNotification: (id) =>
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: state.ui.notifications.filter((n) => n.id !== id),
          },
        })),
      setTheme: (theme) =>
        set((state) => ({
          ui: { ...state.ui, theme },
        })),
    }),
    {
      name: "novelflow-app-storage",
      partialize: (state) => ({
        user: state.user,
        ui: {
          ...state.ui,
          notifications: [], // 不持久化通知
        },
      }),
    }
  )
);
