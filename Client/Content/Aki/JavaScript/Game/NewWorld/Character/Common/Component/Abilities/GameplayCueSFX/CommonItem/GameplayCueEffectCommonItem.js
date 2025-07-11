"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueEffectCommonItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../../Core/Common/Log");
const EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../../../Effect/EffectSystem");
class GameplayCueEffectCommonItem {
  constructor(t, e, s) {
    this.OQt = t;
    this.TargetPosition = e;
    this.Paths = s;
    this.m$o = 0;
    this.ege = undefined;
    this.Lrt = true;
  }
  static Spawn(t, e, s) {
    t = new this(t, e, s);
    e = t.$Kl();
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      t.m$o = e;
      t.SetVisible(false);
      return t;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[GameplayCueEffectCommonItem]特效播放失败, 请检查资源路径", ["path", s]);
    }
  }
  Destroy() {
    this.ege = undefined;
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.m$o, "[GameplayCueEffectCommonItem.Destroy]", true);
    }
  }
  Refresh(t, e, s) {
    this.SetVisible(t);
    if (t) {
      if (e && s) {
        this.ege?.D_K2_SetActorLocationAndRotation(e.ToUeVector(), s.ToUeRotator(), false, undefined, true);
      } else {
        if (e) {
          this.ege?.D_K2_SetActorLocation(e.ToUeVector(), false, undefined, true);
        }
        if (s) {
          this.ege?.K2_SetActorRotation(s.ToUeRotator(), false);
        }
      }
    }
  }
  SetVisible(t) {
    if (this.Lrt !== t) {
      this.Lrt = t;
      this.ege?.SetActorHiddenInGame(!t);
    }
  }
  $Kl() {
    var t;
    if (this.Paths.length === 0) {
      return 0;
    } else {
      t = EffectSystem_1.EffectSystem.SpawnEffect(this.OQt, new UE.TransformDouble(this.TargetPosition), this.Paths[0], "[GameplayCueEffectCommonItem.CreateEffect]", new EffectContext_1.EffectContext(this.OQt.EntityId), 0);
      this.ege = EffectSystem_1.EffectSystem.GetEffectActor(t);
      return t;
    }
  }
}
exports.GameplayCueEffectCommonItem = GameplayCueEffectCommonItem;
//# sourceMappingURL=GameplayCueEffectCommonItem.js.map