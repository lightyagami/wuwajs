"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemoveFlowInteractOption = undefined;
const FbFlowIndex_1 = require("./FbFlowIndex");
class FbRemoveFlowInteractOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.F_h = false;
    this.N_h = undefined;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRemoveFlowInteractOption(t);
    }
  }
  get Flow() {
    if (!this.F_h) {
      this.F_h = true;
      this.N_h = FbFlowIndex_1.FbFlowIndex.Create(this.FbDataInternal.flow());
    }
    return this.N_h;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbRemoveFlowInteractOption = FbRemoveFlowInteractOption;
//# sourceMappingURL=FbRemoveFlowInteractOption.js.map