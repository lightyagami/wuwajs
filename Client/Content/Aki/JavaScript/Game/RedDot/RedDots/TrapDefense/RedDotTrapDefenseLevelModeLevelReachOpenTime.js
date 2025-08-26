"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseLevelModeLevelReachOpenTime = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseLevelModeLevelReachOpenTime extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefenseMainLevel";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseLevelModeLevelReachOpenTime];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.TrapDefenseModel.LevelModeData.RedDotLevelReachOpenTime();
  }
}
exports.RedDotTrapDefenseLevelModeLevelReachOpenTime = RedDotTrapDefenseLevelModeLevelReachOpenTime;
//# sourceMappingURL=RedDotTrapDefenseLevelModeLevelReachOpenTime.js.map