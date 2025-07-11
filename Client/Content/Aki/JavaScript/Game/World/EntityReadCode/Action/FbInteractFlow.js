"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractFlow = undefined;
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbInteractFlow {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.F_h = false;
    this.N_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractFlow(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Flow() {
    if (!this.F_h) {
      this.F_h = true;
      this.N_h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.flow());
    }
    return this.N_h;
  }
}
exports.FbInteractFlow = FbInteractFlow;
//# sourceMappingURL=FbInteractFlow.js.map