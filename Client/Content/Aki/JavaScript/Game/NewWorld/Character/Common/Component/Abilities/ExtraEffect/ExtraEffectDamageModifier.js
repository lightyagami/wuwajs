"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageModifier = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../../../Module/Abilities/FormationDataController");
const ExtraEffectSnapModifier_1 = require("./ExtraEffectSnapModifier");
class DamageModifier extends ExtraEffectSnapModifier_1.ModifierCalculator {
  constructor() {
    super(...arguments);
    this.Value = 0;
    this.ModifyTough = false;
    this.UpperBound = false;
    this._hf = 0;
    this.uhf = 0;
  }
  CheckAuthority() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  InitParameters(t) {
    var e;
    var t = t.ExtraEffectParameters;
    this.ModifyTough = !!t[3];
    if (this.ModifyTough && (this.CalculationPolicy = Number(t[3]), this.StackParam = [0], this.RefParam1 = Number(t[4] ?? 0), t[5] && (e = t[5].split("#").map(t => Number(t)), this.RefAttrId = e[0], this.RefTargetType = e[1], this.RefValueType = e[2], this.RefParam2 = e[3], this.uhf = e[4] ?? 0, this._hf = 0), t[6])) {
      e = t[6].split("#").map(t => Number(t));
      this.UpperBound = (e[2] ?? 0) === 1;
    }
  }
  OnExecute(t, e) {
    if (!this.ModifyTough || this._hf >= this.uhf && this.uhf > 0) {
      return -1;
    } else {
      t = this.CalculateValue(t);
      if (!this.UpperBound || t < e) {
        this._hf++;
        return t;
      } else {
        return e;
      }
    }
  }
  static chf(e, i, r) {
    if (e) {
      let t = undefined;
      for (const s of e.BuffEffectManager.FilterById(12)) {
        if (s.Check(r, i)) {
          t = s;
        }
      }
      return t;
    }
  }
  static dhf(t, e) {
    if (t && t.Buff && (!e || !e.Buff || t.Buff.CreateTimestamp > e.Buff.CreateTimestamp)) {
      return t;
    } else {
      return e;
    }
  }
  static ApplyEffects(t, e, i) {
    var r = e.Attacker.OwnerBuffComponent;
    var s = e.Target.OwnerBuffComponent;
    var s = this.chf(s, r, t);
    var a = FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(211);
    var a = this.chf(a, r, t);
    var r = this.dhf(s, a);
    if (r && (t = r.Execute(e, i)) >= 0) {
      return t;
    } else {
      return i;
    }
  }
}
(exports.DamageModifier = DamageModifier).TempModifiedResult = 0;
//# sourceMappingURL=ExtraEffectDamageModifier.js.map