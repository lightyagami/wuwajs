"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionWithCenterText = undefined;
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbTeleportTransitionWithCenterText {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.evh = false;
    this.tvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionWithCenterText(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CenterTextFlow() {
    if (!this.evh) {
      this.evh = true;
      this.tvh = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.centerTextFlow());
    }
    return this.tvh;
  }
}
exports.FbTeleportTransitionWithCenterText = FbTeleportTransitionWithCenterText;
//# sourceMappingURL=FbTeleportTransitionWithCenterText.js.map