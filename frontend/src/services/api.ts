/** API服务 */
import axios from "axios";
import type {
  Project,
  Inspiration,
  Character,
  ExpandedInspiration,
  Conversation,
  AIMessage,
  AIResponse,
  QualityAnalysis,
} from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：添加认证token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理错误
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========== 项目API ==========
export const projectAPI = {
  list: async () => {
    const response = await apiClient.get<Project[]>("/projects/");
    return response.data;
  },

  get: async (projectId: string) => {
    const response = await apiClient.get<Project>(`/projects/${projectId}`);
    return response.data;
  },

  create: async (data: { title: string; genre?: string; target_word_count?: number }) => {
    const response = await apiClient.post<Project>("/projects/", data);
    return response.data;
  },

  update: async (projectId: string, data: Partial<Project>) => {
    const response = await apiClient.put<Project>(`/projects/${projectId}`, data);
    return response.data;
  },

  delete: async (projectId: string) => {
    await apiClient.delete(`/projects/${projectId}`);
  },

  getOverview: async (projectId: string) => {
    const response = await apiClient.get(`/projects/${projectId}/overview`);
    return response.data;
  },
};

// ========== 灵感API ==========
export const inspirationAPI = {
  list: async (projectId: string) => {
    const response = await apiClient.get<Inspiration[]>("/inspirations/", {
      params: { project_id: projectId },
    });
    return response.data;
  },

  get: async (inspirationId: string) => {
    const response = await apiClient.get<Inspiration>(`/inspirations/${inspirationId}`);
    return response.data;
  },

  create: async (data: {
    project_id: string;
    content: string;
    tags?: string[];
    category?: string;
  }) => {
    const response = await apiClient.post<Inspiration>("/inspirations/", data);
    return response.data;
  },

  update: async (inspirationId: string, data: Partial<Inspiration>) => {
    const response = await apiClient.put<Inspiration>(
      `/inspirations/${inspirationId}`,
      data
    );
    return response.data;
  },

  delete: async (inspirationId: string) => {
    await apiClient.delete(`/inspirations/${inspirationId}`);
  },

  develop: async (inspirationId: string): Promise<ExpandedInspiration> => {
    const response = await apiClient.post<{ expanded: ExpandedInspiration }>(
      `/inspirations/${inspirationId}/develop`
    );
    return response.data.expanded;
  },
};

// ========== 角色API ==========
export const characterAPI = {
  list: async (projectId: string) => {
    const response = await apiClient.get<Character[]>("/characters/", {
      params: { project_id: projectId },
    });
    return response.data;
  },

  get: async (characterId: string) => {
    const response = await apiClient.get<Character>(`/characters/${characterId}`);
    return response.data;
  },

  create: async (data: {
    project_id: string;
    name: string;
    role_type: string;
  }) => {
    const response = await apiClient.post<Character>("/characters/", data);
    return response.data;
  },

  update: async (characterId: string, data: Partial<Character>) => {
    const response = await apiClient.put<Character>(
      `/characters/${characterId}`,
      data
    );
    return response.data;
  },

  delete: async (characterId: string) => {
    await apiClient.delete(`/characters/${characterId}`);
  },

  make3D: async (characterId: string) => {
    const response = await apiClient.post<Character>(`/characters/${characterId}/make-3d`);
    return response.data;
  },
};

// ========== 对话API ==========
export const conversationAPI = {
  list: async (projectId: string) => {
    const response = await apiClient.get<Conversation[]>("/conversations/", {
      params: { project_id: projectId },
    });
    return response.data;
  },

  get: async (conversationId: string) => {
    const response = await apiClient.get<Conversation>(
      `/conversations/${conversationId}`
    );
    return response.data;
  },

  create: async (data: { project_id: string; ai_role?: string }) => {
    const response = await apiClient.post<Conversation>("/conversations/", data);
    return response.data;
  },

  addMessage: async (
    conversationId: string,
    message: string,
    aiRole?: string
  ): Promise<{ message: AIMessage; suggested_actions?: any[] }> => {
    const response = await apiClient.post(`/conversations/${conversationId}/messages`, {
      message,
      ai_role: aiRole,
    });
    return response.data;
  },

  switchRole: async (conversationId: string, newRole: string) => {
    await apiClient.post(`/conversations/${conversationId}/switch-role`, {
      new_role: newRole,
    });
  },
};

// ========== AI服务API ==========
export const aiAPI = {
  chat: async (message: string, aiRole?: string): Promise<AIResponse> => {
    const response = await apiClient.post<AIResponse>("/ai/chat", {
      message,
      ai_role: aiRole,
    });
    return response.data;
  },

  generateInspirationExpansion: async (context: Record<string, any>) => {
    const response = await apiClient.post("/ai/generate/inspiration-expansion", {
      context,
    });
    return response.data;
  },

  generateCharacterProfile: async (context: Record<string, any>) => {
    const response = await apiClient.post("/ai/generate/character-profile", {
      context,
    });
    return response.data;
  },

  optimizeShowNotTell: async (content: string) => {
    const response = await apiClient.post("/ai/optimize/show-not-tell", {
      content,
    });
    return response.data;
  },

  optimizeDialogue: async (
    content: string,
    context: Record<string, any>
  ) => {
    const response = await apiClient.post("/ai/optimize/dialogue", {
      content,
      context,
    });
    return response.data;
  },

  analyzeQuality: async (request: {
    project_id?: string;
    content_type: string;
    entity_id?: string;
  }): Promise<QualityAnalysis> => {
    const response = await apiClient.post<QualityAnalysis>("/ai/analyze/quality", request);
    return response.data;
  },
};

export default apiClient;
