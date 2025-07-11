"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerCanJoinActivityCondition = undefined;
const UnionCheckPlayerCanJoinActivityHelper_1 = require("./UnionCheckPlayerCanJoinActivityHelper");
class FbCheckPlayerCanJoinActivityCondition {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckPlayerCanJoinActivityCondition(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Config() {
    var i;
    var t;
    if (!this.bSh && (this.bSh = true, i = this.FbDataInternal.configType(), t = UnionCheckPlayerCanJoinActivityHelper_1.UnionCheckPlayerCanJoinActivityHelper.GetUnionCheckPlayerCanJoinActivityObject(i))) {
      this.TAe = UnionCheckPlayerCanJoinActivityHelper_1.UnionCheckPlayerCanJoinActivityHelper.ReadUnionCheckPlayerCanJoinActivity(i, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbCheckPlayerCanJoinActivityCondition = FbCheckPlayerCanJoinActivityCondition;
//# sourceMappingURL=FbCheckPlayerCanJoinActivityCondition.js.map