"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDeviceController = undefined;
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class SignalDeviceController extends UiControllerBase_1.UiControllerBase {
  static OpenGameplay(e, a) {
    ModelManager_1.ModelManager.SignalDeviceModel.InitData(e);
    ModelManager_1.ModelManager.SignalDeviceModel.ViewType = 0;
    UiManager_1.UiManager.OpenView("SignalDeviceView", e);
    this.HDe = a;
  }
  static OpenGameplayChasingMoon(e, a) {
    ModelManager_1.ModelManager.SignalDeviceModel.InitData(e);
    ModelManager_1.ModelManager.SignalDeviceModel.ViewType = 1;
    UiManager_1.UiManager.OpenView("SignalDeviceChasingMoonView", e);
    this.HDe = a;
  }
  static OnDotPressed(e, a) {
    if (!ModelManager_1.ModelManager.SignalDeviceModel.IsGridFinished(e)) {
      ModelManager_1.ModelManager.SignalDeviceModel.LinkingStart(e, a);
    }
  }
  static OnHovering(e) {
    if (ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !== IAction_1.EPieceColorType.White) {
      ModelManager_1.ModelManager.SignalDeviceModel.Linking(e);
    }
  }
  static CheckLinking(e) {
    ModelManager_1.ModelManager.SignalDeviceModel.CheckLinking(e);
  }
  static ResetAll() {
    ModelManager_1.ModelManager.SignalDeviceModel.ResetData();
  }
  static CallFinishCallback() {
    if (this.HDe) {
      this.HDe();
    }
    if (ModelManager_1.ModelManager.SignalDeviceModel.ViewType === 1) {
      UiManager_1.UiManager.CloseView("SignalDeviceChasingMoonView");
    } else {
      UiManager_1.UiManager.CloseView("SignalDeviceView");
    }
  }
}
(exports.SignalDeviceController = SignalDeviceController).HDe = undefined;
//# sourceMappingURL=SignalDeviceController.js.map