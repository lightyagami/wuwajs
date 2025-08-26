"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDailyAdventureData = exports.rewardStateResolver = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine");
exports.rewardStateResolver = {
  [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskRunning]: 1,
  [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskFinish]: 0,
  [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskTaken]: 2
};
const DAILY_TIME_FLAG = 1;
class ActivityDailyAdventureData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ProgressPoint = 0;
    this.QNe = new Map();
    this.XNe = new Map();
  }
  SetProgressPoint(t) {
    this.ProgressPoint = t;
    for (const e of this.QNe.values()) {
      e.RefreshState(e.RewardState === 2, this.ProgressPoint);
    }
  }
  PhraseEx(t) {
    var e = ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(this.Id);
    if (e) {
      this.$Ne(e.RewardList);
      var i = t.jps;
      if (i) {
        this.ProgressPoint = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID);
        this.XNe.clear();
        for (const n of i._Ms) {
          var r = new ActivityDailyAdventureDefine_1.DailyAdventureTaskData();
          r.TaskId = n.s5n;
          r.CurrentProgress = n.lMs;
          r.TargetProgress = n.j6n;
          r.TaskState = exports.rewardStateResolver[n.H6n];
          this.XNe.set(n.s5n, r);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Activity", 37, "[日常探险活动] 任务信息打印", ["TaskId", n.s5n], ["State", r.TaskState]);
          }
        }
        for (const a of this.QNe.values()) {
          var o = i.uMs.includes(a.RewardId);
          a.RefreshState(o, this.ProgressPoint);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[日常探险活动] 活动数据未找到", ["ActivityId", this.Id]);
    }
  }
  $Ne(t) {
    this.QNe.clear();
    for (const r of t) {
      var e = ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventurePointConfig(r);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Activity", 37, "[日常探险活动] 积分奖励数据不存在", ["Id", r]);
        }
      }
      var i = new ActivityDailyAdventureDefine_1.DailyAdventureRewardData();
      i.RewardId = r;
      i.Point = e.NeedPt;
      this.QNe.set(r, i);
    }
  }
  GetAllPointReward() {
    return Array.from(this.QNe.values()).sort((t, e) => t.RewardId - e.RewardId);
  }
  GetAllTaskInfo() {
    return Array.from(this.XNe.values()).sort((t, e) => t.TaskState === e.TaskState ? t.TaskId - e.TaskId : t.TaskState - e.TaskState);
  }
  SetPointReward(t, e) {
    t = this.QNe.get(t);
    if (t) {
      t.RefreshState(e, this.ProgressPoint);
    }
  }
  SetTaskInfo(t, e, i) {
    t = this.XNe.get(t);
    if (t && (e !== undefined && (t.TaskState = e), i !== undefined)) {
      t.CurrentProgress = i;
    }
  }
  GetDefaultMapMarkId() {
    var t = ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(this.Id);
    if (t) {
      return t.AreaDefaultMarkId;
    } else {
      return 0;
    }
  }
  GetExDataRedPointShowState() {
    return !this.YNe() && (this.IsTaskHasReward() || this.IsPointHasReward() || this.IsDailyTips());
  }
  GetExDataFinishShowState() {
    return this.YNe();
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  IsTaskHasReward() {
    for (const t of this.XNe.values()) {
      if (t.TaskState === 0) {
        return true;
      }
    }
    return false;
  }
  IsPointHasReward() {
    for (const t of this.QNe.values()) {
      if (t.RewardState === 0) {
        return true;
      }
    }
    return false;
  }
  IsDailyTips() {
    return TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp() !== ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, DAILY_TIME_FLAG, 0, 0);
  }
  ReadDailyTips() {
    var t = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, DAILY_TIME_FLAG, 0, 0, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  YNe() {
    for (const t of this.QNe.values()) {
      if (t.RewardState !== 2) {
        return false;
      }
    }
    return true;
  }
}
exports.ActivityDailyAdventureData = ActivityDailyAdventureData;
//# sourceMappingURL=ActivityDailyAdventureData.js.map