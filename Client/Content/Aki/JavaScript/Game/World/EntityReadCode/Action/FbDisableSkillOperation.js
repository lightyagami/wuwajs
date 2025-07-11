"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableSkillOperation = undefined;
class FbDisableSkillOperation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Dyh = false;
    this.Byh = undefined;
    this.Q5l = false;
    this.K5l = false;
  }
  static Create(t) {
    if (t) {
      return new FbDisableSkillOperation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DisplayMode() {
    if (!this.Dyh) {
      this.Dyh = true;
      this.Byh = this.FbDataInternal.displayMode();
    }
    return this.Byh;
  }
  get DisableSkillWheel() {
    if (!this.Q5l) {
      this.Q5l = true;
      this.K5l = this.FbDataInternal.disableSkillWheel();
    }
    return this.K5l;
  }
}
exports.FbDisableSkillOperation = FbDisableSkillOperation;
//# sourceMappingURL=FbDisableSkillOperation.js.map