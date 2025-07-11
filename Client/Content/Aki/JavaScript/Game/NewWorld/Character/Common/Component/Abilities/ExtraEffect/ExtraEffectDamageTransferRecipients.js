"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageTransferRecipients = undefined;
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageTransferRecipients extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.XE1 = [];
  }
  InitParameters(e) {
    this.XE1 = e.ExtraEffectParameters[2].split("#").reduce((e, t) => {
      t = this.YE1(Number(t));
      if (t) {
        e.push(t);
      }
      return e;
    }, []);
  }
  YE1(e) {
    switch (e) {
      case 1:
        return this.OwnerEntity;
      case 0:
        return this.InstigatorEntity?.Entity;
      default:
        return;
    }
  }
  OnExecute() {
    return this.XE1;
  }
  GetDebugEffectString() {
    return `获取伤害结算属性传递对象列表：客户端逻辑-韧性${this.XE1} `;
  }
  static ApplyEffects(e) {
    var t = new Set();
    var r = e.GetComponent(174);
    var e = r?.BuffEffectManager;
    if (e) {
      for (const s of e.FilterById(77)) {
        if (s.Check({}, r)) {
          for (const i of s.Execute()) {
            t.add(i);
          }
        }
      }
    }
    return t;
  }
}
exports.DamageTransferRecipients = DamageTransferRecipients;
//# sourceMappingURL=ExtraEffectDamageTransferRecipients.js.map