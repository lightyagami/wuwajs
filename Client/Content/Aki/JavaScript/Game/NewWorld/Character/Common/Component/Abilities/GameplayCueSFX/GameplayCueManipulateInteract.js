"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueManipulateInteract = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../../../GlobalData");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueManipulateInteract extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.g1t = undefined;
    this.sYo = [];
    this.c$o = undefined;
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    this.g1t = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket);
    this.sYo = this.CueConfig.Resources;
    this.c$o = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.ActorInternal.D_GetTransform());
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.c$o.SetActorLabel(this.ActorInternal.GetActorLabel() + ":" + GameplayCueManipulateInteract.name);
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(this.sYo[0], UE.NiagaraSystem, e => {
      var t = this.c$o.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      t.SetAsset(e);
      var e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.GetTargetPosition());
      t.SetNiagaraVariableVec3("End", e);
      this.c$o.K2_AttachToComponent(this.ActorInternal.Mesh, this.g1t, 2, 2, 2, false);
    });
  }
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put("GameplayCueManipulateInteract.OnDestroy", this.c$o);
  }
  GetTargetPosition() {
    return this.EntityHandle.Entity.GetComponent(69).GetTargetLocation().ToUeVector();
  }
}
exports.GameplayCueManipulateInteract = GameplayCueManipulateInteract;
//# sourceMappingURL=GameplayCueManipulateInteract.js.map