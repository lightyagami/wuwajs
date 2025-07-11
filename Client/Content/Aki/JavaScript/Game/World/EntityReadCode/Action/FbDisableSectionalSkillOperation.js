"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableSectionalSkillOperation = undefined;
const FbDisableExploreSkill_1 = require("./FbDisableExploreSkill");
class FbDisableSectionalSkillOperation {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.Dyh = false;
    this.Byh = undefined;
    this.Jyh = false;
    this.Zyh = undefined;
    this.Q5l = false;
    this.K5l = false;
  }
  static Create(i) {
    if (i) {
      return new FbDisableSectionalSkillOperation(i);
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
  get DisableExploreSkill() {
    if (!this.Jyh) {
      this.Jyh = true;
      this.Zyh = FbDisableExploreSkill_1.FbDisableExploreSkill.Create(this.FbDataInternal.disableExploreSkill());
    }
    return this.Zyh;
  }
  get DisableSkillWheel() {
    if (!this.Q5l) {
      this.Q5l = true;
      this.K5l = this.FbDataInternal.disableSkillWheel();
    }
    return this.K5l;
  }
}
exports.FbDisableSectionalSkillOperation = FbDisableSectionalSkillOperation;
//# sourceMappingURL=FbDisableSectionalSkillOperation.js.map