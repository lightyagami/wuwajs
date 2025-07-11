"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItemLogicEntityCamera = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const TsInteractionUtils_1 = require("../../../Interaction/TsInteractionUtils");
const SpecialItemLogicBase_1 = require("./SpecialItemLogicBase");
class SpecialItemLogicEntityCamera extends SpecialItemLogicBase_1.SpecialItemLogicBase {
  CheckUseCondition() {
    return true;
  }
  OnUse() {
    if (!UiManager_1.UiManager.IsViewOpen("PhotographView")) {
      if (ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(1)) {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("PhotographView");
      }
    }
  }
}
exports.SpecialItemLogicEntityCamera = SpecialItemLogicEntityCamera;
//# sourceMappingURL=SpecialItemLogicEntityCamera.js.map