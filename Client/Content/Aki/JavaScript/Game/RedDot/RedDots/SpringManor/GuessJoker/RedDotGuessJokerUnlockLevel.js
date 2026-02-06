"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotGuessJokerUnlockLevel = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotGuessJokerUnlockLevel extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnGuessJokerRedDotNotify, EventDefine_1.EEventName.SpringManorFunctionOpenNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.GuessJokerGamePlayModel.CheckRedDot();
  }
  OnGetParentName() {
    return "SpringManorGameEntrance";
  }
}
exports.RedDotGuessJokerUnlockLevel = RedDotGuessJokerUnlockLevel;
//# sourceMappingURL=RedDotGuessJokerUnlockLevel.js.map