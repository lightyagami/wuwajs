"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerCountConfig = undefined;
class FbTriggerCountConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.p2h = false;
    this.v2h = 0;
    this.y2h = false;
    this.S2h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerCountConfig(t);
    }
  }
  get TriggerCount() {
    if (!this.p2h) {
      this.p2h = true;
      this.v2h = this.FbDataInternal.triggerCount();
    }
    return this.v2h;
  }
  get TriggerInterval() {
    if (!this.y2h) {
      this.y2h = true;
      this.S2h = this.FbDataInternal.triggerInterval();
    }
    return this.S2h;
  }
}
exports.FbTriggerCountConfig = FbTriggerCountConfig;
//# sourceMappingURL=FbTriggerCountConfig.js.map