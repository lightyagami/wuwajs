"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTurntableControlComponent = undefined;
const UnionTurntableControllerHelper_1 = require("./UnionTurntableControllerHelper");
class FbTurntableControlComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTurntableControlComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    var t;
    var e;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), e = UnionTurntableControllerHelper_1.UnionTurntableControllerHelper.GetUnionTurntableControllerObject(t))) {
      this.TAe = UnionTurntableControllerHelper_1.UnionTurntableControllerHelper.ReadUnionTurntableController(t, this.FbDataInternal.config(e));
    }
    return this.TAe;
  }
}
exports.FbTurntableControlComponent = FbTurntableControlComponent;
//# sourceMappingURL=FbTurntableControlComponent.js.map