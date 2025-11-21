"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLeaveTipAction = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const InteractConfirmActionBase_1 = require("../InteractConfirmActionBase");
class HonamiStoryLeaveTipAction extends InteractConfirmActionBase_1.InteractConfirmActionBase {
  OnExecute(e) {
    var a = {
      LeaveType: 2,
      ConfirmCallback: () => {
        this.ExecuteFinish(true);
      },
      CancelCallback: () => {
        this.ExecuteFinish(false);
      }
    };
    UiManager_1.UiManager.OpenView("HonamiStoryLeaveTip", a);
    return true;
  }
  OnCancel() {
    if (UiManager_1.UiManager.IsViewOpen("HonamiStoryLeaveTip")) {
      UiManager_1.UiManager.CloseView("HonamiStoryLeaveTip");
    }
    this.ExecuteFinish(false);
  }
}
exports.HonamiStoryLeaveTipAction = HonamiStoryLeaveTipAction;
//# sourceMappingURL=HonamiStoryLeaveTipAction.js.map