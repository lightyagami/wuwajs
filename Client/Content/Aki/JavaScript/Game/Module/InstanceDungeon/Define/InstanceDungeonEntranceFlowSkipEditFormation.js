"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowSkipEditFormation = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowSkipEditFormation extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
    });
    this.AddStep(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeonByAutoRole().then(e => {
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
exports.InstanceDungeonEntranceFlowSkipEditFormation = InstanceDungeonEntranceFlowSkipEditFormation;
//# sourceMappingURL=InstanceDungeonEntranceFlowSkipEditFormation.js.map