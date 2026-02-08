/** 全局类型定义 */

// ========== 用户类型 ==========
export interface User {
  id: string;
  username: string;
  email: string;
  subscription_tier: "free" | "pro" | "team" | "enterprise";
  created_at: string;
  last_login?: string;
  preferences?: Record<string, any>;
}

// ========== 项目类型 ==========
export type ProjectStatus = "planning" | "writing" | "editing" | "completed";
export type StructureType = "three_act" | "hero_journey" | "mystery" | "romance";

export interface Project {
  id: string;
  user_id: string;
  title: string;
  genre?: string;
  target_word_count?: number;
  current_word_count: number;
  status: ProjectStatus;
  structure_type?: StructureType;
  created_at: string;
  updated_at: string;
  settings?: Record<string, any>;
}

// ========== 灵感类型 ==========
export type InspirationCategory = "has_head_tail" | "has_tail_only" | "no_head_no_tail";
export type InspirationStatus = "raw" | "developed" | "used";

export interface Inspiration {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  category: InspirationCategory;
  tags?: string[];
  status: InspirationStatus;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface ConflictOption {
  type: string;
  routine_element: string;
  abnormal_element: string;
  goal: string;
  obstacle: string;
  inescapable: string;
}

export interface ExpandedInspiration {
  analysis: {
    classification: InspirationCategory;
    core_elements: string[];
    potential_genres: string[];
  };
  conflict_options: ConflictOption[];
  perspectives: string[];
  core_questions: {
    theme?: string;
    goal?: string;
    obstacle?: string;
    stakes?: string;
  };
  next_steps: {
    recommended_step: string;
    reason: string;
  };
}

// ========== 角色类型 ==========
export type CharacterRoleType = "protagonist" | "antagonist" | "supporting" | "minor";

export interface Character {
  id: string;
  project_id: string;
  name: string;
  role_type: CharacterRoleType;
  profile?: CharacterProfile;
  relationships?: Record<string, any>;
  arc_data?: CharacterArc;
  created_at: string;
  updated_at: string;
}

export interface CharacterProfile {
  // 7要素
  repetitive_behavior?: {
    appearance?: string;
    signature_action?: string;
    speech_pattern?: string;
    first_impression?: string;
    memorable_trait?: string;
  };
  contrast_detail?: {
    outer_impression?: string;
    inner_reality?: string;
    manifestations?: string;
    reveal_scene?: string;
  };
  growth_trajectory?: {
    start_state?: string;
    fatal_flaw?: string;
    end_state?: string;
    transformation_process?: string;
    arc_type?: string;
  };
  unique_observation?: {
    worldview?: string;
    unique_angle?: string;
    monologue_style?: string;
    reactions?: string;
  };
  special_talent?: {
    special_ability?: string;
    personal_quirk?: string;
    memory_enhancement?: string;
    others_perception?: string;
  };
  real_flaw?: {
    core_flaw?: string;
    how_creates_trouble?: string;
    why_important?: string;
    will_overcome?: string;
  };
  strong_motivation?: {
    surface_motivation?: string;
    deep_motivation?: string;
    why_strong?: string;
    origin_story?: string;
  };
}

export interface CharacterArc {
  behavior_chain: string;
  goal_system: {
    big_goal?: string;
    mid_goals?: string[];
    short_goals?: string[];
  };
  obstacle_system: {
    external?: string;
    internal?: string;
    philosophical?: string;
  };
}

// ========== 对话类型 ==========
export type AIRoleType =
  | "inspiration_collector"
  | "structure_architect"
  | "character_designer"
  | "plot_weaver"
  | "dialogue_generator"
  | "scene_renderer"
  | "rhythm_adjuster"
  | "text_polisher"
  | "quality_inspector";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
  ai_role?: AIRoleType;
  metadata?: {
    model?: string;
    provider?: string;
    usage?: {
      input_tokens: number;
      output_tokens: number;
    };
  };
  structured_data?: Record<string, any>;
  timestamp?: string;
}

export interface Conversation {
  id: string;
  project_id: string;
  user_id: string;
  ai_role?: AIRoleType;
  messages: AIMessage[];
  context?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// ========== AI响应类型 ==========
export interface AIResponse {
  text: string;
  structured_data?: Record<string, any>;
  suggested_actions?: SuggestedAction[];
  metadata?: {
    model?: string;
    provider?: string;
    usage?: {
      input_tokens: number;
      output_tokens: number;
    };
  };
}

export interface SuggestedAction {
  type: string;
  label: string;
  description?: string;
  data?: Record<string, any>;
}

// ========== 质量分析类型 ==========
export interface QualityIssue {
  type: string;
  severity: "critical" | "important" | "optional";
  location?: string;
  description: string;
  suggestion: string;
}

export interface QualityScore {
  structure: number;
  character: number;
  plot: number;
  writing: number;
  total: number;
}

export interface QualityAnalysis {
  scores: QualityScore;
  issues: QualityIssue[];
  suggestions: string[];
  analyzed_at: string;
}

// ========== UI状态类型 ==========
export type CreationPhase =
  | "inspiration"
  | "structure"
  | "character"
  | "plot"
  | "content"
  | "rhythm"
  | "editing";

export type SidebarPanel =
  | "projectInfo"
  | "characters"
  | "outline"
  | "inspirations"
  | "progress"
  | "settings";

export interface AppState {
  user: User | null;
  currentProject: Project | null;
  currentPhase: CreationPhase;
  activeAIConversation: Conversation | null;
  sidebarPanel: SidebarPanel;

  projectData: {
    inspirations: Inspiration[];
    characters: Character[];
    outline: Outline | null;
    chapters: Chapter[];
    scenes: Scene[];
  };

  ui: {
    isLoading: boolean;
    activeModal: string | null;
    notifications: Notification[];
    theme: "light" | "dark";
  };
}

export interface Outline {
  acts: Act[];
  target_word_count: number;
}

export interface Act {
  act_number: number;
  title: string;
  percentage: number;
  word_count: number;
  key_points: string[];
}

export interface Chapter {
  id: string;
  project_id: string;
  chapter_number: number;
  title?: string;
  synopsis?: string;
  word_count: number;
  status: "planned" | "drafting" | "completed";
  target_word_count?: number;
  act_number?: number;
  sequence_in_act?: number;
  blueprint?: Record<string, any>;
}

export interface Scene {
  id: string;
  chapter_id: string;
  scene_number: number;
  title?: string;
  content?: string;
  word_count?: number;
  beats?: Record<string, any>;
  location?: string;
  characters?: string[];
  mood?: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
}
