"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageStartTask = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchStageStartTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(a) {
    super();
    this.dmu = undefined;
    this.dmu = a;
  }
  OnExecute() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnStageStart(this.dmu);
    UiManager_1.UiManager.OpenView("FloroRanchPhaseTargetView", {
      StageStartData: this.dmu,
      CloseCallback: () => {
        this.Complete();
      }
    });
  }
}
exports.FloroRanchStageStartTask = FloroRanchStageStartTask;
//# sourceMappingURL=FloroRanchStageStartTask.js.map