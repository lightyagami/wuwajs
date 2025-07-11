"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const UiCameraManager_1 = require("./UiCameraManager");
class UiCameraController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    UiCameraManager_1.UiCameraManager.Initialize();
    return true;
  }
  static OnClear() {
    UiCameraManager_1.UiCameraManager.Clear();
    return true;
  }
  static OnLeaveLevel() {
    UiCameraManager_1.UiCameraManager.Clear();
    return true;
  }
}
exports.UiCameraController = UiCameraController;
//# sourceMappingURL=UiCameraController.js.map