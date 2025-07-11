"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckClientEvent = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckClientEvent extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t, n) {
    let l = n;
    if ((l = n?.Type === 11 ? n.GetContextByType(10) : l)?.Type === 10 && l.EventName === EventDefine_1.EEventName.CheckClientEvent && l.GetEventHandleParams()?.[0] === GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e.EventName)) {
      return true;
    }
    return false;
  }
}
exports.LevelConditionCheckClientEvent = LevelConditionCheckClientEvent;
//# sourceMappingURL=LevelConditionCheckClientEvent.js.map