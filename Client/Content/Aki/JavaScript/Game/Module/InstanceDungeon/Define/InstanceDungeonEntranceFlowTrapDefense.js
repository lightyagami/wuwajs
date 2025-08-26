"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowTrapDefense = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const BaseInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/BaseInstanceDungeonViewModel");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowTrapDefense extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e = new BaseInstanceDungeonViewModel_1.BaseInstanceDungeonViewModel();
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", e);
    });
    this.AddStep(() => {
      ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId);
    });
    this.AddStep(() => {
      var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      var e = ModelManager_1.ModelManager.TrapDefenseModel?.LevelDataFromInstIdMap.get(e)?.Config?.Id ?? 1;
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.iku = {
        v9n: e,
        Fid: false
      };
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeon().then(e => {
        ControllerHolder_1.ControllerHolder.EditBattleTeamController.CloseEditBattleTeamView();
        if (e) {
          this.Reset();
        } else {
          this.RevertStep();
        }
      }, () => {});
    });
  }
}
exports.InstanceDungeonEntranceFlowTrapDefense = InstanceDungeonEntranceFlowTrapDefense;
//# sourceMappingURL=InstanceDungeonEntranceFlowTrapDefense.js.map