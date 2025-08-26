"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMapTravelData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
const ActivityMapTravelDefine_1 = require("./ActivityMapTravelDefine");
class ActivityMapTravelData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.TravelLevelData = new Map();
    this.TravelLevel = 0;
    this.tVl = 0;
    this.iVl = 0;
    this.rVl = 0;
    this.AreaDataMap = new Map();
    this.AreaTaskMap = new Map();
    this.TaskFinalRewardData = undefined;
    this.PhantomQuestIds = new Set();
    this.SortPhantomQuestItem = (t, e) => {
      var r = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(t);
      var i = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(e);
      if (r.Sort === i.Sort) {
        return t - e;
      } else {
        return r.Sort - i.Sort;
      }
    };
    this.PhantomDataMap = new Map();
    this.SoarChallengeRewardDataMap = new Map();
    this.SoarChallengePlayDataMap = new Map();
    this.CheckSoarItemRedDot = t => {
      for (const e of t) {
        if (this.SoarChallengeRewardDataMap.get(e).Status === 0) {
          return true;
        }
      }
      return false;
    };
    this.CheckSoarItemFinished = t => {
      for (const e of t) {
        if (this.SoarChallengeRewardDataMap.get(e).Status !== 2) {
          return false;
        }
      }
      return true;
    };
  }
  OnInit(t) {
    this.oVl();
    this.nVl();
    this.sVl();
    this.aVl();
    this.hVl();
    t = t.KS_;
    if (t) {
      this.TravelLevel = t.fE_;
      this.tVl = t.fE_;
      this.rVl = this.GetCurrentExp();
      this.iVl = this.GetExpItemCount();
    }
  }
  PhraseEx(t) {
    t = t.KS_;
    if (t) {
      this.RefreshMapTravelData(t);
    }
  }
  RefreshMapTravelData(t) {
    this.TravelLevel = t.fE_;
    for (const e of t.CE_) {
      this.UnlockAreaData(e);
    }
    for (const r of t.E$s) {
      this.RefreshTravelTaskData(r);
    }
    this.TaskFinalRewardData.IsReceived = t.mE_;
    for (const i of t.dE_) {
      this.UnlockPhantom(i);
    }
    for (const a of t.gE_) {
      this.RefreshSoarChallengePlayData(a);
    }
  }
  GetExDataRedPointShowState() {
    return !!this.CanTravelLevelUp() || !!this.GetTaskRedDotState(true) || !!this.GetAllSoarItemRedDot();
  }
  GetExDataFinishShowState() {
    if (this.MaxTravelLevel !== this.TravelLevel) {
      return false;
    }
    if (this.TaskFinalRewardData && !this.TaskFinalRewardData.IsReceived) {
      return false;
    }
    for (const r of this.AreaTaskMap.values()) {
      if (r.Status !== 2) {
        return false;
      }
    }
    var [t, e] = this.GetPhantomQuestCount();
    if (t !== e) {
      return false;
    }
    for (const i of this.SoarChallengeRewardDataMap.values()) {
      if (i.Status !== 2) {
        return false;
      }
    }
    return true;
  }
  SaveFirstCheckRedDotState(t, e = 0) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, t, e, 0) === 1 || (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, t, e, 0, 1), this.RefreshActivityRedDotState(), false);
  }
  GetTypeProgress(t) {
    let [e, r] = [0, 1];
    switch (t) {
      case 1:
        e = this.GetFinishedAreaTaskCount();
        r = this.AreaTaskMap.size;
        break;
      case 2:
        [e, r] = this.GetPhantomQuestCount();
        break;
      case 3:
        for (const i of this.PhantomDataMap.values()) {
          if (i) {
            e++;
          }
        }
        r = this.PhantomDataMap.size;
        break;
      case 4:
        for (const a of this.SoarChallengeRewardDataMap.values()) {
          if (a.Status === 2) {
            e++;
          }
        }
        r = this.SoarChallengeRewardDataMap.size;
    }
    return [e, r];
  }
  GetTypeRedDotState(t) {
    switch (t) {
      case 1:
        return this.GetTaskRedDotState(false);
      case 4:
        return this.GetAllSoarItemRedDot();
    }
    return false;
  }
  GetTypeNewState(t) {
    switch (t) {
      case 1:
        return this.GetAllAreaNewUnlockState();
      case 2:
        return this.GetAllPhantomQuestNewState();
      case 3:
        return this.GetAllPhantomNewUnlockState();
      case 4:
        return this.RefreshAndGetAllSoarItemNewUnlock();
    }
    return false;
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetActivityConfig(this.Id);
  }
  lVl() {
    return (t, e) => t.Status === e.Status ? t.Id - e.Id : t.Status - e.Status;
  }
  get LastTravelLevel() {
    var t = this.tVl;
    this.tVl = this.TravelLevel;
    return t;
  }
  get LastCurrentExpCount() {
    var t = this.rVl;
    this.rVl = this.GetCurrentExp();
    return t;
  }
  get LastExpCount() {
    var t = this.iVl;
    this.iVl = this.GetExpItemCount();
    return t;
  }
  get MaxTravelLevel() {
    return this.GetActivityConfig().MaxLevel;
  }
  oVl() {
    this.TravelLevelData.clear();
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllLevelExpConfig(this.Id)) {
      var e = {
        Id: r.Id,
        Level: r.Level,
        AccumulateExp: t,
        TargetExp: r.NeedExp
      };
      this.TravelLevelData.set(r.Level, e);
      t += r.NeedExp;
    }
  }
  GetExpItemCount() {
    var t = this.GetActivityConfig().ExpItemId;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
  }
  GetCurrentExp() {
    return this.GetExpItemCount() - this.TravelLevelData.get(this.TravelLevel).AccumulateExp;
  }
  GetCurrentTargetExp() {
    var t = this.MaxTravelLevel === this.TravelLevel;
    var e = this.TravelLevelData.get(this.TravelLevel);
    if (t) {
      return e.AccumulateExp;
    } else {
      return e.TargetExp;
    }
  }
  CanTravelLevelUp() {
    var t;
    var e;
    return this.MaxTravelLevel !== this.TravelLevel && (t = this.GetExpItemCount(), (e = this.TravelLevelData.get(this.TravelLevel)).AccumulateExp + e.TargetExp <= t);
  }
  nVl() {
    this.AreaDataMap.clear();
    this.TaskFinalRewardData = new ActivityMapTravelDefine_1.FinalTravelTaskData();
    var t = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllTravelTaskConfig(this.Id);
    this.TaskFinalRewardData.Target = t.length;
    var t = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllAreaConfig(this.Id);
    for (const r of t) {
      var e = new ActivityMapTravelDefine_1.MapTravelAreaData(r.Id);
      this.AreaDataMap.set(r.Id, e);
    }
  }
  UnlockAreaData(t) {
    t = this.AreaDataMap.get(t);
    if (t) {
      t.IsUnlock = true;
    }
  }
  GetAllAreaData() {
    return Array.from(this.AreaDataMap.values()).sort((t, e) => {
      var r = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAreaConfig(t.AreaId);
      var i = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAreaConfig(e.AreaId);
      if (r.Sort === i.Sort) {
        return t.AreaId - e.AreaId;
      } else {
        return r.Sort - i.Sort;
      }
    });
  }
  GetAllAreaNewUnlockState() {
    for (const t of this.AreaDataMap.keys()) {
      if (this.GetAreaNewUnlockState(t)) {
        return true;
      }
    }
    return false;
  }
  RefreshTravelTaskData(i) {
    let t = this.AreaTaskMap.get(i.s5n);
    var e;
    if (!t) {
      t = new ActivityCommonDefine_1.ActivityTaskData();
      e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetTravelTaskConfig(i.s5n);
      this.AreaDataMap.get(e.AreaId).TravelTaskIdSet.add(i.s5n);
      this.AreaTaskMap.set(i.s5n, t);
    }
    t.Refresh(i, (t, e, r) => {
      if (t && r === 2) {
        this.TaskFinalRewardData.FinishedIdSet.add(i.s5n);
      }
    });
  }
  SetTravelTaskDataDone(t) {
    this.AreaTaskMap.get(t).Status = 2;
    this.TaskFinalRewardData.FinishedIdSet.add(t);
  }
  IsAreaTaskFinish(t) {
    for (const e of this.AreaDataMap.get(t).TravelTaskIdSet) {
      if (this.AreaTaskMap.get(e).Status !== 2) {
        return false;
      }
    }
    return true;
  }
  GetFinishedAreaTaskCount() {
    let t = 0;
    for (const e of this.AreaTaskMap.values()) {
      if (e.Status === 2) {
        t++;
      }
    }
    return t;
  }
  GetAreaTaskDataList(t) {
    var e = [];
    for (const i of this.AreaDataMap.get(t).TravelTaskIdSet) {
      var r = this.AreaTaskMap.get(i);
      e.push(r);
    }
    e.sort(this.lVl());
    return e;
  }
  GetAreaNewUnlockState(t) {
    var e = this.AreaDataMap.get(t).IsUnlock;
    var r = this.AreaDataMap.get(t).TravelTaskIdSet.size > 0;
    var i = this.IsAreaTaskFinish(t);
    return !!e && !i && !!r && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 5, t, 0) === 0;
  }
  GetAreaRewardState(t) {
    t = this.AreaDataMap.get(t);
    if (t.IsUnlock) {
      for (const e of t.TravelTaskIdSet) {
        if (this.AreaTaskMap.get(e).Status === 0) {
          return true;
        }
      }
    }
    return false;
  }
  GetTaskRedDotState(t = false) {
    if (this.TaskFinalRewardData && this.TaskFinalRewardData.CanReceive()) {
      return true;
    }
    for (const e of this.AreaDataMap.keys()) {
      if (t && this.GetAreaNewUnlockState(e)) {
        return true;
      }
      if (this.GetAreaRewardState(e)) {
        return true;
      }
    }
    return false;
  }
  sVl() {
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(this.Id)) {
      this.AreaDataMap.get(t.AreaId).PhantomTaskIdSet.add(t.Id);
      this.PhantomQuestIds.add(t.Id);
    }
  }
  GetPhantomQuestCount() {
    var t = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(this.Id);
    let e = 0;
    for (const r of t) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.QuestId) === 3) {
        e++;
      }
    }
    return [e, t.length];
  }
  GetAllPhantomQuestNewState() {
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(this.Id)) {
      if (this.GetPhantomQuestNewState(t.Id) || this.GetPhantomQuestNewUnlockState(t.Id) || this.GetPhantomQuestDoneCheckState(t.Id)) {
        return true;
      }
    }
    return false;
  }
  GetPhantomQuestNewState(t) {
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(t).QuestId;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
    return (e === 1 || e === 2) && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 2, t, 0) === 0;
  }
  GetPhantomQuestDoneCheckState(t) {
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(t).QuestId;
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 3 && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 3, t, 0) === 0;
  }
  GetPhantomQuestNewUnlockState(t) {
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(t).QuestId;
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) !== 0 && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 6, t, 0) === 0;
  }
  aVl() {
    this.PhantomDataMap.clear();
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllPhantomConfig(this.Id)) {
      this.PhantomDataMap.set(t.Id, false);
    }
  }
  UnlockPhantom(t) {
    this.PhantomDataMap.set(t, true);
  }
  GetAllPhantomNewUnlockState() {
    for (var [t, e] of this.PhantomDataMap.entries()) {
      if (e && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 4, t, 0) === 0) {
        return true;
      }
    }
    return false;
  }
  GetPhantomNewUnlockState(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 4, t, 0) === 0;
  }
  hVl() {
    this.SoarChallengeRewardDataMap.clear();
    let e = 0;
    for (const i of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllSoarChallengeConfig()) {
      var r = new ActivityCommonDefine_1.ActivityTaskData();
      r.Id = i.Id;
      r.Target = i.NeedScore;
      this.SoarChallengeRewardDataMap.set(i.Id, r);
      let t = this.SoarChallengePlayDataMap.get(i.LevelPlayId);
      if (!t) {
        (t = new ActivityMapTravelDefine_1.SoarChallengePlayData()).TabIndex = e;
        t.PlayId = i.LevelPlayId;
        t.NameTextId = i.Name;
        t.CheckRedDot = this.CheckSoarItemRedDot;
        t.CheckFinished = this.CheckSoarItemFinished;
        t.JumpId = i.JumpId;
        this.SoarChallengePlayDataMap.set(i.LevelPlayId, t);
        e++;
      }
      t.RewardIds.push(i.Id);
    }
  }
  RefreshSoarChallengePlayData(t) {
    var e = this.SoarChallengePlayDataMap.get(t.pE_);
    if (e) {
      e.HighestPoint = t.vE_;
      for (const i of e.RewardIds) {
        var r = this.SoarChallengeRewardDataMap.get(i);
        r.Current = e.HighestPoint;
        if (t.yE_.includes(i)) {
          r.Status = 2;
        } else if (r.Current >= r.Target) {
          r.Status = 0;
        } else {
          r.Status = 1;
        }
      }
    }
  }
  SetSoarChallengeRewardDone(t) {
    this.SoarChallengeRewardDataMap.get(t).Status = 2;
  }
  RefreshSoarChallengeUnlockState(t) {
    var e = this.SoarChallengePlayDataMap.get(t);
    var r = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(e.RewardIds[0]);
    e.IsNew = false;
    if (!(this.TravelLevel < r.UnlockTravelLevel)) {
      if (r.UnlockQuestId !== 0) {
        r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r.UnlockQuestId);
        e.IsUnlock = r;
      } else {
        e.IsUnlock = true;
      }
      e.IsNew = this.GetSoarItemNewUnlockState(t);
    }
  }
  GetSoarPlayLockTips(t) {
    t = this.SoarChallengePlayDataMap.get(t);
    return ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(t.RewardIds[0]).LockTips;
  }
  GetAllSoarTabData() {
    return Array.from(this.SoarChallengePlayDataMap.values());
  }
  GetSoarItemDataList(t) {
    var e = [];
    for (const i of t) {
      var r = this.SoarChallengeRewardDataMap.get(i);
      e.push(r);
    }
    e.sort(this.lVl());
    return e;
  }
  GetAllSoarItemRedDot() {
    for (const t of this.SoarChallengeRewardDataMap.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  RefreshAndGetAllSoarItemNewUnlock() {
    let t = false;
    for (const e of this.SoarChallengePlayDataMap.keys()) {
      this.RefreshSoarChallengeUnlockState(e);
      if (!t && this.GetSoarItemNewUnlockState(e)) {
        t = true;
      }
    }
    return t;
  }
  GetSoarItemNewUnlockState(t) {
    t = this.SoarChallengePlayDataMap.get(t);
    return !!t.IsUnlock && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 7, t.PlayId, 0) === 0;
  }
}
exports.ActivityMapTravelData = ActivityMapTravelData;
//# sourceMappingURL=ActivityMapTravelData.js.map