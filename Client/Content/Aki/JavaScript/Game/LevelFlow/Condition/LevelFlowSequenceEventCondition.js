"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSequenceEventCondition = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelFlowConditionBase_1 = require("./LevelFlowConditionBase");
class LevelFlowSequenceEventCondition extends LevelFlowConditionBase_1.LevelFlowConditionBase {
  constructor() {
    super(...arguments);
    this.pDe = StringUtils_1.EMPTY_STRING;
    this.Ftm = e => {
      if (e === this.pDe) {
        this.FinishExecute(true);
      }
    };
  }
  Init(e) {
    this.pDe = e;
    return this;
  }
  OnEnter() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelFlowSequenceTriggerEvent, this.Ftm);
  }
  OnExit() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelFlowSequenceTriggerEvent, this.Ftm);
  }
  OnReset() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelFlowSequenceTriggerEvent, this.Ftm);
  }
}
exports.LevelFlowSequenceEventCondition = LevelFlowSequenceEventCondition;
//# sourceMappingURL=LevelFlowSequenceEventCondition.js.map