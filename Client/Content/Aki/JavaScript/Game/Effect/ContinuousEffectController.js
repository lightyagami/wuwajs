"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContinuousEffectController = undefined;
const Info_1 = require("../../Core/Common/Info");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const SkeletalMeshEffectContext_1 = require("./EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("./EffectSystem");
const MAX_WAIT_CONTINUOUS_EFFECT_FRAME = 3;
class ContinuousEffectController {
  constructor() {
    this.QQ1 = new Map();
    this.KQ1 = new Map();
    this.XQ1 = new Set();
    this.YQ1 = new Set();
  }
  OnBeforeSpawnEffect(t) {
    var e;
    var s;
    if (Info_1.Info.IsGameRunning) {
      e = t.AnsSlotName;
      if (!FNameUtil_1.FNameUtil.IsNothing(e)) {
        if (t instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
          if ((t = t.SkeletalMeshComp)?.IsValid()) {
            if (this.QQ1.has(t) && (s = this.QQ1.get(t))?.has(e) && (s = s.get(e)) && this.KQ1.has(s)) {
              this.KQ1.set(s, MAX_WAIT_CONTINUOUS_EFFECT_FRAME - 1);
            }
          } else if (t) {
            this.QQ1.delete(t);
          }
        }
      }
    }
  }
  OnAfterSpawnEffect(t) {
    var e;
    var s;
    if (Info_1.Info.IsGameRunning && t && (s = t.GetContext())) {
      e = s.AnsSlotName;
      if (!FNameUtil_1.FNameUtil.IsNothing(e)) {
        if (s instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && (s = s.SkeletalMeshComp)?.IsValid()) {
          if (!this.QQ1.has(s)) {
            this.QQ1.set(s, new Map());
          }
          if (!this.QQ1.get(s)?.has(e)) {
            if (EffectSystem_1.EffectSystem.IsValid(t.Id)) {
              this.QQ1.get(s)?.set(e, t.Id);
            }
          }
        }
      }
    }
  }
  OnStopEffect(t) {
    if (Info_1.Info.IsGameRunning && t) {
      var e = t.GetContext();
      if (e) {
        var s = e.AnsSlotName;
        if (!FNameUtil_1.FNameUtil.IsNothing(s) && !this.KQ1.has(t.Id) && e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
          e = e.SkeletalMeshComp;
          if (e?.IsValid() && this.QQ1.has(e)) {
            e = this.QQ1.get(e);
            if (e?.has(s)) {
              if (e.get(s) === t.Id) {
                if (!this.KQ1.has(t.Id)) {
                  this.KQ1.set(t.Id, 0);
                }
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  OnPostTick(t) {
    for (const s of this.KQ1) {
      var e = s[1];
      if (++e > MAX_WAIT_CONTINUOUS_EFFECT_FRAME) {
        this.XQ1.add(s[0]);
      } else {
        this.KQ1.set(s[0], e);
      }
    }
    for (const f of this.XQ1) {
      EffectSystem_1.EffectSystem.StopEffectById(f, "[FContinuousEffectController]Wait Time Over", true);
    }
    this.XQ1.clear();
    for (const o of this.QQ1.keys()) {
      if (!o.IsValid()) {
        this.YQ1.add(o);
      }
    }
    for (const i of this.YQ1) {
      this.QQ1.delete(i);
    }
    this.YQ1.clear();
  }
  Clear() {
    for (const t of this.KQ1) {
      this.XQ1.add(t[0]);
    }
    for (const e of this.XQ1) {
      EffectSystem_1.EffectSystem.StopEffectById(e, "[FContinuousEffectController]Clear", true);
    }
    this.QQ1.clear();
    this.KQ1.clear();
    this.XQ1.clear();
  }
}
exports.ContinuousEffectController = ContinuousEffectController;
//# sourceMappingURL=ContinuousEffectController.js.map