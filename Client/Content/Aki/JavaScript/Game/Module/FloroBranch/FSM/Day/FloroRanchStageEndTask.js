"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageEndTask = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchStageEndTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(a) {
    super();
    this.cmu = undefined;
    this.cmu = a;
  }
  OnExecute() {
    UiManager_1.UiManager.OpenView("FloroRanchPhaseSettleView", {
      StageEndData: this.cmu,
      CloseCallback: a => {
        if (a) {
          if (this.cmu.qhu || this.cmu.rNu) {
            ModelManager_1.ModelManager.FloroRanchGamePlayModel.ChangeState(4);
          } else {
            ModelManager_1.ModelManager.FloroRanchGamePlayModel.ChangeState(3);
          }
        }
        this.Complete();
      }
    });
  }
}
exports.FloroRanchStageEndTask = FloroRanchStageEndTask;
//# sourceMappingURL=FloroRanchStageEndTask.js.map