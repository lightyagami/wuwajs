"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowFarmGold = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FarmGoldController_1 = require("../../Activity/ActivityContent/FarmGold/FarmGoldController");
const FarmGoldData_1 = require("../../Activity/ActivityContent/FarmGold/FarmGoldData");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonController_1 = require("../InstanceDungeonController");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowFarmGold extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      FarmGoldController_1.FarmGoldController.OpenDefaultFarmGoldView();
    });
    this.AddStep(() => {
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, false, true);
    });
    this.AddStep(() => {
      var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0];
      var n = FarmGoldData_1.FarmGoldData.CurrentSelectEntranceId;
      InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, e, n, 0, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption, ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(e));
    });
  }
}
exports.InstanceDungeonEntranceFlowFarmGold = InstanceDungeonEntranceFlowFarmGold;
//# sourceMappingURL=InstanceDungeonEntranceFlowFarmGold.js.map