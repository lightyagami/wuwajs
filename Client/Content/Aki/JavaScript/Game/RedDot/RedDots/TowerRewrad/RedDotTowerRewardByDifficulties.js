"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTowerRewardByDifficulties = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TowerData_1 = require("../../../Module/TowerDetailUi/TowerData");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTowerRewardByDifficulties extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnTowerRewardReceived, EventDefine_1.EEventName.RedDotTowerRewardByDifficulties];
  }
  OnCheck(e) {
    switch (e) {
      case 2:
        return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.HIGH_RISK_DIFFICULTY);
      case 1:
        return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.LOW_RISK_DIFFICULTY);
      case 3:
        return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.VARIATION_RISK_DIFFICULTY);
      case 5:
        var a = ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.LOW_RISK_DIFFICULTY);
        var r = ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.HIGH_RISK_DIFFICULTY);
        var t = ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.OVERLOCK_RISK_DIFFICULTY);
        return a || r || t;
      case 4:
        return ModelManager_1.ModelManager.TowerModel.CanGetRewardByDifficulties(TowerData_1.OVERLOCK_RISK_DIFFICULTY);
      default:
        return false;
    }
  }
}
exports.RedDotTowerRewardByDifficulties = RedDotTowerRewardByDifficulties;
//# sourceMappingURL=RedDotTowerRewardByDifficulties.js.map