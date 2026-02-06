"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueHookCommonItem = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../../GlobalData");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
const EffectUtil_1 = require("../../../../../../../Utils/EffectUtil");
class GameplayCueHookCommonItem {
  constructor(t, e, i, r) {
    this.OQt = t;
    this.u$o = e;
    this.TargetPosition = i;
    this.Paths = r;
    this.c$o = undefined;
    this.m$o = 0;
    this.dce = false;
    this.nfn = undefined;
  }
  static Spawn(t, e, i, r, s = true) {
    t = new this(t, e, i, r);
    t.dce = true;
    t.c$o = t.d$o(s);
    t.m$o = t.C$o();
    return t;
  }
  Destroy() {
    if (RecorderBlueprintFunctionLibrary_1.default.Recording) {
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(this);
    }
    this.dce = false;
    this.nfn = undefined;
    ActorSystem_1.ActorSystem.Put("GameplayCueHookCommonItem.Destroy", this.c$o);
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.m$o, "[GameplayCueHookCommonItem.Destroy]", true);
    }
    this.g$o();
  }
  Tick(t) {
    this.TargetPosition.Set(t.X, t.Y, t.Z);
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.m$o)?.D_K2_SetActorLocation(t, false, undefined, true);
    }
    t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, t);
    this.nfn?.SetNiagaraVariableVec3("end", t);
  }
  d$o(e = true) {
    const i = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.OQt.D_GetTransform());
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      i.SetActorLabel(this.OQt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name);
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Paths[0], UE.NiagaraSystem, t => {
      if (this.dce && t?.IsValid() && i?.IsValid() && (this.nfn = i.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false), this.nfn.SetAsset(t), this.nfn.SetRenderInBurst(true), t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.TargetPosition), this.nfn.SetNiagaraVariableVec3("end", t), TimerSystem_1.TimerSystem.Next(() => {
        UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.nfn, -1);
      }), e ? i.K2_AttachToComponent(this.OQt.Mesh, this.u$o, 2, 2, 2, false) : (t = this.OQt.Mesh?.D_GetSocketTransform(this.u$o) ?? this.OQt.D_GetTransform(), i.D_K2_SetActorTransform(t, false, undefined, false)), RecorderBlueprintFunctionLibrary_1.default.Recording)) {
        RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(i, this);
      }
    });
    return i;
  }
  C$o() {
    var t;
    if (this.Paths.length < 2) {
      return 0;
    } else {
      t = EffectSystem_1.EffectSystem.SpawnEffect(this.OQt, new UE.TransformDouble(this.TargetPosition), this.Paths[1], "[GameplayCueHookCommonItem.CreateBallEffect]", new EffectContext_1.EffectContext(this.OQt.EntityId), 0);
      EffectUtil_1.EffectUtil.SetAdditionalEffectTimeScaleByEntity(ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.OQt.EntityId), t);
      return t;
    }
  }
  g$o() {
    var t;
    if (!(this.Paths.length < 3)) {
      t = EffectSystem_1.EffectSystem.SpawnEffect(this.OQt, new UE.TransformDouble(this.TargetPosition), this.Paths[2], "[GameplayCueHookCommonItem.DestroyBallEffect]", new EffectContext_1.EffectContext(this.OQt.EntityId), 0);
      EffectUtil_1.EffectUtil.SetAdditionalEffectTimeScaleByEntity(ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.OQt.EntityId), t);
    }
  }
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
//# sourceMappingURL=GameplayCueHookCommonItem.js.map