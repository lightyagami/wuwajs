"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EffectContext = void 0;
const UE = require("ue");
class EffectContext {
  constructor(t = void 0, s = void 0, i = !1) {
    this.EntityId = void 0, this.SourceObject = void 0, this.DisablePostProcess = !1, this.CreateFromType = 0, this.PlayFlag = 0, this.HitEffectType = 0, this.mQ1 = void 0, this.EntityId = t, this.SourceObject = s, this.DisablePostProcess = i
  }
  get AnsSlotName() {
    return this.mQ1
  }
  set AnsSlotName(t) {
    1 === this.CreateFromType && (this.mQ1 = t)
  }
  ToKuroEffectContext(t) {
    t.EntityId = this.EntityId ?? 0, t.SourceObject = this.SourceObject, t.DisablePostProcess = this.DisablePostProcess, t.CreateFromType = this.CreateFromType, t.PlayFlag = this.PlayFlag, t.CreateFromBpEffectActor = this.SourceObject instanceof UE.BP_EffectActor_C, t.HitEffectType = this.HitEffectType, t.AnsSlotName = this.mQ1
  }
}
exports.EffectContext = EffectContext;
//# sourceMappingURL=EffectContext.js.map