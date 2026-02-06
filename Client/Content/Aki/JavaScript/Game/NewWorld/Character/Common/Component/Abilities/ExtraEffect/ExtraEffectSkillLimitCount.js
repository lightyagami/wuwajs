"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectSkillLimitCount = undefined;
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectSkillLimitCount extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.NXo = undefined;
    this.OXo = undefined;
    this.kXo = 0;
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.NXo = t[0].split("#");
    this.OXo = t[1].split("#").map(t => Number(t));
    if (Number(t[2] ?? 0) === 0) {
      this.kXo = 0;
    } else {
      this.kXo = 1;
    }
  }
  OnCreated() {
    var e = this.FXo().CheckGetComponent(220);
    for (let t = 0; t < this.NXo.length; t++) {
      var s = Number(this.NXo[t]);
      e.IsSkillInCd(s);
      e.SetLimitCount(s, this.OXo[t]);
    }
  }
  OnRemoved() {
    var t = this.FXo().CheckGetComponent(220);
    if (t) {
      for (const s of this.NXo) {
        var e = Number(s);
        t.IsSkillInCd(e);
        t.SetLimitCount(e);
      }
    }
  }
  OnExecute() {}
  FXo() {
    if (this.kXo !== 0) {
      return this.InstigatorEntity.Entity;
    } else {
      return this.OwnerEntity;
    }
  }
}
exports.ExtraEffectSkillLimitCount = ExtraEffectSkillLimitCount;
//# sourceMappingURL=ExtraEffectSkillLimitCount.js.map