"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenShotController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ScreenShotManager_1 = require("./ScreenShotManager");
class ScreenShotController extends ControllerBase_1.ControllerBase {
  static OnClear() {
    ScreenShotManager_1.ScreenShotManager.Clear();
    return true;
  }
  static OnLeaveLevel() {
    ScreenShotManager_1.ScreenShotManager.Clear();
    return true;
  }
}
exports.ScreenShotController = ScreenShotController;
//# sourceMappingURL=ScreenShotController.js.map