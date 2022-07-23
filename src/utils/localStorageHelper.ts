export const getDataLS = (key: string) => JSON.parse(window.localStorage.getItem(key) || '[]');

export const setDataLS = (key: string, data: {}) =>
  window.localStorage.setItem(key, JSON.stringify(data));
