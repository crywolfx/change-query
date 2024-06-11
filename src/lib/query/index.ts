import queryString from 'query-string';

export const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  return currentTab;
};

export const setCurrentTabUrl = async (url: string) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  if (currentTab.id) {
    return chrome.tabs.update(currentTab.id, {
      url,
    });
  }
  return Promise.reject();
};

export const parseQuery = (url: string) => {
  try {
    const search = new URL(url).search;
    return queryString.parse(search);
  } catch (error) {
    return null;
  }
};
