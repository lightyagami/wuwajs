"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsSkeletalObserver = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem");
class TsSkeletalObserver extends UE.Actor {
  constructor() {
    super(...arguments);
    this.Model = undefined;
    this.UseWay = undefined;
  }
  Constructor() {
    this.Model = undefined;
  }
  Init(e) {
    this.SetTickableWhenPaused(true);
    this.SetActorTickEnabled(true);
    this.CustomTimeDilation = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetActorUISceneRendering(this, true);
    this.UseWay = e;
    this.Model = UiModelSystem_1.UiModelSystem.CreateUiModelByUseWay(e, this);
    this.Model?.Init();
    this.Model?.Start();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCommon", 27, "TsSkeletalObserver Init", ["UseWay", this.UseWay]);
    }
  }
  ReceiveTick(e) {
    this.Model?.Tick(e);
  }
  Destroy() {
    this.Model?.End();
    this.Model?.Clear();
    this.Model = undefined;
    ActorSystem_1.ActorSystem.Put("TsSkeletalObserver.Destroy", this);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCommon", 27, "TsSkeletalObserver Destroy", ["UseWay", this.UseWay]);
    }
  }
}
exports.TsSkeletalObserver = TsSkeletalObserver;
exports.default = TsSkeletalObserver; //# sourceMappingURL=TsSkeletalObserver.js.map