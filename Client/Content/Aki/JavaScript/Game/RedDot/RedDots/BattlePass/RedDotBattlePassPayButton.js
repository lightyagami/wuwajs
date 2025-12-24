"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotBattlePassPayButton = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassPayButton extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattlePass";
  }
  OnCheck() {
    return (ModelManager_1.ModelManager.BattlePassModel.PayButtonRedDotState || !ModelManager_1.ModelManager.BattlePassModel.HadEnter) && ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.BattlePassHadEnterUpdate];
  }
  GetActiveEvents() {
    return [EventDefine_1.EEventName.UpdateBattlePassTaskEvent];
  }
  GetDisActiveEvents() {
    return [EventDefine_1.EEventName.OnBattlePassExpireEvent];
  }
}
exports.RedDotBattlePassPayButton = RedDotBattlePassPayButton;
//# sourceMappingURL=RedDotBattlePassPayButton.js.map