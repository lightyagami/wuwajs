"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExecAlertSystemAction = undefined;
const UnionAlertSystemOptionHelper_1 = require("./UnionAlertSystemOptionHelper");
class FbExecAlertSystemAction {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExecAlertSystemAction(t);
    }
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionAlertSystemOptionHelper_1.UnionAlertSystemOptionHelper.GetUnionAlertSystemOptionObject(t))) {
      this.Hye = UnionAlertSystemOptionHelper_1.UnionAlertSystemOptionHelper.ReadUnionAlertSystemOption(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
  }
}
exports.FbExecAlertSystemAction = FbExecAlertSystemAction;
//# sourceMappingURL=FbExecAlertSystemAction.js.map