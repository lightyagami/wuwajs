"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBehaviorFlowComponent = undefined;
const FbFlowInfo_1 = require("../Action/FbFlowInfo");
class FbBehaviorFlowComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.ogh = false;
    this.ngh = false;
    this.bUh = false;
    this.LUh = 0;
    this.AUh = false;
    this.xUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBehaviorFlowComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get InitStateId() {
    if (!this.bUh) {
      this.bUh = true;
      this.LUh = this.FbDataInternal.initStateId();
    }
    return this.LUh;
  }
  get FlowInfo() {
    if (!this.AUh) {
      this.AUh = true;
      this.xUh = FbFlowInfo_1.FbFlowInfo.Create(this.FbDataInternal.flowInfo());
    }
    return this.xUh;
  }
}
exports.FbBehaviorFlowComponent = FbBehaviorFlowComponent;
//# sourceMappingURL=FbBehaviorFlowComponent.js.map