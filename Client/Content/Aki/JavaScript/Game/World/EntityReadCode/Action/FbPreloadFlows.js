"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreloadFlows = undefined;
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbPreloadFlows {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tc1 = false;
    this.ic1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPreloadFlows(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get FlowData() {
    if (!this.tc1) {
      this.tc1 = true;
      this.ic1 = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.flowData());
    }
    return this.ic1;
  }
}
exports.FbPreloadFlows = FbPreloadFlows;
//# sourceMappingURL=FbPreloadFlows.js.map