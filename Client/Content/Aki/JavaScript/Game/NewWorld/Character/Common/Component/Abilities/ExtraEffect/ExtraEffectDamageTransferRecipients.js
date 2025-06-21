"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DamageTransferRecipients = void 0;
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageTransferRecipients extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), this.IE1 = []
  }
  InitParameters(e) {
    this.IE1 = e.ExtraEffectParameters[2].split("#").reduce((e, t) => {
      t = this.TE1(Number(t));
      return t && e.push(t), e
    }, [])
  }
  TE1(e) {
    switch (e) {
      case 1:
        return this.OwnerEntity;
      case 0:
        return this.InstigatorEntity?.Entity;
      default:
        return
    }
  }
  OnExecute() {
    return this.IE1
  }
  GetDebugEffectString() {
    return `获取伤害结算属性传递对象列表：客户端逻辑-韧性${this.IE1} `
  }
  static ApplyEffects(e) {
    var t = new Set,
      r = e.GetComponent(174),
      e = r?.BuffEffectManager;
    if (e)
      for (const s of e.FilterById(77))
        if (s.Check({}, r))
          for (const i of s.Execute()) t.add(i);
    return t
  }
}
exports.DamageTransferRecipients = DamageTransferRecipients;
//# sourceMappingURL=ExtraEffectDamageTransferRecipients.js.map