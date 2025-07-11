"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCloseFlowTemplate = undefined;
const FbEndState_1 = require("./FbEndState");
class FbCloseFlowTemplate {
  constructor(t) {
    this.FbDataInternal = t;
    this.$Mh = false;
    this.XMh = false;
    this.D1_ = false;
    this.B1_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCloseFlowTemplate(t);
    }
  }
  get IsResetPosition() {
    if (!this.$Mh) {
      this.$Mh = true;
      this.XMh = this.FbDataInternal.isResetPosition();
    }
    return this.XMh;
  }
  get EndState() {
    if (!this.D1_) {
      this.D1_ = true;
      this.B1_ = FbEndState_1.FbEndState.Create(this.FbDataInternal.endState());
    }
    return this.B1_;
  }
}
exports.FbCloseFlowTemplate = FbCloseFlowTemplate;
//# sourceMappingURL=FbCloseFlowTemplate.js.map