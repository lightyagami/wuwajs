"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoadBookData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
const ActivityRoadBookDefine_1 = require("./ActivityRoadBookDefine");
class ActivityRoadBookData extends ActivityData_1.ActivityBaseData {
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
    this.PhantomDataMap = new Map();
    this.MotorChallengeRewardDataMap = new Map();
    this.MotorChallengePlayDataMap = new Map();
    this.CheckMotorItemRedDot = t => {
      for (const e of t) {
        if (this.MotorChallengeRewardDataMap.get(e).Status === 0) {
          return true;
        }
      }
      return false;
    };
    this.CheckMotorItemFinished = t => {
      for (const e of t) {
        if (this.MotorChallengeRewardDataMap.get(e).Status !== 2) {
          return false;
        }
      }
      return true;
    };
  }
  OnInit(t) {
    this.oVl();
    this.nVl();
    this.aVl();
    this.DHm();
    t = t.Ljm;
    if (t) {
      this.TravelLevel = t.Pjm;
      this.tVl = t.Pjm;
      this.rVl = this.GetCurrentExp();
      this.iVl = this.GetExpItemCount();
    }
  }
  PhraseEx(t) {
    t = t.Ljm;
    if (t) {
      this.RefreshRoadBookData(t);
    }
  }
  RefreshRoadBookData(t) {
    this.TravelLevel = t.Pjm;
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
    for (const s of t.gE_) {
      this.RefreshMotorChallengePlayData(s);
    }
  }
  GetExDataRedPointShowState() {
    return !!this.CanTravelLevelUp() || !!this.GetTaskRedDotState(true) || !!this.GetAllMotorItemRedDot();
  }
  GetExDataFinishShowState() {
    if (this.MaxTravelLevel !== this.TravelLevel) {
      return false;
    }
    if (this.TaskFinalRewardData && !this.TaskFinalRewardData.IsReceived) {
      return false;
    }
    for (const t of this.AreaTaskMap.values()) {
      if (t.Status !== 2) {
        return false;
      }
    }
    for (const e of this.MotorChallengeRewardDataMap.values()) {
      if (e.Status !== 2) {
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
      case 3:
        for (const i of this.PhantomDataMap.values()) {
          if (i) {
            e++;
          }
        }
        r = this.PhantomDataMap.size;
        break;
      case 4:
        for (const s of this.MotorChallengeRewardDataMap.values()) {
          if (s.Status === 2) {
            e++;
          }
        }
        r = this.MotorChallengeRewardDataMap.size;
    }
    return [e, r];
  }
  GetTypeRedDotState(t) {
    switch (t) {
      case 1:
        return this.GetTaskRedDotState(false);
      case 4:
        return this.GetAllMotorItemRedDot();
    }
    return false;
  }
  GetTypeNewState(t) {
    switch (t) {
      case 1:
        return this.GetAllAreaNewUnlockState();
      case 3:
        return this.GetAllPhantomNewUnlockState();
      case 4:
        return this.RefreshAndGetAllMotorItemNewUnlock();
    }
    return false;
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetActivityConfig(this.Id);
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
    for (const r of ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAllLevelExpConfig(this.Id)) {
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
    this.TaskFinalRewardData = new ActivityRoadBookDefine_1.FinalTravelTaskData();
    var t = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAllRoadBookTaskConfig(this.Id);
    this.TaskFinalRewardData.Target = t.length;
    var t = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAllAreaConfig(this.Id);
    for (const r of t) {
      var e = new ActivityRoadBookDefine_1.RoadBookAreaData(r.Id);
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
      var r = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAreaConfig(t.AreaId);
      var i = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAreaConfig(e.AreaId);
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
      e = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetRoadBookTaskConfig(i.s5n);
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
  aVl() {
    this.PhantomDataMap.clear();
    for (const t of ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAllPhantomConfig(this.Id)) {
      this.PhantomDataMap.set(t.Id, false);
    }
  }
  UnlockPhantom(t) {
    this.PhantomDataMap.set(t, true);
  }
  GetAllPhantomNewUnlockState() {
    for (var [t, e] of this.PhantomDataMap.entries()) {
      if (e && this.GetPhantomNewUnlockState(t)) {
        return true;
      }
    }
    return false;
  }
  GetPhantomNewUnlockState(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 4, t, 0) === 0;
  }
  DHm() {
    this.MotorChallengeRewardDataMap.clear();
    let e = 0;
    for (const i of ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAllMotorChallengeConfig()) {
      var r = new ActivityCommonDefine_1.ActivityTaskData();
      r.Id = i.Id;
      r.Target = i.NeedScore;
      this.MotorChallengeRewardDataMap.set(i.Id, r);
      let t = this.MotorChallengePlayDataMap.get(i.LevelPlayId);
      if (!t) {
        (t = new ActivityRoadBookDefine_1.MotorChallengePlayData()).TabIndex = e;
        t.PlayId = i.LevelPlayId;
        t.NameTextId = i.Name;
        t.CheckRedDot = this.CheckMotorItemRedDot;
        t.CheckFinished = this.CheckMotorItemFinished;
        t.JumpId = i.JumpId;
        t.ClassId = i.ClassificationId;
        this.MotorChallengePlayDataMap.set(i.LevelPlayId, t);
        e++;
      }
      t.RewardIds.push(i.Id);
    }
  }
  RefreshMotorChallengePlayData(t) {
    var e = this.MotorChallengePlayDataMap.get(t.Djm);
    if (e) {
      e.HighestPoint = t.vE_;
      for (const i of e.RewardIds) {
        var r = this.MotorChallengeRewardDataMap.get(i);
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
  SetMotorChallengeRewardDone(t) {
    this.MotorChallengeRewardDataMap.get(t).Status = 2;
  }
  RefreshMotorChallengeUnlockState(t) {
    var e = this.MotorChallengePlayDataMap.get(t);
    var r = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetMotorChallengeConfig(e.RewardIds[0]);
    e.IsNew = false;
    if (!(this.TravelLevel < r.UnlockTravelLevel)) {
      if (r.UnlockQuestId !== 0) {
        r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r.UnlockQuestId);
        e.IsUnlock = r;
      } else {
        e.IsUnlock = true;
      }
      e.IsNew = this.GetMotorItemNewUnlockState(t);
    }
  }
  GetMotorPlayLockTips(t) {
    t = this.MotorChallengePlayDataMap.get(t);
    return ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetMotorChallengeConfig(t.RewardIds[0]).LockTips;
  }
  GetAllMotorTabData() {
    return Array.from(this.MotorChallengePlayDataMap.values());
  }
  GetMotorItemDataList(t) {
    var e = [];
    for (const i of t) {
      var r = this.MotorChallengeRewardDataMap.get(i);
      e.push(r);
    }
    e.sort(this.lVl());
    return e;
  }
  GetAllMotorItemRedDot() {
    for (const t of this.MotorChallengeRewardDataMap.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  RefreshAndGetAllMotorItemNewUnlock() {
    let t = false;
    for (const e of this.MotorChallengePlayDataMap.keys()) {
      this.RefreshMotorChallengeUnlockState(e);
      if (!t && this.GetMotorItemNewUnlockState(e)) {
        t = true;
      }
    }
    return t;
  }
  GetMotorItemNewUnlockState(t) {
    t = this.MotorChallengePlayDataMap.get(t);
    return !!t.IsUnlock && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 7, t.PlayId, 0) === 0;
  }
}
exports.ActivityRoadBookData = ActivityRoadBookData;
//# sourceMappingURL=ActivityRoadBookData.js.map