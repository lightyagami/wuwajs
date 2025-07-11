"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem");
class TsUiSceneRoleActor extends UE.Actor {
  constructor() {
    super(...arguments);
    this.Model = undefined;
    this.RoleActorIndex = 0;
    this.BeforeMoveOutPos = Vector_1.Vector.ZeroVectorDouble;
  }
  Constructor() {
    this.Model = undefined;
    this.RoleActorIndex = 0;
    this.BeforeMoveOutPos = Vector_1.Vector.ZeroVectorDouble;
  }
  Init(t, e) {
    this.RoleActorIndex = t;
    this.SetTickableWhenPaused(true);
    this.SetActorTickEnabled(true);
    this.CustomTimeDilation = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetActorUISceneRendering(this, true);
    this.Model = UiModelSystem_1.UiModelSystem.CreateUiModelByUseWay(e, this);
    this.Model?.Init();
    this.Model?.Start();
    this.SetPrimitiveEntityType(1);
  }
  ReceiveTick(t) {
    this.Model?.Tick(t);
  }
  GetRoleActorIndex() {
    return this.RoleActorIndex;
  }
  Destroy() {
    this.Model?.End();
    this.Model?.Clear();
    this.Model = undefined;
    this.RoleActorIndex = 0;
    ActorSystem_1.ActorSystem.Put("TsUiSceneRoleActor.Destroy", this);
  }
  IsShowUiWepaonEffect() {
    return true;
  }
  SetMoveOutActor() {
    this.BeforeMoveOutPos = this.D_K2_GetActorLocation();
    this.D_K2_SetActorLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, false);
  }
  SetMoveInActor() {
    this.D_K2_SetActorLocation(this.BeforeMoveOutPos, false, undefined, false);
  }
}
exports.default = TsUiSceneRoleActor;
//# sourceMappingURL=TsUiSceneRoleActor.js.map