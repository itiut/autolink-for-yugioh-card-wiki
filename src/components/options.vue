<style scoped>
  .domains {
    border-radius: 3px;
    border: 1px solid #cccaca;
    list-style: none;
    max-height: 300px;
    min-height: 150px;
    overflow: auto;
    padding: 5px;
  }

  .domains__empty {
    color: rgb(119, 119, 119);
    padding: 5px;
  }

  .add {
    margin-left: 5px;
  }
</style>

<template>
  <section>
    <header>
      <h2>Allowed Domains</h2>
      <span>This extension runs in these sites.</span>
    </header>
    <div>
      <ul class="domains" ref="domains">
        <li is="domain-component" v-for="(domain, index) in domains" :domain="domain" @delete="deleteDomain(index)"></li>
        <li class="domains__empty" v-if="domains.length === 0">no domains</li>
      </ul>
      <input type="text" placeholder="www.example.com" v-model.trim="newDomain" @keyup.enter="addDomain">
      <button class="add" @click="addDomain">Add</button>
    </div>
  </section>
</template>

<script>
'use strict';

const domainComponent = require('./domain.vue');

function restoreDomains() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ allowedDomains: [] }, (obj) => {
      resolve(obj.allowedDomains);
    });
  });
}

function saveDomains(domains = []) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ allowedDomains: domains }, resolve);
  });
}

module.exports = {
  components: { domainComponent },
  data() {
    return {
      domains: [],
      newDomain: '',
    };
  },
  methods: {
    addDomain() {
      if (this.newDomain && !this.domains.includes(this.newDomain)) {
        this.domains.push(this.newDomain);
        this.newDomain = '';
        saveDomains(this.domains);
      }
    },
    deleteDomain(index) {
      this.domains.splice(index, 1);
      saveDomains(this.domains);
    },
  },
  mounted() {
    restoreDomains().then((domains) => {
      this.domains = domains;
    });
  },
};
</script>
