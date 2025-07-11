"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SolarSpeedDefine_1 = require("../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine");
const InstanceDungeonData_1 = require("./Define/InstanceDungeonData");
class InstanceDungeonEntranceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.qhi = 0;
    this.Ghi = 0;
    this.Nhi = 0;
    this.Ohi = 0;
    this.khi = undefined;
    this.Fhi = new Array();
    this.Vhi = 0;
    this.Hhi = new Map();
    this.qUc = new Map();
    this.GUc = new Set();
    this.jhi = new Map();
    this.Whi = new Array();
    this.Khi = 0;
    this.Qhi = 0;
    this.Xhi = undefined;
    this.OnStopTimer = undefined;
    this.OnStopHandle = undefined;
    this.$hi = 0;
    this.Yhi = false;
    this.E0 = 0;
  }
  OnLeaveLevel() {
    var e = this.GetMatchingId();
    if (e !== 0 && this.GetMatchingState() === 1) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.HandleTipsExitMatchId = e;
    }
    this.CancelMatchingTimer();
    return true;
  }
  get EntranceId() {
    return this.qhi;
  }
  set EntranceId(e) {
    this.qhi = e;
  }
  get InstanceId() {
    return this.Ghi;
  }
  set InstanceId(e) {
    this.Ghi = e;
  }
  get SelectInstanceId() {
    return this.Nhi;
  }
  set SelectInstanceId(e) {
    this.Nhi = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectInstance);
  }
  get LastInstanceId() {
    return this.Ohi;
  }
  set LastInstanceId(e) {
    this.Ohi = e;
  }
  get TransitionOption() {
    return this.khi;
  }
  set TransitionOption(e) {
    this.khi = e;
  }
  get EntranceInstanceIdList() {
    return this.Fhi;
  }
  set EntranceInstanceIdList(e) {
    this.Fhi = e;
  }
  get EntranceEndTime() {
    return this.Vhi;
  }
  set EntranceEndTime(e) {
    this.Vhi = e;
  }
  GetInstanceResetTime(e) {
    return this.Hhi.get(e);
  }
  SetInstanceResetTime(e, t) {
    this.Hhi.set(e, t);
  }
  GetDungeonArchiveType(e) {
    return this.qUc.get(e) ?? Protocol_1.Aki.Protocol.tUc.Proto_NoneArchive;
  }
  IsDungeonArchiveExpire(e) {
    e = this.GetDungeonArchiveType(e);
    return e !== Protocol_1.Aki.Protocol.tUc.Proto_NormalArchive && e !== Protocol_1.Aki.Protocol.tUc.Proto_NoneArchive;
  }
  GetDungeonArchiveExpireLocalTips(e) {
    var t = this.GetDungeonArchiveType(e);
    if (t === Protocol_1.Aki.Protocol.tUc.Proto_OverdueTime) {
      return "instance_Record_Clear1";
    } else if (t === Protocol_1.Aki.Protocol.tUc.Proto_OverdueVersion) {
      return "instance_Record_Clear2";
    } else if (t === Protocol_1.Aki.Protocol.tUc.Proto_OverdueChangeSex) {
      return "instance_Record_Clear3";
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("InstanceDungeon", 63, "副本入口->获取副本存档文本提示失败，出现了未处理的存档类型", ["dungeonId", e], ["archiveType", t]);
      }
      return "";
    }
  }
  HasDungeonArchive(e) {
    return this.GetDungeonArchiveType(e) === Protocol_1.Aki.Protocol.tUc.Proto_NormalArchive;
  }
  IsDungeonSupportArchive(e) {
    return !(e <= 0) && (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.SaveDays ?? 0) > 0;
  }
  IsDungeonSupportAndWithoutArchive(e) {
    var t = this.IsDungeonSupportArchive(e);
    var e = this.HasDungeonArchive(e);
    return t && !e;
  }
  IsDungeonArchiveActivate(e) {
    return !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() && this.IsDungeonSupportArchive(e);
  }
  SetDungeonArchiveInfo(e, t) {
    this.qUc.set(e, t);
  }
  IsDungeonArchiveExpireTipsShow(e) {
    return this.GUc.has(e) ?? false;
  }
  SetDungeonArchiveExpireTipsShow(e) {
    this.GUc.add(e);
  }
  ClearDungeonArchiveInfo() {
    this.qUc.clear();
    this.GUc.clear();
  }
  get SettleRewardItemList() {
    return this.Whi;
  }
  get IsNeedErrorCodeForEnterInstance() {
    return this.EntranceId !== 9000;
  }
  GetInstanceData(e) {
    var t;
    if (e) {
      return this.jhi.get(e) || (t = new InstanceDungeonData_1.InstanceDungeonData(e), this.jhi.set(e, t), t);
    }
  }
  SetInstanceData(t) {
    var n = t.s5n;
    if (n) {
      let e = this.jhi.get(n);
      if (!e) {
        e = new InstanceDungeonData_1.InstanceDungeonData(n);
        this.jhi.set(n, e);
      }
      e.ChallengedTimes = t.vws;
    }
  }
  get MatchingTime() {
    return this.Qhi;
  }
  set MatchingTime(e) {
    this.Qhi = e;
  }
  MatchingTimeIncrease() {
    this.Qhi++;
  }
  get MatchingTimer() {
    return this.Xhi;
  }
  set MatchingTimer(e) {
    this.Xhi = e;
  }
  CancelMatchingTimer() {
    if (this.MatchingTimer !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.MatchingTimer);
    }
    if (this.OnStopHandle) {
      this.OnStopHandle();
    }
    this.OnStopTimer = undefined;
    this.OnStopHandle = undefined;
    this.MatchingTimer = undefined;
    this.SetMatchingState(0);
    this.SetMatchingId(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }
  GetMatchingState() {
    return this.Khi;
  }
  SetMatchingState(e) {
    this.Khi = e;
  }
  GetMatchingId() {
    return this.$hi;
  }
  SetMatchingId(e) {
    this.$hi = e;
  }
  InitInstanceDataList(e) {
    if (e) {
      for (const t of e) {
        this.SetInstanceData(t);
      }
    }
  }
  GetInstancePowerCost(e) {
    if (!(e <= 0) && !((e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId) <= 0) && (e = ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(e)) && e.Cost) {
      return e.Cost.get(5);
    } else {
      return 0;
    }
  }
  get EditBattleTeamMatching() {
    return this.Yhi;
  }
  SetEditBattleTeamMatching(e) {
    this.Yhi = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MatchTeamFlagChange, e);
  }
  SyncSettleRewardItemList(e) {
    this.Whi.length = 0;
    for (const n of Object.keys(e)) {
      var t = e[n]?.O9n;
      if (t) {
        for (const r of t) {
          this.Whi.push([{
            IncId: 0,
            ItemId: r.L8n
          }, r.m9n]);
        }
      }
    }
  }
  GetSortedEntranceInstanceIdList(e) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)?.InstanceDungeonList;
    if (e) {
      var t = [];
      for (const n of e) {
        if (this.CheckInstanceCanChallenge(n)) {
          t.push(n);
        }
      }
      return t;
    }
  }
  GetSortedByTitleEntranceInstanceIdList(e) {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList;
    if (t) {
      var n;
      var r = new Map();
      for (const i of t) {
        n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i).Title;
        r.set(i, n);
      }
      return r;
    }
  }
  CheckInstanceFinished(e) {
    var t;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).EnterControlId;
    return !!e && (t = this.GetInstanceData(e).ChallengedTimes, ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(e).EnterCount <= t);
  }
  CheckInstanceCanChallenge(e) {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).EnterControlId;
    return !e || !(e = this.GetInstanceData(e)) || e.CanChallenge;
  }
  CheckInstanceLevelTooLow(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.DropVisionLimit;
    return !!t && !!(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e)) && ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel > e[1] + t;
  }
  CheckInstanceCanReward(e) {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).EnterControlId;
    return !e || !(e = this.GetInstanceData(e)) || e.CanReward;
  }
  CheckInstanceUnlock(e) {
    var t;
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(e);
    if (n) {
      switch (n[0]) {
        case 1:
          return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0) >= n[1];
        case 2:
          return ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel >= n[1];
        case 3:
          if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(n[1]) === 3) {
            return true;
          } else {
            return !!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n[1]))?.IsProgressing && (t.GetNode(n[2])?.IsSuccess ?? false);
          }
        case 4:
          return ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(n[1]) ?? false;
        case 5:
          return ModelManager_1.ModelManager.ActivityModel.GetActivityLevelUnlockState(n[1], n[2]);
        case 6:
          return ModelManager_1.ModelManager.TowerDefenseModel.GetInstanceUnlockState(n[1], n[2]);
        default:
          return true;
      }
    }
    return true;
  }
  get EntranceEntityId() {
    return this.E0;
  }
  set EntranceEntityId(e) {
    this.E0 = e;
  }
  GetInstanceDungeonReward(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(e);
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(e);
    var r = n && n > 0;
    var i = t && t > 0;
    var e = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e);
    var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(n) ?? [];
    var t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t) ?? [];
    if (r && i) {
      if (e) {
        return [t, false];
      } else {
        return [n.concat(t), false];
      }
    } else if (i) {
      return [t, false];
    } else {
      return [n, e];
    }
  }
  IsMowingInstanceDungeon() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 19;
  }
  IsFarmGoldInstanceDungeon() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 25;
  }
  IsSpecificInstanceDungeonBySubType(e) {
    return !!this.SelectInstanceId && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.SelectInstanceId)?.InstSubType === e;
  }
  GetUnlockTextIdById(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e);
    if (t !== undefined) {
      if (t === SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID) {
        return ModelManager_1.ModelManager.SolarSpeedModel.GetInstanceUnlockTextIdByInstanceId(e);
      } else {
        return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockConditionGroupHintText(e);
      }
    }
  }
  GetUnlockArgsById(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e);
    if (t !== undefined && t === SolarSpeedDefine_1.SOLAR_SPEED_INSTANCE_ENTRANCE_ID) {
      return ModelManager_1.ModelManager.SolarSpeedModel.GetInstanceUnlockArgsByInstanceId(e);
    } else {
      return undefined;
    }
  }
}
exports.InstanceDungeonEntranceModel = InstanceDungeonEntranceModel;
//# sourceMappingURL=InstanceDungeonEntranceModel.js.map