module.exports = function ({ version = '0.0.1', isProduction = false, isHot = false, name = 'chrome-extension' }) {
  const enableInspectHeader = !isHot || isProduction;
  const config = {
    action: {
      default_popup: 'popup.html',
    },
    background: {
      service_worker: 'backgroundEntry.js',
    },
    icons: {
      "16": "icon/48.png",
      "32": "icon/48.png",
      "48": "icon/48.png",
      "128": "icon/128.png",
      "512": "icon/512.png"
    },
    description: 'chrome extension template',
    host_permissions: ['<all_urls>'],
    manifest_version: 3,
    name: isProduction ? name : `[development]${name}`,
    offline_enabled: true,
    options_page: 'options.html',
    permissions: [
      'tabs',
      'activeTab',
      'storage',
      'cookies',
      'scripting',
      'contextMenus',
      enableInspectHeader && 'declarativeNetRequest',
    ].filter(Boolean),
    version,
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['static/css/content/index.css'],
      },
    ],
  };

  if (!isHot || isProduction) {
    config.declarative_net_request = {
      rule_resources: [],
    };
  }

  return config;
};

