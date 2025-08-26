"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseRougeModeLevelReachOpenTime = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseRougeModeLevelReachOpenTime extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefenseRougeLevel";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeLevelReachOpenTime];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.RedDotLevelReachOpenTime();
  }
}
exports.RedDotTrapDefenseRougeModeLevelReachOpenTime = RedDotTrapDefenseRougeModeLevelReachOpenTime;
//# sourceMappingURL=RedDotTrapDefenseRougeModeLevelReachOpenTime.js.map