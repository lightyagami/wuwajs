"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBattleTeamController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController");
class EditBattleTeamController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    ModelManager_1.ModelManager.EditBattleTeamModel.CreateAllRoleSlotData();
    return true;
  }
  static OnClear() {
    ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PrewarFormationChanged, this.Q3t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PrewarReadyChanged, this.X3t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DissolvePrewar, this.$3t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleLevelUp, this.TQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkinChange, this.A$_);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PrewarFormationChanged, this.Q3t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PrewarReadyChanged, this.X3t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DissolvePrewar, this.$3t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleLevelUp, this.TQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkinChange, this.A$_);
  }
  static PlayerOpenEditBattleTeamView(e, t = false, n = true, a = false, o = undefined) {
    if (!t) {
      ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance = n;
    }
    if (o === undefined) {
      o = ModelManager_1.ModelManager.RoleModel.CanUseSpecialTrialRole(e);
    }
    this.OpenEditBattleTeamView(e, t, a, o);
  }
  static OpenEditBattleTeamView(e, t = 0, n = false, a = false) {
    var o = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)) {
      o.SetInstanceDungeonId(e);
      if (ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon && ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <= 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 5, "打开战前编队时，数据已经被清理，操作中止");
        }
        o.SetInstanceDungeonId(undefined);
      } else {
        e = {
          IsHideTitle: n,
          CanUseSpecialTrailRole: a
        };
        UiManager_1.UiManager.OpenView("EditBattleTeamView", e);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "[EditBattleTeam]找不到副本数据，不能打开战前编队");
    }
  }
  static CloseEditBattleTeamView() {
    ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData();
    UiManager_1.UiManager.CloseView("EditBattleTeamView");
  }
  static ExitEditBattleTeam(e = true) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel;
    if (t.IsMultiInstanceDungeon && e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam]离开{DungeonId} 副本的战前编队", ["{DungeonId}", t.GetInstanceDungeonId]);
      }
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest();
    }
    t.SetInstanceDungeonId(undefined);
    t.SetLeaderPlayerId(undefined);
    if (UiManager_1.UiManager.IsViewShow("ChatView")) {
      UiManager_1.UiManager.CloseView("ChatView", () => {
        this.CloseEditBattleTeamView();
      });
    } else if (UiManager_1.UiManager.IsViewShow("TeamRoleSelectView")) {
      UiManager_1.UiManager.CloseView("TeamRoleSelectView", () => {
        this.CloseEditBattleTeamView();
      });
    } else {
      this.CloseEditBattleTeamView();
    }
  }
  static ResetSlotDataThenSetEditBattleTeamByRoleId(n) {
    ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData();
    var a = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    for (let t = 0; t < n.length; t++) {
      var o = n[t];
      var r = a[t];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o);
      var l = i.GetLevelData();
      let e = r.GetRoleData;
      (e = e || ModelManager_1.ModelManager.EditBattleTeamModel.CreateRoleDataFromRoleInstance(i)).ConfigId = o;
      e.Level = l.GetLevel();
      r.SetRoleData(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "用RoleId设置编队时");
  }
  static SetEditBattleTeamByRoleId(n) {
    var a = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    for (let t = 0; t < n.length; t++) {
      var o = n[t];
      var r = a[t];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o);
      var l = i.GetLevelData();
      let e = r.GetRoleData;
      (e = e || ModelManager_1.ModelManager.EditBattleTeamModel.CreateRoleDataFromRoleInstance(i)).ConfigId = o;
      e.Level = l.GetLevel();
      r.SetRoleData(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "用RoleId设置编队时");
  }
  static RefreshMainRoleInfo() {
    ModelManager_1.ModelManager.EditBattleTeamModel.ChangeMainRoleData();
  }
}
(exports.EditBattleTeamController = EditBattleTeamController).Q3t = () => {
  ModelManager_1.ModelManager.EditBattleTeamModel.RefreshAllMultiRoleData();
};
EditBattleTeamController.X3t = (e, t) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Formation", 48, "[EditBattleTeam]玩家{PlayerId} 返回准备游戏,是否准备:{IsReady}", ["{PlayerId}", e], ["{IsReady}", t]);
  }
  ModelManager_1.ModelManager.EditBattleTeamModel.SetPlayerReady(e, t);
};
EditBattleTeamController.$3t = () => {
  EditBattleTeamController.CloseEditBattleTeamView();
};
EditBattleTeamController.TQe = (e, t, n) => {
  for (const r of ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData) {
    var a = r.GetRoleData;
    var o = a?.IsSelf;
    if (a && o && a.ConfigId === e && (a.Level = n, ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon)) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0]);
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "角色升级时");
};
EditBattleTeamController.A$_ = e => {
  var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
  for (const o of ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData) {
    var n = o.GetRoleData;
    var a = n?.IsSelf;
    if (n && a && n.ConfigId === e && (n.SkinId = t.GetRoleSkinId(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "角色皮肤更换时"), ModelManager_1.ModelManager.EditBattleTeamModel.IsMultiInstanceDungeon)) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0]);
    }
  }
}; //# sourceMappingURL=EditBattleTeamController.js.map