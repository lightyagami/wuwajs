"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerSkillReadyCondition = undefined;
const UnionSkillReadyOptionHelper_1 = require("./UnionSkillReadyOptionHelper");
class FbCheckPlayerSkillReadyCondition {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.Gyh = false;
    this.Oyh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckPlayerSkillReadyCondition(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SkillOption() {
    var i;
    var t;
    if (!this.Gyh && (this.Gyh = true, i = this.FbDataInternal.skillOptionType(), t = UnionSkillReadyOptionHelper_1.UnionSkillReadyOptionHelper.GetUnionSkillReadyOptionObject(i))) {
      this.Oyh = UnionSkillReadyOptionHelper_1.UnionSkillReadyOptionHelper.ReadUnionSkillReadyOption(i, this.FbDataInternal.skillOption(t));
    }
    return this.Oyh;
  }
}
exports.FbCheckPlayerSkillReadyCondition = FbCheckPlayerSkillReadyCondition;
//# sourceMappingURL=FbCheckPlayerSkillReadyCondition.js.map