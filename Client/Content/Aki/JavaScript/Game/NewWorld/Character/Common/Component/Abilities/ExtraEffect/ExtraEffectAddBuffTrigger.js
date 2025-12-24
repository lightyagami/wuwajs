"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddBuffTrigger = undefined;
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBuffTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
  constructor() {
    super(...arguments);
    this.BuffIds = [];
    this.InstigatorType = 2;
  }
  InitParameters(s) {
    s = s.ExtraEffectParameters;
    this.EventType = Number(s[0]);
    this.TargetType = Number(s[1]);
    this.BuffIds = s[2].split("#").map(s => Number(s));
    this.InstigatorType = Number(s[3] ?? 2);
  }
  OnExecute() {
    var s = this.GetEffectTarget();
    var e = this.GetTargetByType(this.InstigatorType);
    if (s) {
      var t = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
      if (t?.IsValid()) {
        for (const r of this.BuffIds) {
          s.AddIterativeBuff(r, t, undefined, true, `因为触发其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`, this.ExecuteContext?.BulletMessageId, e);
        }
      }
    }
  }
}
exports.AddBuffTrigger = AddBuffTrigger;
//# sourceMappingURL=ExtraEffectAddBuffTrigger.js.map