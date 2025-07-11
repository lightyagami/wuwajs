"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowIndex = undefined;
class FbFlowIndex {
  constructor(t) {
    this.FbDataInternal = t;
    this.V_h = false;
    this.j_h = undefined;
    this.H_h = false;
    this.W_h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFlowIndex(t);
    }
  }
  get FlowListName() {
    if (!this.V_h) {
      this.V_h = true;
      this.j_h = this.FbDataInternal.flowListName();
    }
    return this.j_h;
  }
  get FlowId() {
    if (!this.H_h) {
      this.H_h = true;
      this.W_h = this.FbDataInternal.flowId();
    }
    return this.W_h;
  }
}
exports.FbFlowIndex = FbFlowIndex;
//# sourceMappingURL=FbFlowIndex.js.map