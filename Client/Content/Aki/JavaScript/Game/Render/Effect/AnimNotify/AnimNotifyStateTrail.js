"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateTrail extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.TrailingConfigData = undefined;
    this.UseWeapon = false;
    this.WeaponCaseIndex = 0;
    this.Handle = 0;
  }
  Constructor() {
    this.Handle = 0;
  }
  K2_ValidateAssets() {
    return true;
  }
  K2_NotifyBegin(t, e, i) {
    this.Handle = 0;
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 25, "拖尾特效传入空参数", ["动画", e]);
      }
      return false;
    }
    if (!this.TrailingConfigData) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 25, "拖尾特效缺失配置", ["动画", e.GetName()]);
      }
      return false;
    }
    let r = t;
    if (this.UseWeapon) {
      var s = "WeaponCase" + this.WeaponCaseIndex;
      var f = t.GetOwner().K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let e = false;
      for (let t = 0; t < f.Num(); t++) {
        if (f.Get(t).GetName() === s) {
          r = f.Get(t);
          e = true;
          break;
        }
      }
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 25, "AnimNotifyStateTrail未找到武器");
        }
        return false;
      }
    }
    var e = r.GetOwner();
    var o = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
    if (e instanceof TsBaseCharacter_1.default && e.CharacterActorComponent?.Entity) {
      o.EntityId = e.CharacterActorComponent?.Entity.Id;
    }
    o.SourceObject = r.GetOwner();
    o.SkeletalMeshComp = r;
    this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(e, t.D_K2_GetComponentToWorld(), this.TrailingConfigData.ToAssetPathName(), "[AnimNotifyStateTrail.K2_NotifyBegin]", o, 3, undefined);
    return !!EffectSystem_1.EffectSystem.IsValid(this.Handle) && (EffectSystem_1.EffectSystem.SetEffectNotRecord(this.Handle, true), true);
  }
  K2_NotifyEnd(t, e) {
    return !!EffectSystem_1.EffectSystem.IsValid(this.Handle) && !(EffectSystem_1.EffectSystem.StopEffectById(this.Handle, "AnimNotifyTrail: K2_NotifyEnd", false), this.Handle = 0);
  }
}
exports.default = AnimNotifyStateTrail;
//# sourceMappingURL=AnimNotifyStateTrail.js.map