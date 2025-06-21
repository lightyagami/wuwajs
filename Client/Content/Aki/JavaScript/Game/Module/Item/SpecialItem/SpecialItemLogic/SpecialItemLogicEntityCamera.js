"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialItemLogicEntityCamera = void 0;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  TsInteractionUtils_1 = require("../../../Interaction/TsInteractionUtils"),
  SpecialItemLogicBase_1 = require("./SpecialItemLogicBase");
class SpecialItemLogicEntityCamera extends SpecialItemLogicBase_1.SpecialItemLogicBase {
  CheckUseCondition() {
    return !0
  }
  OnUse() {
    UiManager_1.UiManager.IsViewOpen("PhotographView") || ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(1) && TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("PhotographView")
  }
}
exports.SpecialItemLogicEntityCamera = SpecialItemLogicEntityCamera;
//# sourceMappingURL=SpecialItemLogicEntityCamera.js.map