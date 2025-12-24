"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitSkillEnd = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitSkillEnd extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.wmo = 0;
    this.E0 = 0;
    this.bJe = (e, t) => {
      if (t === this.wmo && e === this.E0) {
        this.FinishExecute(true);
      }
    };
  }
  Init(e, t) {
    this.wmo = e;
    this.E0 = t;
    return this;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.bJe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.bJe);
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["SkillId", this.wmo]);
    }
  }
}
exports.LevelFlowWaitSkillEnd = LevelFlowWaitSkillEnd;
//# sourceMappingURL=LevelFlowWaitSkillEnd.js.map