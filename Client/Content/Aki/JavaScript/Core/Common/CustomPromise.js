"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPromise = undefined;
class CustomPromise {
  constructor() {
    this.g8 = undefined;
    this.d8 = undefined;
    this.C8 = 0;
    this.g8 = new Promise(s => {
      this.d8 = s;
    });
  }
  get Promise() {
    return this.g8;
  }
  SetResult(s) {
    if (!this.IsFulfilled()) {
      this.C8 = 1;
      this.d8(s);
    }
  }
  IsFulfilled() {
    return this.C8 === 1;
  }
  IsPending() {
    return this.C8 === 0;
  }
}
exports.CustomPromise = CustomPromise;
//# sourceMappingURL=CustomPromise.js.map