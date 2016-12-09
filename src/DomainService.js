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

  get domains() {
    return this[domainsKey];
  }

  set domains(newDomains) {
    // Avoid re-assignment in favor of array.splice to trigger view updates
    this[domainsKey].splice(0, this.domains.length, ...newDomains);
  }

  add(domain) {
    return DomainService.addPermission(domain)
      .then(() => this.restore());
  }

  deleteAt(index) {
    return DomainService.deletePermission(this.domains[index])
      .then(() => this.restore());
  }

  restore() {
    return new Promise((resolve, reject) => {
      chrome.permissions.getAll(({ origins = [] }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }
        this.domains = origins.map(DomainService.normalize);
        resolve();
      });
    });
  }
}
