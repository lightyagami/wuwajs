"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PrewarFormationData_1 = require("./Define/PrewarFormationData");
const InstanceDungeonInfo_1 = require("./InstanceDungeonInfo");
const MATCHINGTEAMSIZE = 3;
class InstanceDungeonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.FUc = false;
    this.R1i = undefined;
    this.U1i = new Map();
    this.A1i = new Array();
    this.P1i = new Map();
    this.x1i = undefined;
    this.w1i = new Map();
    this.InstanceFinishSuccess = 0;
    this.InstanceRewardHaveTake = false;
    this.B1i = undefined;
    this.b1i = undefined;
    this.q1i = undefined;
    this.CurrentInstanceIsFinish = false;
    this.HidePowerLackConfirmBox = false;
    this.InstanceEnterContentText = new Protocol_1.Aki.Protocol.$ah();
    this.TrialRoleDungeonWhiteList = [];
    this.TR1 = new Set();
  }
  OnLeaveLevel() {
    this.B1i?.SetTrack(false);
    this.InstanceFinishSuccess = 0;
    this.InstanceRewardHaveTake = false;
    this.ClearInstanceDungeonInfo();
    return true;
  }
  GetInstanceId() {
    return this.NUe;
  }
  SetInstanceId(t) {
    this.NUe = t;
  }
  get InstanceContinue() {
    return this.FUc;
  }
  set InstanceContinue(t) {
    this.FUc = t;
  }
  SetMatchTeamInfo(t) {
    this.R1i = t;
  }
  GetMatchTeamInfo() {
    return this.R1i;
  }
  SetMatchTeamHost(t) {
    this.R1i.qVn = t;
  }
  SetMatchTeamState(t) {
    this.R1i.P9n = t;
  }
  GetMatchTeamName(t) {
    for (const e of this.R1i.TRs) {
      if (e.W5n === t) {
        return e.JMs;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", ["队员Id", t]);
    }
  }
  GetMatchTeamOnlineId(t) {
    for (const e of this.R1i.TRs) {
      if (e.W5n === t) {
        return e.Qxa;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 5, "获取匹配副本队伍队员信息失败", ["队员Id", t]);
    }
  }
  GetMatchTeamRoleCfgId(t) {
    var e = [];
    for (const r of this.R1i.TRs) {
      if (r.W5n === t) {
        for (const a of r.J6n) {
          e.push(a.Q6n);
        }
      }
    }
    return e;
  }
  IsMatchTeamHost() {
    return ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.R1i?.qVn;
  }
  IsTeamNotFull() {
    return this.G1i() < MATCHINGTEAMSIZE;
  }
  GetNeedMatchSize() {
    return MATCHINGTEAMSIZE - this.G1i();
  }
  G1i() {
    var t = this.R1i.TRs;
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return t.length;
    }
    var e = ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer();
    let r = t.length + e.length;
    for (const a of e) {
      for (const n of t) {
        if (a === n.W5n) {
          r--;
        }
      }
    }
    return r;
  }
  IsAllPlayerInMatchTeam() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return true;
    }
    var t = [];
    for (const r of this.R1i.TRs) {
      t.push(r.W5n);
    }
    let e = true;
    for (const a of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()) {
      if (!t.includes(a)) {
        e = false;
      }
    }
    return e;
  }
  InitMatchingTeamConfirmReadyState(t) {
    for (const e of t) {
      this.U1i.set(e.W5n, e.ybs);
      this.P1i.set(e.W5n, e.D9n);
      for (const r of this.A1i) {
        if (r.GetPlayerId() === e.W5n) {
          r.SetIsReady(e.D9n);
        }
      }
    }
  }
  SetMatchingPlayerConfirmState(t, e) {
    this.U1i.set(t, e);
  }
  GetMatchingPlayerConfirmStateByPlayerId(t) {
    return this.U1i.get(t);
  }
  GetMatchingTeamReady() {
    return this.R1i.P9n === Protocol_1.Aki.Protocol.B5s.Proto_ReadyConfirm;
  }
  GetPlayerUiState(t) {
    for (const e of this.R1i.TRs) {
      if (e.W5n === t) {
        return e.w9n;
      }
    }
    return Protocol_1.Aki.Protocol.G5s.Proto_Wait;
  }
  SetPlayerUiState(t, e) {
    for (const r of this.R1i.TRs) {
      if (r.W5n === t) {
        r.w9n = e;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshPlayerUiState, t);
  }
  SetPrewarPlayerReadyState(t, e) {
    this.P1i.set(t, e);
    for (const r of this.A1i) {
      if (r.GetPlayerId() === t) {
        r.SetIsReady(e);
      }
    }
  }
  RemovePrewarPlayerReadyState(t) {
    this.P1i.delete(t);
  }
  ClearPrewarPlayerReadyState() {
    this.P1i.clear();
  }
  RemoveMatchingTeamConfirmState(t) {
    this.U1i.delete(t);
  }
  ClearMatchingTeamConfirmState() {
    this.U1i.clear();
  }
  GetPrewarPlayerReadyState(t) {
    t = this.P1i.get(t);
    return t || false;
  }
  Kzs(t, e) {
    t.SetLevel(e.Ebs);
    t.SetConfigId(e.Q6n);
    t.SetSkinId(e.eI_);
  }
  SetPrewarFormationDataList() {
    this.ClearPrewarData();
    var t = this.GetMatchTeamInfo();
    if (t) {
      for (const r of t.TRs) {
        for (const a of r.J6n) {
          var e = new PrewarFormationData_1.PrewarFormationData();
          e.SetPlayerId(r.W5n);
          e.SetIsReady(this.GetPrewarPlayerReadyState(r.W5n));
          e.SetLife(1);
          e.SetMaxLife(1);
          this.Kzs(e, a);
          this.A1i.push(e);
        }
      }
      this.N1i();
    }
  }
  AddPrewarFormationDataByPlayerInfo(t, e = true) {
    if (e) {
      this.R1i.TRs.push(t);
    }
    for (const a of t.J6n) {
      var r = new PrewarFormationData_1.PrewarFormationData();
      r.SetPlayerId(t.W5n);
      r.SetIsReady(this.GetPrewarPlayerReadyState(t.W5n));
      r.SetLife(1);
      r.SetMaxLife(1);
      this.Kzs(r, a);
      this.A1i.push(r);
    }
    this.N1i();
  }
  N1i() {
    var t = this.GetMatchTeamInfo().qVn;
    let e = 1;
    let r = 1;
    for (const a of this.A1i) {
      if (a.GetPlayerId() === t) {
        a.SetIndex(e++);
        a.SetOnlineNumber(r);
      }
    }
    r++;
    for (const n of this.A1i) {
      if (n.GetPlayerId() !== t) {
        n.SetIndex(e++);
        n.SetOnlineNumber(r++);
      }
    }
    this.A1i.sort((t, e) => t.GetIndex() - e.GetIndex());
  }
  SetMatchTeamInfoPlayerRole(t, e) {
    for (const n of this.R1i.TRs) {
      var r;
      var a;
      if (n.W5n === t && (r = n.J6n.length, a = e.length, n.J6n = e, r === a && this.O1i(n), r < a && (this.k1i(t), this.AddPrewarFormationDataByPlayerInfo(n, false)), a < r)) {
        this.F1i(n);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PrewarFormationChanged);
  }
  GetPrewarFormationDataList() {
    return this.A1i;
  }
  RemovePrewarFormationDataByPlayer(e) {
    let r = false;
    for (let t = this.A1i.length - 1; t >= 0; --t) {
      if (this.A1i[t].GetPlayerId() === e) {
        r = true;
        this.A1i.splice(t, 1);
        this.RemovePrewarPlayerReadyState(e);
        this.RemoveMatchingTeamConfirmState(e);
      }
    }
    for (let t = this.R1i.TRs.length - 1; t >= 0; --t) {
      var a = this.R1i.TRs[t];
      if (a && a.W5n === e) {
        r = true;
        this.R1i.TRs.splice(t, 1);
      }
    }
    this.N1i();
    return r;
  }
  O1i(e) {
    var r = this.A1i.length;
    let a = 0;
    for (let t = 0; t < r; t++) {
      var n;
      var o = this.A1i[t];
      if (e.W5n === o.GetPlayerId()) {
        n = e.J6n[a++];
        this.Kzs(o, n);
      }
    }
  }
  F1i(t) {
    var r = t.W5n;
    var a = t.J6n;
    for (let e = this.A1i.length - 1; e >= 0; --e) {
      var n = this.A1i[e];
      if (n.GetPlayerId() === r) {
        let t = false;
        for (const o of a) {
          if (o.Q6n === n.GetConfigId()) {
            t = true;
            break;
          }
        }
        if (!t) {
          this.A1i.splice(e, 1);
        }
      }
    }
    this.N1i();
  }
  k1i(e) {
    for (let t = this.A1i.length - 1; t >= 0; --t) {
      if (this.A1i[t].GetPlayerId() === e) {
        this.A1i.splice(t, 1);
      }
    }
  }
  IsInPrewarFormation(t) {
    for (const e of this.A1i) {
      if (e.GetPlayerId() === t) {
        return true;
      }
    }
    return false;
  }
  ClearPrewarData() {
    this.A1i.length = 0;
  }
  MatchingPlayerCount() {
    return this.U1i.size;
  }
  get FormationAverageRoleLevel() {
    let t = 0;
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    if (!e) {
      return 0;
    }
    let r = 0;
    for (const a of e) {
      if (a.GetRoleData) {
        t += a.GetRoleData?.Level ?? 0;
        r++;
      }
    }
    if (r) {
      return t /= r;
    } else {
      return 0;
    }
  }
  CheckPrewarFormationAverageLowLevel(t) {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t).FightFormationId;
    if (e) {
      e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e);
      if (e.AutoRole.length > 0 && e.TrialRole.length > 0) {
        return false;
      }
    }
    var e = this.FormationAverageRoleLevel;
    var [r, a] = ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(t);
    if (r) {
      return e < ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(t, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel, a);
    } else {
      return e < ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(t, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    }
  }
  GetInstanceBeInviteDataList() {
    return this.x1i;
  }
  AddInstanceBeInviteData(t) {
    if (t) {
      if (this.x1i) {
        this.RemoveInstanceBeInviteData(t.GetPlayerId());
      } else {
        this.x1i = new Array();
      }
      this.x1i.push(t);
    }
  }
  RemoveInstanceBeInviteData(e) {
    for (let t = 0; t < this.x1i.length; t++) {
      if (this.x1i[t].GetPlayerId() === e) {
        this.x1i.splice(t, 1);
        return true;
      }
    }
    return false;
  }
  GetInvitePlayerCd(t) {
    t = this.w1i.get(t);
    return t || 0;
  }
  SetInvitePlayerCd(t, e) {
    this.w1i.set(t, e);
  }
  CreateInstanceInfo(t) {
    this.B1i = new InstanceDungeonInfo_1.InstanceDungeonInfo(t);
    this.B1i.InitConfig();
    return this.B1i;
  }
  ClearInstanceDungeonInfo() {
    var t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InstanceDungeon", 27, "尝试清除副本行为树");
    }
    if (this.B1i) {
      t = this.B1i;
      this.B1i = undefined;
      t.Destroy();
    }
  }
  GetInstanceDungeonInfo() {
    return this.B1i;
  }
  ResetData() {
    this.ClearPrewarData();
    this.ClearPrewarPlayerReadyState();
    this.ClearMatchingTeamConfirmState();
    this.R1i = undefined;
  }
  get LastEnterRoleList() {
    return this.b1i;
  }
  set LastEnterRoleList(t) {
    this.b1i = t;
  }
  SetInstanceDungeonName(t) {
    this.q1i = t;
  }
  GetInstanceDungeonName() {
    return this.q1i;
  }
  ConstructCurrentDungeonAreaName() {
    this.q1i = undefined;
    if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
      this.SetInstanceDungeonName(ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName());
    }
  }
  ClearInstanceEnterContentText() {
    this.InstanceEnterContentText = new Protocol_1.Aki.Protocol.$ah();
  }
  ParseExitDungeonConfirmData(t) {
    t = t.ExitDungeonConfirmId;
    return {
      ParseRuleType: t.length > 0 ? t[0] : 0,
      UnfinishedBoxId: t.length > 1 ? t[1] : undefined,
      FinishBoxId: t.length > 2 ? t[2] : undefined,
      UnfinishedTelBoxId: t.length > 3 ? t[3] : undefined,
      FinishTelBoxId: t.length > 4 ? t[4] : undefined
    };
  }
  GetCurrentDungeonExitConfirmData() {
    var t = this.ParseExitDungeonConfirmData(ModelManager_1.ModelManager.GameModeModel.InstanceDungeon);
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.InstSubType;
    if (t.ParseRuleType === 0 && (r === 1 || r === 2 || r === 16) && !(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportArchive(e) ? (t.UnfinishedBoxId ||= 284, t.UnfinishedTelBoxId ||= 284) : (t.UnfinishedBoxId ||= 285, t.UnfinishedTelBoxId ||= 285), t.FinishBoxId ||= 290, t.FinishTelBoxId)) {
      t.FinishTelBoxId = 290;
    }
    return t;
  }
  GetCurrentDungeonExitConfirmId() {
    var t = this.GetCurrentDungeonExitConfirmData();
    if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess) {
      return t.FinishBoxId;
    } else {
      return t.UnfinishedBoxId;
    }
  }
  GetCurrentDungeonTelExitConfirmId() {
    var t = this.GetCurrentDungeonExitConfirmData();
    if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess) {
      return t.FinishTelBoxId;
    } else {
      return t.UnfinishedTelBoxId;
    }
  }
  ClearInstanceIdsWithSaveData() {
    this.TR1.clear();
  }
  AddInstanceIdsWithSaveData(...t) {
    for (const e of t) {
      this.TR1.add(e);
    }
  }
  GetIfInstanceHasSaveData(t) {
    return this.TR1.has(t);
  }
}
exports.InstanceDungeonModel = InstanceDungeonModel;
//# sourceMappingURL=InstanceDungeonModel.js.map