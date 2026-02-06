"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowDeadEyeMode = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowDeadEyeMode extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.YXm = () => {
      this.FinishExecute(true);
    };
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeadEyeModeFinish, this.YXm);
  }
  OnExecute() {
    if (this.OPt) {
      ControllerHolder_1.ControllerHolder.DeadEyeModeController.EnterDeadEyeModeWithoutEntity(this.OPt);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "执行行为LevelFlowDeadEyeMode失败，参数错误");
      }
      this.FinishExecute(false);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeadEyeModeFinish, this.YXm);
  }
}
exports.LevelFlowDeadEyeMode = LevelFlowDeadEyeMode;
//# sourceMappingURL=LevelFlowDeadEyeMode.js.map