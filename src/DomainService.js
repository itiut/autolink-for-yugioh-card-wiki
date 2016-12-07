const domainsKey = Symbol('domains');

export default class DomainService {
  constructor(domains) {
    this[domainsKey] = domains;
  }

  static normalize(domain) {
    return domain;
  }

  static persist(domains = []) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ allowedDomains: domains }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }
        resolve();
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
    return DomainService.persist(this.domains.concat(domain)).then(() => {
      this.domains.push(domain);
    });
  }

  deleteAt(index) {
    const remainingDomains = this.domains.filter((_, i) => i !== index);
    return DomainService.persist(remainingDomains).then(() => {
      this.domains = remainingDomains;
    });
  }

  restore() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get({ allowedDomains: [] }, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }
        this.domains = items.allowedDomains;
        resolve();
      });
    });
  }
}
