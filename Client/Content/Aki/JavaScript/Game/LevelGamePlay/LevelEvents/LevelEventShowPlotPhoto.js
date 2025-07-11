"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventShowPlotPhoto = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventShowPlotPhoto extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      ControllerHolder_1.ControllerHolder.PhotographController.CameraCaptureType = 1;
      if (!UiManager_1.UiManager.IsViewOpen("PhotographView")) {
        if (ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(1)) {
          TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("PhotographView");
        }
      }
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventShowPlotPhoto = LevelEventShowPlotPhoto;
//# sourceMappingURL=LevelEventShowPlotPhoto.js.map