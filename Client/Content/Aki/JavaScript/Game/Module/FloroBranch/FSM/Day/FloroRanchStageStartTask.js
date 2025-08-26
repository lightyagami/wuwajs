"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStageStartTask = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchStageStartTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(e) {
    super();
    this.Ymu = undefined;
    this.Ymu = e;
  }
  OnExecute() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnStageStart(this.Ymu);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageStartTaskBeforeFinish, false);
    UiManager_1.UiManager.OpenView("FloroRanchPhaseTargetView", {
      StageStartData: this.Ymu,
      CloseCallback: async () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageStartTaskBeforeFinish, true);
        await ControllerHolder_1.ControllerHolder.GuideController.WaitForCurrentTutorialFinish();
        this.Complete();
      }
    });
  }
}
exports.FloroRanchStageStartTask = FloroRanchStageStartTask;
//# sourceMappingURL=FloroRanchStageStartTask.js.map