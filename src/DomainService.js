const domainsKey = Symbol('domains');

export default class DomainService {
  constructor(domains) {
    this[domainsKey] = domains;
  }

  static addPermission(domain) {
    const origins = [`*://${domain}/`];
    return new Promise((resolve, reject) => {
      chrome.permissions.request({ origins }, (granted) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }
        if (!granted) {
          reject();
          return;
        }
        resolve();
      });
    });
  }

  static deletePermission(domain) {
    const origins = [`*://${domain}/`];
    return new Promise((resolve, reject) => {
      chrome.permissions.remove({ origins }, (removed) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }
        if (!removed) {
          reject();
          return;
        }
        resolve();
      });
    });
  }

  static normalize(domain) {
    return domain.replace(/^.*?:\/\//, '').split('/')[0];
  }

  static resetContentScript(domains = []) {
    const rule = {
      conditions: domains.map(domain => new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: domain },
      })),
      actions: [
        new chrome.declarativeContent.RequestContentScript({
          js: ['js/main.js'],
        }),
      ],
    };
    return new Promise((resolve, reject) => {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        if (domains.length === 0) {
          resolve();
          return;
        }
        chrome.declarativeContent.onPageChanged.addRules([rule], () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
            return;
          }
          resolve();
        });
      });
    });
  }

  get domains() {
    return this[domainsKey];
  }

  set domains(newDomains) {
    // Avoid re-assignment in favor of array.splice to trigger view updates
    this[domainsKey].splice(0, this.domains.length, ...newDomains);
  }

  add(domain) {
    return DomainService.addPermission(domain)
      .then(() => this.restore())
      .then(() => DomainService.resetContentScript(this.domains));
  }

  deleteAt(index) {
    return DomainService.deletePermission(this.domains[index])
      .then(() => this.restore())
      .then(() => DomainService.resetContentScript(this.domains));
  }

  restore() {
    return new Promise((resolve) => {
      chrome.permissions.getAll(({ origins = [] }) => {
        this.domains = origins.map(DomainService.normalize);
        resolve();
      });
    });
  }
}
