"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimNotifyStateScreenEffect = undefined;
const UE = require("ue");
const ue_1 = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../ScreenEffectSystem/ScreenEffectSystem");
class AnimNotifyStateScreenEffect extends ue_1.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.EffectDataAssetRef = undefined;
    this.HandleId = 0;
    this.EffectData = undefined;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var s;
    return !!this.EffectDataAssetRef && (s = (e = e.GetOwner())?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()), e = e?.IsA(UE.TsSkeletalObserver_C.StaticClass()), this.HandleId = s || e ? ResourceSystem_1.ResourceSystem.LoadAsync(this.EffectDataAssetRef.ToAssetPathName(), UE.EffectScreenPlayData_C, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 17, "开始播放镜头特效", ["path", this.EffectDataAssetRef?.ToAssetPathName()]);
      }
      this.EffectData = e;
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffectNoPaused(e);
    }, 102, undefined) : ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(this.EffectDataAssetRef.ToAssetPathName()), true);
  }
  K2_NotifyEnd(e, t) {
    var r;
    return !!this.EffectDataAssetRef && !(r = (e = e.GetOwner())?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()), e = e?.IsA(UE.TsSkeletalObserver_C.StaticClass()), r || e ? (this.EffectData && ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(this.EffectData), this.HandleId !== 0 && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.HandleId), this.HandleId = 0), 0) : (ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(this.HandleId), this.HandleId = 0));
  }
  GetNotifyName() {
    var e = this.EffectDataAssetRef?.ToAssetPathName();
    if (e) {
      return UE.BlueprintPathsLibrary.GetBaseFilename(e, true);
    } else {
      return "屏幕特效数据状态";
    }
  }
}
exports.AnimNotifyStateScreenEffect = AnimNotifyStateScreenEffect;
exports.default = AnimNotifyStateScreenEffect; //# sourceMappingURL=AnimNotifyStateScreenEffect.js.map