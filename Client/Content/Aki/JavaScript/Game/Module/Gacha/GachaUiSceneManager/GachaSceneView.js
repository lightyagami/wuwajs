"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaSceneView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class GachaSceneView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CloseViewEvent = () => {
      this.wKt();
    };
    this.wKt = () => {
      this.BKt(true);
    };
    this.BKt = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Gacha", 27, "GachaScene被关闭");
      }
      if (e) {
        this.OnAfterCloseUiScene();
        ModelManager_1.ModelManager.GachaModel.CanCloseView = true;
        if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
          this.CloseMe();
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterCloseGachaScene);
      }
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
    this.AfterAddEventListener();
  }
  AfterAddEventListener() {}
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseGachaSceneView, this.CloseViewEvent);
    this.AfterRemoveEventListener();
  }
  AfterRemoveEventListener() {}
  OnBeforeShow() {
    this.OnAfterOpenUiScene();
  }
  OnAfterOpenUiScene() {}
  OnStart() {
    ModelManager_1.ModelManager.GachaModel.CanCloseView = false;
    this.OnAfterInitComponentsData();
  }
  OnAfterCloseUiScene() {}
  OnBeforeDestroyImplementImplement() {}
  OnBeforeDestroyImplement() {
    ModelManager_1.ModelManager.GachaModel.CanCloseView = true;
    this.OnBeforeDestroyImplementImplement();
  }
  OnAfterInitComponentsData() {}
}
(exports.GachaSceneView = GachaSceneView).UiCameraHandleData = undefined;
//# sourceMappingURL=GachaSceneView.js.map