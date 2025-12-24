"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageShare = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageShare extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.ShareType = 0;
    this.ShareRate = -0;
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    var t = t.ExtraEffectGrowParameters1;
    this.ShareType = Number(e[0] ?? 0);
    this.ShareRate = AbilityUtils_1.AbilityUtils.GetLevelValue(t, this.Level, 0) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
  }
  static ApplyBuffShare(t, e, r, i, s) {
    for (var [a, o] of this.GetShareRateMap(t, e)) {
      var a = EntitySystem_1.EntitySystem.Get(a);
      var h = a?.CheckGetComponent(1)?.ActorLocation;
      a?.CheckGetComponent(19)?.ExecuteBuffShareDamage({
        ...r,
        HitPosition: h
      }, i, o, s);
    }
  }
  OnExecute(t) {
    if (this.InstigatorEntityId === this.OwnerEntity.Id) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 19, "[DamageShare] Cannot Share damage to oneself.", ["entityId", this.InstigatorEntityId]);
      }
      return [undefined, 0];
    } else if (t) {
      if (this.IsShareable(t.CalculateType)) {
        return [this.InstigatorEntityId, this.ShareRate];
      } else {
        return undefined;
      }
    } else {
      return [undefined, 0];
    }
  }
  IsShareable(t) {
    switch (this.ShareType) {
      case 2:
        return t === 1;
      case 1:
        return t === 0;
      default:
        return true;
    }
  }
  static GetShareRateMap(t, e) {
    var r;
    var i;
    var s = t.GetComponent(183);
    var t = s.BuffEffectManager.FilterById(18);
    var a = new Map();
    for (const o of t) {
      if (o.Check({}, s) && ([r, i] = o.Execute(e), r !== undefined)) {
        a.set(r, i + (a.get(r) ?? 0));
      }
    }
    return a;
  }
}
exports.DamageShare = DamageShare;
//# sourceMappingURL=ExtraEffectDamageShare.js.map