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
    color: #777777;
    padding: 5px;
  }

  .add {
    margin-left: 5px;
  }
</style>

<template>
  <section>
    <header>
      <h2>{{ i18n.allowedDomains }}</h2>
      <span>{{ i18n.allowedDomainsDescription }}</span>
    </header>
    <div>
      <ul class="domains" ref="domains">
        <li is="domain-component" v-for="(domain, index) in domains" :domain="domain" @delete="deleteDomain(index)"></li>
        <li class="domains__empty" v-if="domains.length === 0">{{ i18n.noDomains }}</li>
      </ul>
      <input type="text" placeholder="www.example.com" v-model.trim="newDomain" @keyup.enter="addDomain">
      <button class="add" @click="addDomain">{{ i18n.add }}</button>
    </div>
  </section>
</template>

<script>
import domainComponent from './domain.vue';
import DomainService from '../DomainService';

const clog = console.log.bind(console);
let domainService;

export default {
  components: { domainComponent },
  data() {
    return {
      domains: [],
      i18n: {
        allowedDomains: '',
        allowedDomainsDescription: '',
        noDomains: '',
        add: '',
      },
      newDomain: '',
    };
  },
  methods: {
    addDomain() {
      this.newDomain = DomainService.normalize(this.newDomain);
      if (this.newDomain && !this.domains.includes(this.newDomain)) {
        domainService.add(this.newDomain).then(() => {
          this.newDomain = '';
        }).catch(clog);
      }
    },
    deleteDomain(index) {
      domainService.deleteAt(index).catch(clog);
    },
  },
  mounted() {
    for (const key of Object.keys(this.i18n)) {
      this.i18n[key] = chrome.i18n.getMessage(`options__${key}`);
    }
    domainService = new DomainService(this.domains);
    domainService.restore().catch(clog);
  },
};
</script>
