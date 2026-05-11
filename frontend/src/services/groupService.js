import api from "./api";

// pedir entrada no grupo
export const requestJoinGroup = (groupId) => {
  return api.post(`/groups/study-groups/${groupId}/join-request`);
};

// buscar status da solicitação
export const getJoinStatus = (groupId) => {
  return api.get(`/groups/study-groups/${groupId}/join-request-status`);
};