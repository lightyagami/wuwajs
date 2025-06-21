"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SkeletalObserverHandle = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager");
class SkeletalObserverHandle {
  constructor() {
    this.uSo = void 0
  }
  get Model() {
    return this.uSo?.Model
  }
  CreateSkeletalObserverHandle(e) {
    this.uSo = ActorSystem_1.ActorSystem.Get(UE.TsSkeletalObserver_C.StaticClass(), new UE.TransformDouble, void 0), void 0 === this.uSo ? Log_1.Log.CheckError() && Log_1.Log.Error("UiCommon", 27, "创建SkeletalObserver失败", ["useWay", e]) : this.uSo.Init(e)
  }
  ResetSkeletalObserverHandle() {
    this.uSo?.Destroy(), this.uSo = void 0
  }
  AddUiShowRoomShowActor(e) {
    var r = this.uSo;
    UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(r, e)
  }
}
exports.SkeletalObserverHandle = SkeletalObserverHandle;
//# sourceMappingURL=SkeletalObserverHandle.js.map