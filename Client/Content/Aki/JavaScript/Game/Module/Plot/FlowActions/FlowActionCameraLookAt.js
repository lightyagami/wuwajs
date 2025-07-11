"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionCameraLookAt = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionLevelAsyncAction_1 = require("./FlowActionLevelAsyncAction");
class FlowActionCameraLookAt extends FlowActionLevelAsyncAction_1.FlowActionLevelAsyncAction {
  OnBackgroundExecute() {
    this.FinishExecute(true);
  }
  OnInterruptExecute() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] FlowActionCameraLookAt");
    }
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(62);
    var o = this.ActionInfo.Params;
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraGuide();
    if (o.BanInput) {
      InputController_1.InputController.AddInputHandler(e);
      CameraController_1.CameraController.SetInputEnable(Global_1.Global.BaseCharacter, true);
    }
    super.OnInterruptExecute();
  }
}
exports.FlowActionCameraLookAt = FlowActionCameraLookAt;
//# sourceMappingURL=FlowActionCameraLookAt.js.map