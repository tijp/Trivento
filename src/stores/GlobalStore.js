import { extendObservable } from 'mobx';

// Mobx store where some application wide variables are stored.
class GlobalStore {
  constructor() {
    extendObservable(this, {
      users: [],
      selectedUser: {},
      nameFilter: '',
      jobFilter: '',
      showModal: false,
    });
  }
}

export default new GlobalStore();
