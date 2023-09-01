const tokenItem = "token";

export const getToken = () => window.localStorage.getItem(tokenItem);

export const setToken = (token) =>
  window.localStorage.setItem(tokenItem, token);

export const clearToken = () => window.localStorage.clear(tokenItem);
