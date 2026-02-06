"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationSelectPositionButton = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const NavigationButton_1 = require("../NavigationButton");
class FormationSelectPositionButton extends NavigationButton_1.NavigationButton {
  OnInit() {
    super.OnInit();
  }
  NotifyFocusListener() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "FormationSelectPositionButton-NotifyFocusListener");
    }
    ControllerHolder_1.ControllerHolder.FormationDragController.SetGamePadSelectPosition(Number(this.ParamList[0]));
  }
}
exports.FormationSelectPositionButton = FormationSelectPositionButton;
//# sourceMappingURL=FormationSelectPositionButton.js.map