"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceFlowAbyss = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonController_1 = require("../InstanceDungeonController");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowAbyss extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      ModelManager_1.ModelManager.DangoAbyssModel.InitCacheDangoOwnerMap();
      ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(true);
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, false, true);
    });
    this.AddStep(() => {
      ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(false);
      var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0];
      const n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      const o = {};
      e.forEach(e => {
        var a = ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerRoleCfgOwnerData(n, e);
        o[e.toString()] = a ? a.DangoId : 0;
      });
      var a = {
        opc: o
      };
      ModelManager_1.ModelManager.DangoAbyssModel.SaveCacheDangoOwnerMap();
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.spc = a;
      var a = ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectEntranceId;
      var r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
      this.jFc(r, e, a);
    });
  }
  async jFc(e, a, n) {
    if (await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, a, n, 0, undefined, undefined)) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, true);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, true);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, true);
      ModelManager_1.ModelManager.DangoAbyssModel.SaveFormationSelectRole(ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId, a);
      ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(undefined);
    } else {
      this.RevertStep();
    }
  }
  OnEditBattleViewCloseCall() {
    ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(false);
  }
}
exports.InstanceDungeonEntranceFlowAbyss = InstanceDungeonEntranceFlowAbyss;
//# sourceMappingURL=InstanceDungeonEntranceFlowAbyss.js.map