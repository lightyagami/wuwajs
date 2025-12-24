"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowNormal = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const BaseInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/BaseInstanceDungeonViewModel");
const SolarSpeedInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/SolarSpeedInstanceDungeonViewModel");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowNormal extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
      let n = undefined;
      n = new (e === 9000 ? SolarSpeedInstanceDungeonViewModel_1.SolarSpeedInstanceDungeonViewModel : BaseInstanceDungeonViewModel_1.BaseInstanceDungeonViewModel)();
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", n);
    });
    this.AddStep(() => {
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, false, true, false);
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
exports.InstanceDungeonEntranceFlowNormal = InstanceDungeonEntranceFlowNormal;
//# sourceMappingURL=InstanceDungeonEntranceFlowNormal.js.map