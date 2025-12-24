"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowLordGym = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const LordGymDefine_1 = require("../../LordGym/LordGymDefine");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowLordGym extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e;
      if (ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon()) {
        e = {
          LordEntranceSetId: LordGymDefine_1.THRID_VIES_PARAM,
          LordEntranceId: ModelManager_1.ModelManager.LordGymModel.EntranceEntityId,
          IsPlaySpecialSequence: true
        };
        ControllerHolder_1.ControllerHolder.TowerController.ClearAllHatredInTower();
        UiManager_1.UiManager.OpenView("LordGymThirdDifficultySelectView", e);
      } else {
        e = {
          EntranceSetId: LordGymDefine_1.THRID_VIES_PARAM,
          IsPlaySpecialSequence: true,
          NeedBlackScreenAnim: false
        };
        UiManager_1.UiManager.OpenView("LordGymThirdBossSelectView", e);
      }
    });
    this.AddStep(() => {
      ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, false, true, true);
    });
    this.AddStep(() => {
      if (UiManager_1.UiManager.IsViewOpen("EditBattleTeamView")) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterInstanceDungeon().then(e => {
          EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
          if (e) {
            this.Reset();
          } else {
            this.RevertStep();
          }
        }, () => {});
      } else {
        this.RevertStep();
      }
    });
  }
}
exports.InstanceDungeonEntranceFlowLordGym = InstanceDungeonEntranceFlowLordGym;
//# sourceMappingURL=InstanceDungeonEntranceFlowLordGym.js.map