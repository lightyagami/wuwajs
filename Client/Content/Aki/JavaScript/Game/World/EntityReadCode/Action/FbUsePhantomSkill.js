"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUsePhantomSkill = undefined;
const FbSkillBlackboardVector_1 = require("./FbSkillBlackboardVector");
class FbUsePhantomSkill {
  constructor(t) {
    this.FbDataInternal = t;
    this.sbh = false;
    this.abh = undefined;
    this.hbh = false;
    this.lbh = undefined;
    this._bh = false;
    this.cbh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUsePhantomSkill(t);
    }
  }
  get SkillType() {
    if (!this.sbh) {
      this.sbh = true;
      this.abh = this.FbDataInternal.skillType();
    }
    return this.abh;
  }
  get BlackboardPos() {
    if (!this.hbh) {
      this.hbh = true;
      this.lbh = FbSkillBlackboardVector_1.FbSkillBlackboardVector.Create(this.FbDataInternal.blackboardPos());
    }
    return this.lbh;
  }
  get BlackboardRot() {
    if (!this._bh) {
      this._bh = true;
      this.cbh = FbSkillBlackboardVector_1.FbSkillBlackboardVector.Create(this.FbDataInternal.blackboardRot());
    }
    return this.cbh;
  }
}
exports.FbUsePhantomSkill = FbUsePhantomSkill;
//# sourceMappingURL=FbUsePhantomSkill.js.map