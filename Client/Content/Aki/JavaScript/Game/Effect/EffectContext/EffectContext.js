"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectContext = undefined;
const UE = require("ue");
class EffectContext {
  constructor(t = undefined, s = undefined, i = false) {
    this.EntityId = undefined;
    this.SourceObject = undefined;
    this.DisablePostProcess = false;
    this.CreateFromType = 0;
    this.PlayFlag = 0;
    this.HitEffectType = 0;
    this.zQ1 = undefined;
    this.EntityId = t;
    this.SourceObject = s;
    this.DisablePostProcess = i;
  }
  get AnsSlotName() {
    return this.zQ1;
  }
  set AnsSlotName(t) {
    if (this.CreateFromType === 1) {
      this.zQ1 = t;
    }
  }
  ToKuroEffectContext(t) {
    t.EntityId = this.EntityId ?? 0;
    t.SourceObject = this.SourceObject;
    t.DisablePostProcess = this.DisablePostProcess;
    t.CreateFromType = this.CreateFromType;
    t.PlayFlag = this.PlayFlag;
    t.CreateFromBpEffectActor = this.SourceObject instanceof UE.BP_EffectActor_C;
    t.HitEffectType = this.HitEffectType;
    t.AnsSlotName = this.zQ1;
  }
}
exports.EffectContext = EffectContext;
//# sourceMappingURL=EffectContext.js.map