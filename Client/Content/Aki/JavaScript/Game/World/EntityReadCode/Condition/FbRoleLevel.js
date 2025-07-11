"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRoleLevel = undefined;
const UnionRoleLevelHelper_1 = require("./UnionRoleLevelHelper");
class FbRoleLevel {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRoleLevel(e);
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
    var e;
    var t;
    if (!this.s_h && (this.s_h = true, e = this.FbDataInternal.optionType(), t = UnionRoleLevelHelper_1.UnionRoleLevelHelper.GetUnionRoleLevelObject(e))) {
      this.Hye = UnionRoleLevelHelper_1.UnionRoleLevelHelper.ReadUnionRoleLevel(e, this.FbDataInternal.option(t));
    }
    return this.Hye;
  }
}
exports.FbRoleLevel = FbRoleLevel;
//# sourceMappingURL=FbRoleLevel.js.map