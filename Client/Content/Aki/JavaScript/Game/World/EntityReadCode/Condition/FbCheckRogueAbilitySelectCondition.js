"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckRogueAbilitySelectCondition = undefined;
class FbCheckRogueAbilitySelectCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mdh = false;
    this.Cdh = 0;
    this.nJh = false;
    this.sJh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckRogueAbilitySelectCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BoardId() {
    if (!this.mdh) {
      this.mdh = true;
      this.Cdh = this.FbDataInternal.boardId();
    }
    return this.Cdh;
  }
  get IsReceived() {
    if (!this.nJh) {
      this.nJh = true;
      this.sJh = this.FbDataInternal.isReceived();
    }
    return this.sJh;
  }
}
exports.FbCheckRogueAbilitySelectCondition = FbCheckRogueAbilitySelectCondition;
//# sourceMappingURL=FbCheckRogueAbilitySelectCondition.js.map