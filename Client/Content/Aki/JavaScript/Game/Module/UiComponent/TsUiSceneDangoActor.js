"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem");
class TsUiSceneDangoActor extends UE.Actor {
  constructor() {
    super(...arguments);
    this.Model = undefined;
    this.ActorIndex = 0;
  }
  Constructor() {
    this.Model = undefined;
    this.ActorIndex = 0;
  }
  Init(t, e) {
    this.ActorIndex = t;
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
  GetActorIndex() {
    return this.ActorIndex;
  }
  SetState(t, e = 0, s = 0) {
    this.GetStateMachine()?.SetState(t, e, s);
  }
  GetStateMachine() {
    return this.Model?.CheckGetComponent(27);
  }
  Destroy() {
    this.Model?.End();
    this.Model?.Clear();
    this.Model = undefined;
    this.ActorIndex = 0;
    ActorSystem_1.ActorSystem.Put("TsUiSceneDangoActor.Destroy", this);
  }
}
exports.default = TsUiSceneDangoActor;
//# sourceMappingURL=TsUiSceneDangoActor.js.map