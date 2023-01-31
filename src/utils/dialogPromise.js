export default class DialogPromise {
  constructor() {
    this.resolve = null;
    this.reject = null;
  }

  start(fn) {
    if (fn) {
      fn();
    }
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  confirm() {
    if (this.resolve) {
      this.resolve();
    } else {
      return false;
    }
  }

  cancel() {
    if (this.reject) {
      this.reject();
    } else {
      return false;
    }
  }
}
