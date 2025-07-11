"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSceneActorEffectsManagementComponent = undefined;
const UE = require("ue");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
class UiSceneActorEffectsManagementComponent {
  constructor() {
    this.u1o = new Array();
    this.c1o = new UE.TransformDouble(new UE.Rotator(0, 0, 0), new UE.VectorDouble(0, 0, 0), new UE.VectorDouble(1, 1, 1));
    this.m1o = CharacterNameDefines_1.CharacterNameDefines.ROOT;
  }
  PlayEffect(e, t, f, c, a) {
    e = EffectUtil_1.EffectUtil.GetEffectPath(e);
    return this.PlayEffectByPath(e, t, f, c, a);
  }
  PlayEffectByPath(e, t, f, c, a) {
    f = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, f ?? this.c1o, e, "[RoleAnimStateEffectManager.PlayEffect]", new EffectContext_1.EffectContext(undefined, t), 1, undefined, a);
    if (EffectSystem_1.EffectSystem.IsValid(f)) {
      this.u1o.push(f);
    }
    let r = c;
    r = r || this.m1o;
    if (EffectSystem_1.EffectSystem.IsValid(f)) {
      EffectSystem_1.EffectSystem.GetEffectActor(f)?.K2_AttachToComponent(t, r, 0, 0, 0, false);
    }
    return f;
  }
  PlayEffectList(t, f, c, a) {
    if (t) {
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e);
        this.PlayEffectByPath(r.ToAssetPathName(), f, c, a);
      }
    }
  }
  AttachEffect(e) {
    this.u1o.push(e);
  }
  DestroyEffect() {
    if (this.u1o && this.u1o.length !== 0) {
      this.u1o.forEach(e => {
        EffectSystem_1.EffectSystem.StopEffectById(e, "[RoleAnimStateEffectManager.RecycleEffect]", true);
      });
      this.u1o.length = 0;
    }
  }
  StopEffect(e) {
    EffectSystem_1.EffectSystem.StopEffectById(e, "[RoleAnimStateEffectManager.StopEffect]", true);
  }
}
exports.UiSceneActorEffectsManagementComponent = UiSceneActorEffectsManagementComponent;
//# sourceMappingURL=UiSceneActorEffectsManagementComponent.js.map