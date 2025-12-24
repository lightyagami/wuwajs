"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaUiSceneManager = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const CameraController_1 = require("../../../Camera/CameraController");
const GlobalData_1 = require("../../../GlobalData");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GachaDefine_1 = require("../GachaDefine");
class GachaUiSceneManager {
  static async OpenUiScene() {
    const e = new CustomPromise_1.CustomPromise();
    RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow;
    UiSceneManager_1.UiSceneManager.OpenUiScene(GachaDefine_1.GACHA_3D_SCENE_PATH, [], () => {
      e.SetResult(true);
    });
    await e.Promise;
    if (GlobalData_1.GlobalData.World) {
      CameraController_1.CameraController.EnterCameraMode(2, 0, 2, 0);
    }
    return true;
  }
  static async CloseUiScene() {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "GachaScene");
    if (GlobalData_1.GlobalData.World) {
      CameraController_1.CameraController.ExitCameraMode(2, 0, 2, 0);
      CameraController_1.CameraController.WidgetCamera.GetComponent(12).CineCamera.CameraComponent.SetFieldOfView(90);
    }
    UiSceneManager_1.UiSceneManager.ForceCloseUiScene();
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "GachaScene");
    return true;
  }
}
exports.GachaUiSceneManager = GachaUiSceneManager;
//# sourceMappingURL=GachaUiSceneManager.js.map