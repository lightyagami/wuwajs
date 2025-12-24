"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitQteStart = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitQteStart extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.qsm = () => {
      this.FinishExecute(true);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteStart, this.qsm);
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.LevelFlowModel.IsEnd) {
      this.FinishExecute(true);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteStart, this.qsm);
  }
}
exports.LevelFlowWaitQteStart = LevelFlowWaitQteStart;
//# sourceMappingURL=LevelFlowWaitQteStart.js.map