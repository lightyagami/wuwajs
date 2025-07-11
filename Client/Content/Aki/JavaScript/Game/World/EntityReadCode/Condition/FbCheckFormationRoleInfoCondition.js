"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckFormationRoleInfoCondition = undefined;
const UnionCheckFormationRoleInfoHelper_1 = require("./UnionCheckFormationRoleInfoHelper");
class FbCheckFormationRoleInfoCondition {
  constructor(o) {
    this.FbDataInternal = o;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(o) {
    if (o) {
      return new FbCheckFormationRoleInfoCondition(o);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Option() {
    var o;
    var t;
    if (!this.s_h && (this.s_h = true, o = this.FbDataInternal.optionType(), t = UnionCheckFormationRoleInfoHelper_1.UnionCheckFormationRoleInfoHelper.GetUnionCheckFormationRoleInfoObject(o))) {
      this.Hye = UnionCheckFormationRoleInfoHelper_1.UnionCheckFormationRoleInfoHelper.ReadUnionCheckFormationRoleInfo(o, this.FbDataInternal.option(t));
    }
    return this.Hye;
  }
}
exports.FbCheckFormationRoleInfoCondition = FbCheckFormationRoleInfoCondition;
//# sourceMappingURL=FbCheckFormationRoleInfoCondition.js.map