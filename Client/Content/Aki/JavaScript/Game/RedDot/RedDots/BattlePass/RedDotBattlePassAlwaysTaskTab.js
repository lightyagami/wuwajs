"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattlePassAlwaysTaskTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassAlwaysTaskTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattlePassTask";
  }
  OnCheck() {
    return ModelManager_1.ModelManager.BattlePassModel.CheckHasTaskWaitTakeWithType(0);
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.UpdateBattlePassTaskEvent, EventDefine_1.EEventName.ReceiveBattlePassTaskEvent];
  }
  IsAllEventParamAsUId() {
    return false;
  }
}
exports.RedDotBattlePassAlwaysTaskTab = RedDotBattlePassAlwaysTaskTab;
//# sourceMappingURL=RedDotBattlePassAlwaysTaskTab.js.map