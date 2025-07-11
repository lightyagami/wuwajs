"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayFlow = undefined;
class FbPlayFlow {
  constructor(t) {
    this.FbDataInternal = t;
    this.V_h = false;
    this.j_h = undefined;
    this.H_h = false;
    this.W_h = 0;
    this.Q_h = false;
    this.K_h = 0;
    this.$_h = false;
    this.X_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayFlow(t);
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
  get StateId() {
    if (!this.Q_h) {
      this.Q_h = true;
      this.K_h = this.FbDataInternal.stateId();
    }
    return this.K_h;
  }
  get FlowGuid() {
    if (!this.$_h) {
      this.$_h = true;
      this.X_h = this.FbDataInternal.flowGuid();
    }
    return this.X_h;
  }
}
exports.FbPlayFlow = FbPlayFlow;
//# sourceMappingURL=FbPlayFlow.js.map