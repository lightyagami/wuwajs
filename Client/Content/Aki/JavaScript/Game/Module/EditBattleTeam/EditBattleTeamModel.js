"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBattleTeamModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const RoleUtils_1 = require("../RoleUi/RoleUtils");
const SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine");
const EditBattleRoleData_1 = require("./EditBattleRoleData");
const EditBattleRoleSlotData_1 = require("./EditBattleRoleSlotData");
const EditBattleTeamController_1 = require("./EditBattleTeamController");
const LIMIT_COUNT_MAX_LENGTH = 3;
class EditBattleTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Y3t = new Map();
    this.J3t = undefined;
    this.z3t = undefined;
    this.Z3t = undefined;
    this.e4t = new Map();
    this.t4t = undefined;
    this.i4t = true;
    this.iJf = false;
    this.IsFormTeleportAction = false;
    this.o4t = false;
  }
  get NeedEntrance() {
    return this.i4t;
  }
  set NeedEntrance(e) {
    this.i4t = e;
  }
  get InstanceMultiEnter() {
    return this.o4t;
  }
  set InstanceMultiEnter(e) {
    this.o4t = e;
  }
  get CanUseSpecialTrialRole() {
    return this.iJf;
  }
  set CanUseSpecialTrialRole(e) {
    this.iJf = e;
  }
  SetInstanceDungeonId(e) {
    this.z3t = e;
  }
  get GetInstanceDungeonId() {
    return this.z3t;
  }
  get GetAllRoleConfigIdList() {
    var t = [];
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var r = this.GetRoleSlotData(e);
      if (r && r.HasRole) {
        r = r.GetRoleData.ConfigId;
        t.push(r);
      }
    }
    return t;
  }
  get IsAllRoleDie() {
    for (const t of this.GetAllRoleSlotData) {
      if (t.HasRole) {
        var e = t.GetRoleData.ConfigId;
        if (this.IsTrialRole(e)) {
          return false;
        }
        if (!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e)) {
          return false;
        }
      }
    }
    return true;
  }
  get GetOwnRoleConfigIdList() {
    var t = new Array();
    var r = new Array();
    var a = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var o = this.GetRoleSlotData(e);
      if (o && o.HasRole && a === (o = o.GetRoleData).PlayerId) {
        o = o.ConfigId;
        t.push(o);
        r.push(e - 1);
      }
    }
    return [t, r];
  }
  get IsMultiInstanceDungeon() {
    var e = this.GetCurrentDungeonConfig;
    return (!e || e.OnlineType !== InstOnlineType_1.InstOnlineType.Single) && this.InstanceMultiEnter;
  }
  SetLeaderPlayerId(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "[EditBattleTeam]设置队长", ["PlayerId", e]);
    }
    this.Z3t = e;
  }
  get GetLeaderPlayerId() {
    return this.Z3t;
  }
  get GetLeaderIsSelf() {
    return !!this.GetLeaderPlayerId && ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.GetLeaderPlayerId;
  }
  get IsInInstanceDungeon() {
    return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  get IsMatchingTeamLackConfirmBoxCanEnterInstance() {
    return this.GetInstanceDungeonId !== undefined && ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(this.GetInstanceDungeonId) !== 9000;
  }
  GetAllRoleCanAddToTeam() {
    for (const e of this.GetAllRoleConfigIdList) {
      if (!this.CanAddRoleToEditTeam(e)) {
        return {
          CanAdd: false,
          LimitRoleId: e
        };
      }
    }
    return {
      CanAdd: true,
      LimitRoleId: 0
    };
  }
  InitTrailRoleInstance() {
    this.e4t.clear();
    var e;
    var t = this.GetCurrentFightFormation.TrialRole;
    var r = ModelManager_1.ModelManager.RoleModel;
    for (const a of t) {
      if (!this.e4t.has(a)) {
        e = r.GetRoleDataById(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(a));
        this.e4t.set(a, e);
      }
    }
  }
  GetRoleList() {
    var t = ModelManager_1.ModelManager.RoleModel;
    var r = [];
    var e = t.GetRoleDataMap(true);
    if (this.r4t()) {
      for (const l of this.n4t()) {
        var a;
        var o = t.GetRoleDataById(l);
        if (o && (a = o.GetDataId(), this.CanAddRoleToEditTeam(a))) {
          r.push(o);
        }
      }
    } else {
      for (const s of e.values()) {
        var i = s.GetDataId();
        if (this.CanAddRoleToEditTeam(i)) {
          r.push(s);
        }
      }
      for (const f of this.e4t.values()) {
        r.push(f);
      }
    }
    if (!this.t4t) {
      this.t4t = new Array();
      e = ModelManager_1.ModelManager.WorldLevelModel.Sex;
      e = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(e);
      if (e) {
        for (const d of e) {
          this.t4t.push(d.Id);
        }
      }
    }
    for (let e = 0; e < r.length;) {
      var n = r[e].GetRoleId();
      if (t.IsMainRole(n) && !this.t4t.includes(n)) {
        r.splice(e, 1);
      } else {
        e++;
      }
    }
    return r;
  }
  HasAnyLimit() {
    return !!this.r4t() || !!this.s4t() || !!this.a4t() || !!this.h4t();
  }
  n4t() {
    var e = this.GetCurrentFightFormation;
    if (e) {
      return e.LimitRole;
    }
  }
  r4t() {
    var e = this.n4t();
    return !!e && e.length > 0;
  }
  s4t() {
    var e = this.GetCurrentFightFormation;
    return !!e && (e = e.LimitCount.length) !== LIMIT_COUNT_MAX_LENGTH && e > 0;
  }
  a4t() {
    var e = this.GetCurrentFightFormation;
    return !!e && e.LitmitElement.length > 0;
  }
  h4t() {
    return !!this.IsEditBattleTeamForMowingInstance();
  }
  IsEditBattleTeamForMowingInstance() {
    return !!this.z3t && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.z3t)?.InstSubType === 19;
  }
  CanAddRoleToEditTeam(e) {
    var t;
    return !!this.IsTrialRole(e) || (t = this.IsInLimitRole(e), e = this.IsInLimitElement(e), t && e);
  }
  IsInLimitRoleCount(e) {
    var t = this.GetLimitRoleCountList();
    return !t || t.includes(e);
  }
  IsInLimitRole(e) {
    var t = this.GetCurrentFightFormation;
    return !t || (t = t.LimitRole).length <= 0 || t.includes(e);
  }
  IsInLimitElement(e) {
    var t = this.GetCurrentFightFormation;
    return !t || !!(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)) && (e = e.ElementId, (t = t.LitmitElement).length <= 0 || t.includes(e));
  }
  GetLimitRoleCountList() {
    var e = this.GetCurrentFightFormation;
    if (e) {
      var e = e.LimitCount;
      var t = e.length;
      if (t !== 0) {
        return e;
      }
    }
  }
  GetMaxLimitRoleCount() {
    var e = this.GetLimitRoleCountList();
    if (e) {
      return e[e.length - 1];
    } else {
      return 0;
    }
  }
  get GetCurrentDungeonConfig() {
    if (this.GetInstanceDungeonId) {
      return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetDungeonConfig(this.GetInstanceDungeonId);
    }
  }
  get GetCurrentFightFormation() {
    var e = this.GetCurrentDungeonConfig;
    if (e) {
      e = e.FightFormationId;
      if (e !== 0) {
        return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e);
      }
    }
  }
  CreateAllRoleSlotData() {
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var t = new EditBattleRoleSlotData_1.EditBattleRoleSlotData(e);
      this.Y3t.set(e, t);
    }
  }
  ResetAllRoleSlotData() {
    for (const e of this.Y3t.values()) {
      e.ResetRoleData();
    }
    this.e4t.clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "[EditBattleTeam]还原所有战前编队数据");
    }
  }
  HasSameConfigIdInAnyOwnRoleSlot(e) {
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.IsSelf && r.GetRoleConfigId === e) {
        return true;
      }
    }
    return false;
  }
  GetPlayerRoleNumber(e) {
    let t = 0;
    for (var [, r] of this.Y3t) {
      if (e === r.GetRoleData?.PlayerId) {
        t++;
      }
    }
    return t;
  }
  GetParentRolePositionInEditBattleTeam(e) {
    var t;
    if (this.IsTrialRole(e)) {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Id;
      if (t = this.GetSlotDataByConfigId(t)) {
        return t.GetPosition;
      } else {
        return -1;
      }
    }
    for (const a of this.GetAllRoleSlotData) {
      var r = a.GetRoleData;
      if (r) {
        r = r.GetTrialRoleConfig;
        if (r) {
          if (r.ParentId === e) {
            return a.GetPosition;
          }
        }
      }
    }
    return -1;
  }
  get GetOwnRoleCountInRoleSlot() {
    let e = 0;
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.IsSelf) {
        e++;
      }
    }
    return e;
  }
  GetRoleCountInRoleSlot() {
    let e = 0;
    for (const t of this.Y3t.values()) {
      if (t.GetRoleData) {
        e++;
      }
    }
    return e;
  }
  PrintRoleSlotsDebugString() {
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var t = this.GetRoleSlotData(e);
      if (t.HasRole) {
        t = t.GetRoleData;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 48, "[EditBattleTeam]战前编队 Position 号位的角色信息: RoleData ", ["Position", e], ["RoleData", t]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam]战前编队 Position 号位没有角色", ["Position", e]);
      }
    }
  }
  SetCurrentEditPosition(e) {
    this.J3t = e;
  }
  get GetCurrentEditRoleSlotData() {
    if (this.J3t) {
      return this.GetRoleSlotData(this.J3t);
    }
  }
  IsInEditBattleTeam(e, t = false) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const o of this.Y3t.values()) {
      var a = o.GetRoleData;
      if (a && (!t || r === a.PlayerId) && a.ConfigId === e) {
        return true;
      }
    }
    return false;
  }
  GetEditBattleTeamPositionByConfigId(e) {
    e = this.GetSlotDataByConfigId(e);
    if (e) {
      return e.GetPosition;
    } else {
      return -1;
    }
  }
  GetSlotDataByConfigId(e) {
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.ConfigId === e) {
        return r;
      }
    }
  }
  InitAllRoleSlotData() {
    var e;
    if (this.IsMultiInstanceDungeon) {
      ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarFormationDataList();
      e = ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList();
      this.InitAllMultiRoleData(e);
    } else {
      this.InitAllSingleRoleData();
    }
  }
  GetRoleSlotData(e) {
    return this.Y3t.get(e);
  }
  RefreshAllEmptySlotData() {
    for (let t = 1; t <= this.Y3t.size; t++) {
      var r = this.Y3t.get(t);
      if (r) {
        var e = r.GetRoleData;
        if (!e) {
          for (let e = t + 1; e <= this.Y3t.size; e++) {
            var a = this.Y3t.get(e);
            if (a) {
              var o = a.GetRoleData;
              if (o) {
                r.SetRoleData(o);
                a.ResetRoleData();
                break;
              }
            }
          }
        }
      }
    }
  }
  get GetAllRoleSlotData() {
    var e = [];
    for (const t of this.Y3t.values()) {
      e.push(t);
    }
    return e;
  }
  get SelfRoleSlotDataRoleIdList() {
    var e = [];
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.IsSelf && r.GetRoleConfigId) {
        e.push(r.GetRoleConfigId);
      }
    }
    return e;
  }
  SetPlayerReady(e, t) {
    for (var [, r] of this.Y3t) {
      var a;
      if (r.HasRole && (a = r.GetRoleData).PlayerId === e) {
        a.SetReady(t);
        a = r.GetPosition;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleReady, a, t);
      }
    }
  }
  get GetIsAllReady() {
    var e = this.GetAllRoleSlotData;
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var r = this.GetLeaderIsSelf;
    for (const o of e) {
      if (o.HasRole) {
        var a = o.GetRoleData;
        if (r) {
          if (t === a.PlayerId) {
            continue;
          }
        }
        if (!a.IsReady) {
          return false;
        }
      }
    }
    return true;
  }
  get HasSameRole() {
    var e = this.GetAllRoleSlotData;
    for (const o of e) {
      if (o.HasRole && o.GetRoleData.IsSelf) {
        var r = o.GetRoleData;
        let t = r.ConfigId;
        if (this.IsTrialRole(t)) {
          t = r.GetTrialRoleConfig.ParentId;
        }
        for (const i of e) {
          if (i.HasRole && o.GetPosition !== i.GetPosition) {
            var a = i.GetRoleData;
            let e = a.ConfigId;
            if (this.IsTrialRole(e)) {
              e = a.GetTrialRoleConfig.ParentId;
            }
            if (t === e) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  get HasSpecialTrialRole() {
    for (const t of this.GetAllRoleSlotData) {
      if (t.HasRole && t.GetRoleData.IsSelf) {
        var e = t.GetRoleData;
        if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(e.ConfigId)) {
          return true;
        }
      }
    }
    return false;
  }
  IsRoleConflict(e, t) {
    for (var [, r] of this.Y3t) {
      if (r && r.GetRoleData?.PlayerId !== e && r.GetRoleConfigId === t) {
        return true;
      }
    }
    return false;
  }
  get GetSelfIsReady() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarPlayerReadyState(e);
  }
  RefreshAllMultiRoleData() {
    var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList();
    var r = t.length;
    for (let e = 0; e < LIMIT_COUNT_MAX_LENGTH; e++) {
      var a = this.Y3t.get(e + 1);
      if (e + 1 > r) {
        a.ResetRoleData();
      } else {
        a.SetRoleDataByPrewarInfo(t[e]);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "刷新所有多人联机的战前编队角色数据");
  }
  InitAllMultiRoleData(e) {
    this.ResetAllRoleSlotData();
    for (const a of e) {
      var t = a.GetIndex();
      var r = this.GetRoleSlotData(t);
      if (r) {
        if (a.IsEmpty() && a.IsLeader()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 48, "[EditBattleTeam]此位置没有角色:{Position}", ["{Position}", t]);
          }
        } else if (!a.IsEmpty()) {
          t = this.CreateRoleDataFromPrewarData(a);
          r.SetRoleData(t);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 48, "[EditBattleTeam]当初始化所有联机战前编队数据时,玩家在线索引:OnlineIndex,玩家信息:PrewarFormation", ["OnlineIndex", a.GetOnlineNumber()], ["PrewarFormation", a]);
          }
          if (a.IsLeader()) {
            r = a.GetPlayerId();
            this.SetLeaderPlayerId(r);
          }
        }
      }
    }
    if (this.GetLeaderPlayerId === undefined) {
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      this.SetLeaderPlayerId(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "初始化所有多人联机的战前编队角色数据");
    this.PrintRoleSlotsDebugString();
  }
  InitAllSingleRoleData() {
    this.ResetAllRoleSlotData();
    const r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.SetLeaderPlayerId(r);
    this.InitTrailRoleInstance();
    var a = this.GetCurrentFightFormation.AutoRole;
    if (a && a.length > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam]当初始化所有单人战前编队数据时,此编队填写了自动上阵角色", ["autoRoleGroupIdList", a]);
      }
      let e = 1;
      for (const _ of a) {
        var t;
        var o = this.GetRoleSlotData(e);
        if (o) {
          if (t = this.e4t.get(_)) {
            t = this.CreateRoleDataFromRoleInstance(t);
            o.SetRoleData(t);
            e++;
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Formation", 48, "[EditBattleTeam]自动上阵角色配置的角色Id不在试用角色列表中", ["autoRoleGroupConfigId", _]);
          }
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "自动上阵指定临时角色");
      this.PrintRoleSlotsDebugString();
    } else if (this.HasAnyLimit()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 48, "[EditBattleTeam]单人战前编队存在编队限制,将不会读取编队数据初始化");
      }
    } else {
      let t = undefined;
      if (ModelManager_1.ModelManager.DangoAbyssModel?.GetInAbyssFlow()) {
        let e = [];
        if (ModelManager_1.ModelManager.DangoAbyssModel.GetFormationSelectRoleList(ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId).length !== 0) {
          e = ModelManager_1.ModelManager.DangoAbyssModel.GetFormationSelectRoleList(ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId);
        } else if (ModelManager_1.ModelManager.DangoAbyssModel.GetFormationSelectRoleList(ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId - 1).length !== 0) {
          e = ModelManager_1.ModelManager.DangoAbyssModel.GetFormationSelectRoleList(ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId - 1);
        }
        var i = ModelManager_1.ModelManager.EditBattleTeamModel?.GetRoleList();
        t = [];
        for (const M of e) {
          if (i?.find(e => e.GetDataId() === M)) {
            t.push(M);
          }
        }
      }
      if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
        a = ModelManager_1.ModelManager.TowerModel.GetFloorFormation(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor);
        let e = undefined;
        e = !ModelManager_1.ModelManager.TowerModel.CheckInTower() || a?.length > 0 ? a : ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation;
        EditBattleTeamController_1.EditBattleTeamController.ResetSlotDataThenSetEditBattleTeamByRoleId(e);
      } else if (ModelManager_1.ModelManager.DangoAbyssModel?.GetInAbyssFlow() && t && t?.length > 0) {
        EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(t);
      } else {
        let e = 1;
        var n = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        const r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        var l = ModelManager_1.ModelManager.RoleModel;
        for (const u of ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetRoleDataMap().values()) {
          var s;
          var f;
          var d;
          var h = u.ConfigId;
          var g = u.RoleSkinId;
          if (!(h <= 0) && r === u.PlayerId && !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Formation", 48, "[EditBattleTeam]当初始化所有单人战前编队数据时,编队位置:{Position},角色Id:{ConfigId},玩家Id:{PlayerId}", ["{Position}", e], ["{ConfigId}", h], ["{PlayerId}", u.PlayerId]), (s = this.GetMaxLimitRoleCount()) > 0 && e > s)) {
            s = this.GetRoleSlotData(e);
            if (this.CanAddRoleToEditTeam(h)) {
              f = new EditBattleRoleData_1.EditBattleRoleData();
              d = l.GetRoleDataById(h)?.GetLevelData().GetLevel() ?? 0;
              f.Init(r, h, g, 1, n, d, true, true);
              s.SetRoleData(f);
              e++;
            }
          }
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "初始化所有单人的战前编队角色数据");
      this.PrintRoleSlotsDebugString();
    }
  }
  CreateRoleDataFromPrewarData(e) {
    var t = e.GetConfigId();
    var r = e.GetSkinId();
    var a = e.GetOnlineNumber();
    var o = e.GetPlayerName();
    var i = e.GetPlayerId();
    var n = e.GetLevel();
    var l = e.IsSelf();
    var s = e.GetIsReady();
    var f = new EditBattleRoleData_1.EditBattleRoleData();
    f.Init(i, t, r, a, o, n, l, s);
    f.ThirdPartyOnlineId = e.GetPlayerOnlineId();
    return f;
  }
  CreateRoleDataFromRoleInstance(e) {
    var t = e.GetDataId();
    var r = e.GetLevelData();
    var e = e.GetRoleSkinId();
    var a = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName();
    var r = r.GetLevel();
    var i = this.GetSelfIsReady;
    var n = new EditBattleRoleData_1.EditBattleRoleData();
    n.Init(a, t, e, 1, o, r, true, i);
    return n;
  }
  IsTrialRole(e) {
    return e > RoleDefine_1.ROBOT_DATA_MIN_ID;
  }
  ChangeMainRoleData() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var e = ModelManager_1.ModelManager.RoleModel;
      for (const o of this.Y3t.values()) {
        var t;
        var r = o.GetRoleData;
        var a = r?.ConfigId;
        if (a && !this.IsTrialRole(a) && e.IsMainRole(a) && (t = e.GetNewMainRoleId(a)) && a !== t) {
          r.ConfigId = t;
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, "单机更换主角色");
    }
  }
}
exports.EditBattleTeamModel = EditBattleTeamModel;
//# sourceMappingURL=EditBattleTeamModel.js.map