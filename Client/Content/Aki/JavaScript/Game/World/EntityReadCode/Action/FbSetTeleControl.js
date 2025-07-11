"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetTeleControl = undefined;
const UnionSetTeleControlConfigHelper_1 = require("./UnionSetTeleControlConfigHelper");
class FbSetTeleControl {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetTeleControl(e);
    }
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionSetTeleControlConfigHelper_1.UnionSetTeleControlConfigHelper.GetUnionSetTeleControlConfigObject(e))) {
      this.TAe = UnionSetTeleControlConfigHelper_1.UnionSetTeleControlConfigHelper.ReadUnionSetTeleControlConfig(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSetTeleControl = FbSetTeleControl;
//# sourceMappingURL=FbSetTeleControl.js.map