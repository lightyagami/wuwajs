"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowComponent = undefined;
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbFlowComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.wAh = false;
    this.PAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFlowComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InitState() {
    if (!this.wAh) {
      this.wAh = true;
      this.PAh = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.initState());
    }
    return this.PAh;
  }
}
exports.FbFlowComponent = FbFlowComponent;
//# sourceMappingURL=FbFlowComponent.js.map