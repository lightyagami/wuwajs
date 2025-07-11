"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowAttached = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const MowingInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/MowingInstanceDungeonViewModel");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowAttached extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e = new MowingInstanceDungeonViewModel_1.MowingInstanceDungeonViewModel();
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
exports.InstanceDungeonEntranceFlowAttached = InstanceDungeonEntranceFlowAttached;
//# sourceMappingURL=InstanceDungeonEntranceFlowAttached.js.map