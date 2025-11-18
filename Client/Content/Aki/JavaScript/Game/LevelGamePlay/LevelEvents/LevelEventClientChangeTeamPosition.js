"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientChangeTeamPosition = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClientChangeTeamPosition extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    const r = e.PositionId;
    if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
      this.BXe(r);
    } else {
      this.L_d().finally(() => {
        this.BXe(r);
      });
    }
  }
  async L_d() {
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
  }
  BXe(e) {
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      if (ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(a.GetConfigId) === e) {
        ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(a.GetCreatureDataId());
        break;
      }
    }
    this.FinishExecute(true);
  }
}
exports.LevelEventClientChangeTeamPosition = LevelEventClientChangeTeamPosition;
//# sourceMappingURL=LevelEventClientChangeTeamPosition.js.map