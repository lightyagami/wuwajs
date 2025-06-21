"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ContinuousEffectController = void 0;
const Info_1 = require("../../Core/Common/Info"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  SkeletalMeshEffectContext_1 = require("./EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("./EffectSystem"),
  MAX_WAIT_CONTINUOUS_EFFECT_FRAME = 3;
class ContinuousEffectController {
  constructor() {
    this._Q1 = new Map, this.uQ1 = new Map, this.cQ1 = new Set, this.dQ1 = new Set
  }
  OnBeforeSpawnEffect(t) {
    var e, s;
    Info_1.Info.IsGameRunning && (e = t.AnsSlotName, FNameUtil_1.FNameUtil.IsNothing(e) || t instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && ((t = t.SkeletalMeshComp)?.IsValid() ? this._Q1.has(t) && (s = this._Q1.get(t))?.has(e) && (s = s.get(e)) && this.uQ1.has(s) && this.uQ1.set(s, MAX_WAIT_CONTINUOUS_EFFECT_FRAME - 1) : t && this._Q1.delete(t)))
  }
  OnAfterSpawnEffect(t) {
    var e, s;
    Info_1.Info.IsGameRunning && t && (s = t.GetContext()) && (e = s.AnsSlotName, FNameUtil_1.FNameUtil.IsNothing(e) || s instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && (s = s.SkeletalMeshComp)?.IsValid() && (this._Q1.has(s) || this._Q1.set(s, new Map), this._Q1.get(s)?.has(e) || EffectSystem_1.EffectSystem.IsValid(t.Id) && this._Q1.get(s)?.set(e, t.Id)))
  }
  OnStopEffect(t) {
    if (Info_1.Info.IsGameRunning && t) {
      var e = t.GetContext();
      if (e) {
        var s = e.AnsSlotName;
        if (!FNameUtil_1.FNameUtil.IsNothing(s) && !this.uQ1.has(t.Id) && e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
          e = e.SkeletalMeshComp;
          if (e?.IsValid() && this._Q1.has(e)) {
            e = this._Q1.get(e);
            if (e?.has(s))
              if (e.get(s) === t.Id) return this.uQ1.has(t.Id) || this.uQ1.set(t.Id, 0), !0
          }
        }
      }
    }
    return !1
  }
  OnPostTick(t) {
    for (const s of this.uQ1) {
      var e = s[1];
      ++e > MAX_WAIT_CONTINUOUS_EFFECT_FRAME ? this.cQ1.add(s[0]) : this.uQ1.set(s[0], e)
    }
    for (const f of this.cQ1) EffectSystem_1.EffectSystem.StopEffectById(f, "[FContinuousEffectController]Wait Time Over", !0);
    this.cQ1.clear();
    for (const o of this._Q1.keys()) o.IsValid() || this.dQ1.add(o);
    for (const i of this.dQ1) this._Q1.delete(i);
    this.dQ1.clear()
  }
  Clear() {
    for (const t of this.uQ1) this.cQ1.add(t[0]);
    for (const e of this.cQ1) EffectSystem_1.EffectSystem.StopEffectById(e, "[FContinuousEffectController]Clear", !0);
    this._Q1.clear(), this.uQ1.clear(), this.cQ1.clear()
  }
}
exports.ContinuousEffectController = ContinuousEffectController;
//# sourceMappingURL=ContinuousEffectController.js.map