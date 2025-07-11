"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageImmune = undefined;
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageImmune extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.MXo = new Array(7);
  }
  InitParameters(e) {
    for (const r of e.ExtraEffectParameters) {
      var t = Number(r);
      this.MXo[t] = true;
    }
  }
  OnExecute(e) {
    return this.MXo[e.Element];
  }
  static ApplyEffects(e, t, r) {
    var s = r.Attacker.OwnerBuffComponent;
    for (const a of r.Target.OwnerBuffComponent.BuffEffectManager.FilterById(20)) {
      if (a.Check(e, s) && a.Execute(t)) {
        return true;
      }
    }
    return false;
  }
}
exports.DamageImmune = DamageImmune;
//# sourceMappingURL=ExtraEffectDamageImmune.js.map