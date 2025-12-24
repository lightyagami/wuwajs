"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemInstanceEntrance = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TowerData_1 = require("../../../Module/TowerDetailUi/TowerData");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceEntrance extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) {
      return false;
    }
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
      return false;
    }
    let n = undefined;
    switch (r.Type) {
      case 5:
        n = r.TriggerEntityId;
        break;
      case 1:
        n = r.EntityId;
    }
    return ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(e.BoardId, n);
  }
  GetViewName(e) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(e.BoardId);
    if (e === 3) {
      return "SingleTimeTowerView";
    } else if (e === 4) {
      return "CycleTowerView";
    } else if (e === 7) {
      return "BossRushMainView";
    } else if (e === 5) {
      if (ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty() !== TowerData_1.VARIATION_RISK_DIFFICULTY) {
        return "TowerNormalView";
      } else {
        return "TowerVariationView";
      }
    } else if (e === 9) {
      return "InstanceDungeonEntranceView";
    } else if (e === 10) {
      return "ActivityInstanceEntranceView";
    } else if (e === 16) {
      return "LordGymThirdBossSelectView";
    } else {
      return "InstanceDungeonEntranceView";
    }
  }
}
exports.OpenSystemInstanceEntrance = OpenSystemInstanceEntrance;
//# sourceMappingURL=OpenSystemInstanceEntrance.js.map