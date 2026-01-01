export const API_ENDPOINTS = {
  // Analysis endpoints
  ANALYZE_PORTFOLIO: '/analysis/analyze',
  GET_ANALYSIS: (id: string) => `/analysis/${id}`,
  
  // Future endpoints
  // AUTH: {
  //   LOGIN: '/auth/login',
  //   LOGOUT: '/auth/logout',
  //   REFRESH: '/auth/refresh',
  // },
} as const;
