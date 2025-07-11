"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowMowingRisk = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const MowingRiskInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/MowingRiskInstanceDungeonViewModel");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowMowingRisk extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e = new MowingRiskInstanceDungeonViewModel_1.MowingRiskInstanceDungeonViewModel();
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", e);
    });
    this.AddStep(() => {
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId);
    });
    this.AddStep(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeon().then(e => {
        EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
        if (e) {
          this.Reset();
        } else {
          this.RevertStep();
        }
      }, () => {});
    });
  }
}
exports.InstanceDungeonEntranceFlowMowingRisk = InstanceDungeonEntranceFlowMowingRisk;
//# sourceMappingURL=InstanceDungeonEntranceFlowMowingRisk.js.map