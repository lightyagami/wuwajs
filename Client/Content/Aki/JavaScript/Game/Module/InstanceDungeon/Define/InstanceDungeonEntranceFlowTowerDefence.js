"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowTowerDefense = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const TowerInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/TowerInstanceDungeonViewModel");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowTowerDefense extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(true);
      var e = new TowerInstanceDungeonViewModel_1.TowerInstanceDungeonViewModel();
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", e);
    });
    this.AddStep(() => {
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId);
      TowerDefenceController_1.TowerDefenseController.SetPhantomViewOpened(false);
    });
    this.AddStep(() => {
      TowerDefenceController_1.TowerDefenseController.EnterTowerDefense().then(e => {
        EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
        if (e) {
          this.Reset();
          TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(false);
        } else {
          this.RevertStep();
        }
      });
    });
  }
  OnEditBattleViewCloseCall() {
    TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(false);
  }
}
exports.InstanceDungeonEntranceFlowTowerDefense = InstanceDungeonEntranceFlowTowerDefense;
//# sourceMappingURL=InstanceDungeonEntranceFlowTowerDefence.js.map