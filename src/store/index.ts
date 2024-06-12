import { ChromeStorage } from 'chrome-extension-core';

export type QuickQueryData = {
  title: string;
  key: string;
  value: string;
}

export type StorageInfo = {
  quickQuery: QuickQueryData[];
};

export const defaultValue: StorageInfo = {
  quickQuery: [],
};

// 插件环境的全局storage
export const store = new ChromeStorage<StorageInfo>(
  chrome.storage?.local,
  defaultValue,
  {
    scope: 'changeQuery',
  }
);
