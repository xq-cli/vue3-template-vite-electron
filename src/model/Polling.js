export default class Polling {
  constructor(requestFn, resolveFn, rejectFn) {
    this.timer = null;
    this.status = "pending";
    this.requestFn = requestFn;
    this.resolveFn = resolveFn;
    this.rejectFn = rejectFn;
  }

  stop() {
    this.status = "canceled";
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  start(interval = 1000) {
    const step = () => {
      if (this.status === "canceled") return;
      this.requestFn()
        .then(
          (response) => {
            if (this.status === "canceled") return;
            this.status = "fulfilled";
            this.resolveFn(response);
          },
          (error) => {
            if (this.status === "canceled") return;
            this.status = "rejected";
            this.rejectFn(error);
          }
        )
        .then(() => {
          if (this.status === "canceled") return;
          this.status = "pending";
          this.timer = setTimeout(step, interval);
        });
    };
    step();
  }
}
