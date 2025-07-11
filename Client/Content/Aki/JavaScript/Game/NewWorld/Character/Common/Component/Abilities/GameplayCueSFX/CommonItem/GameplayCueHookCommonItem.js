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
  constructor(e, t, r, i) {
    this.OQt = e;
    this.u$o = t;
    this.TargetPosition = r;
    this.Paths = i;
    this.c$o = undefined;
    this.m$o = 0;
    this.dce = false;
    this.nfn = undefined;
  }
  static Spawn(e, t, r, i) {
    e = new this(e, t, r, i);
    e.dce = true;
    e.c$o = e.d$o();
    e.m$o = e.C$o();
    return e;
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
  Tick(e) {
    this.TargetPosition.Set(e.X, e.Y, e.Z);
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.m$o)?.D_K2_SetActorLocation(e, false, undefined, true);
    }
    e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, e);
    this.nfn?.SetNiagaraVariableVec3("end", e);
  }
  d$o() {
    const t = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.OQt.D_GetTransform());
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      t.SetActorLabel(this.OQt.GetActorLabel() + ":" + GameplayCueHookCommonItem.name);
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Paths[0], UE.NiagaraSystem, e => {
      if (this.dce && e?.IsValid() && t?.IsValid() && (this.nfn = t.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false), this.nfn.SetAsset(e), e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.TargetPosition), this.nfn.SetNiagaraVariableVec3("end", e), TimerSystem_1.TimerSystem.Next(() => {
        UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.nfn, -1);
      }), t.K2_AttachToComponent(this.OQt.Mesh, this.u$o, 2, 2, 2, false), RecorderBlueprintFunctionLibrary_1.default.Recording)) {
        RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(t, this);
      }
    });
    return t;
  }
  C$o() {
    var e = EffectSystem_1.EffectSystem.SpawnEffect(this.OQt, new UE.TransformDouble(this.TargetPosition), this.Paths[1], "[GameplayCueHookCommonItem.CreateBallEffect]", new EffectContext_1.EffectContext(this.OQt.EntityId), 0);
    EffectUtil_1.EffectUtil.SetAdditionalEffectTimeScaleByEntity(ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.OQt.EntityId), e);
    return e;
  }
  g$o() {
    var e = EffectSystem_1.EffectSystem.SpawnEffect(this.OQt, new UE.TransformDouble(this.TargetPosition), this.Paths[2], "[GameplayCueHookCommonItem.DestroyBallEffect]", new EffectContext_1.EffectContext(this.OQt.EntityId), 0);
    EffectUtil_1.EffectUtil.SetAdditionalEffectTimeScaleByEntity(ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.OQt.EntityId), e);
  }
}
exports.GameplayCueHookCommonItem = GameplayCueHookCommonItem;
//# sourceMappingURL=GameplayCueHookCommonItem.js.map