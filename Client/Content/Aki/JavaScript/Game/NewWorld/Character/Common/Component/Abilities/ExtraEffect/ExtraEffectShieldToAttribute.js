"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertShieldAttribute = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ConvertShieldAttribute extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.UXo = undefined;
    this.AXo = 0;
    this.ine = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.PXo = 0;
    this.xXo = 0;
    this.wXo = 0;
    this.BXo = 0;
    this.bXo = 0;
    this.OQo = undefined;
    this.u$e = t => {
      this.qXo();
      this.GXo();
    };
  }
  InitParameters(t) {
    var i = t.ExtraEffectParameters;
    this.UXo = Number(i[0]);
    this.AXo = Number(i[1]);
    this.ine = Number(i[2]);
    this.PXo = Number(i[3]);
    this.xXo = Number(i[4]);
    this.wXo = Number(i[5]);
    this.BXo = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters1, this.Level, 0);
    this.bXo = AbilityUtils_1.AbilityUtils.GetLevelValue(t.ExtraEffectGrowParameters2, this.Level, 0);
  }
  OnExecute() {}
  OnCreated() {
    EventSystem_1.EventSystem.AddWithTarget(this.OwnerEntity, EventDefine_1.EEventName.CharShieldChange, this.u$e);
    this.GXo();
  }
  GXo() {
    var e = this.UXo ? this.InstigatorEntity?.Entity : this.OwnerEntity;
    if (e) {
      var s;
      var e = e.CheckGetComponent(78);
      var h = this.OwnerEntity?.CheckGetComponent(182);
      var e = e?.GetShieldValue(this.AXo) ?? 0;
      let t = e >= this.xXo;
      let i = e;
      if (this.wXo > 0) {
        i = Math.min(i, this.wXo);
      }
      e = (i = this.PXo > 0 && (s = h?.GetCurrentValue(this.PXo) ?? 0, t = e >= s * this.xXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, this.wXo > 0) ? Math.min(e, s * this.wXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) : i) * this.bXo * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + this.BXo;
      if (t && e !== 0) {
        this.OQo = h?.AddModifier(this.ine ?? 0, {
          Type: 0,
          Value1: e
        });
      }
    }
  }
  qXo() {
    if (this.OQo && (this.UXo ? this.InstigatorEntity?.Entity : this.OwnerEntity)) {
      this.OwnerEntity?.CheckGetComponent(182)?.RemoveModifier(this.ine ?? 0, this.OQo);
      this.OQo = undefined;
    }
  }
  OnRemoved() {
    if (this.OwnerEntity) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.OwnerEntity, EventDefine_1.EEventName.CharShieldChange, this.u$e);
    }
    this.qXo();
  }
}
exports.ConvertShieldAttribute = ConvertShieldAttribute;
//# sourceMappingURL=ExtraEffectShieldToAttribute.js.map