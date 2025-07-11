"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSkillDamage = undefined;
class FbSkillDamage {
  constructor(t) {
    this.FbDataInternal = t;
    this.I3h = false;
    this.T3h = 0;
    this.b3h = false;
    this.L3h = 0;
    this.A3h = false;
    this.x3h = 0;
    this.R3h = false;
    this.w3h = 0;
    this.P3h = false;
    this.U3h = 0;
    this.D3h = false;
    this.B3h = 0;
    this.q3h = false;
    this.k3h = 0;
    this.G3h = false;
    this.O3h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSkillDamage(t);
    }
  }
  get DefaultValue() {
    if (!this.I3h) {
      this.I3h = true;
      this.T3h = this.FbDataInternal.defaultValue();
    }
    return this.T3h;
  }
  get NormalAttack() {
    if (!this.b3h) {
      this.b3h = true;
      this.L3h = this.FbDataInternal.normalAttack();
    }
    return this.L3h;
  }
  get AccumulatorAttack() {
    if (!this.A3h) {
      this.A3h = true;
      this.x3h = this.FbDataInternal.accumulatorAttack();
    }
    return this.x3h;
  }
  get SuperSkill() {
    if (!this.R3h) {
      this.R3h = true;
      this.w3h = this.FbDataInternal.superSkill();
    }
    return this.w3h;
  }
  get QteAttack() {
    if (!this.P3h) {
      this.P3h = true;
      this.U3h = this.FbDataInternal.qteAttack();
    }
    return this.U3h;
  }
  get NormalSkill() {
    if (!this.D3h) {
      this.D3h = true;
      this.B3h = this.FbDataInternal.normalSkill();
    }
    return this.B3h;
  }
  get FightVersion() {
    if (!this.q3h) {
      this.q3h = true;
      this.k3h = this.FbDataInternal.fightVersion();
    }
    return this.k3h;
  }
  get ExploreVersion() {
    if (!this.G3h) {
      this.G3h = true;
      this.O3h = this.FbDataInternal.exploreVersion();
    }
    return this.O3h;
  }
}
exports.FbSkillDamage = FbSkillDamage;
//# sourceMappingURL=FbSkillDamage.js.map