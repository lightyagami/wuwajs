"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitTeleportEnd = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitTeleportEnd extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.Ilt = () => {
      this.FinishExecute(true);
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.LevelFlowModel.IsEnd) {
      this.FinishExecute(true);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
}
exports.LevelFlowWaitTeleportEnd = LevelFlowWaitTeleportEnd;
//# sourceMappingURL=LevelFlowWaitTeleportEnd.js.map