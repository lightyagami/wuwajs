"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletalObserverHandle = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
class SkeletalObserverHandle {
  constructor() {
    this.uSo = undefined;
  }
  get Model() {
    return this.uSo?.Model;
  }
  CreateSkeletalObserverHandle(e) {
    this.uSo = ActorSystem_1.ActorSystem.Get(UE.TsSkeletalObserver_C.StaticClass(), new UE.TransformDouble(), undefined);
    if (this.uSo === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 27, "创建SkeletalObserver失败", ["useWay", e]);
      }
    } else {
      this.uSo.Init(e);
    }
  }
  ResetSkeletalObserverHandle() {
    this.uSo?.Destroy();
    this.uSo = undefined;
  }
  AddUiShowRoomShowActor(e) {
    var r = this.uSo;
    UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(r, e);
  }
}
exports.SkeletalObserverHandle = SkeletalObserverHandle;
//# sourceMappingURL=SkeletalObserverHandle.js.map