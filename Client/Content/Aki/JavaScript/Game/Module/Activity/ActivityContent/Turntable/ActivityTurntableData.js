"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTurntableData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityData_1 = require("../../ActivityData");
class ActivityTurntableData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.QuestStateMap = new Map();
    this.QuestList = [];
    this.DailyTaskInfo = new Map();
    this.AllRewardInfo = new Map();
    this.RoundRewardIdMap = new Map();
    this.RoundIdList = [];
    this.TurntableCostConfigId = 0;
    this.TurntableCostCount = 0;
    this._Ln = [];
    this.TurntableType = 1;
    this.OnCommonItemCountAnyChange = (t, e) => {
      if (t === this.TurntableCostConfigId) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
      }
    };
    this.SNe = (t, e) => {
      var i = t.IsSpecial ? 1 : 0;
      var s = e.IsSpecial ? 1 : 0;
      if (i == s) {
        return t.Id - e.Id;
      } else {
        return s - i;
      }
    };
    this.eLl = (t, e) => {
      var i = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableTaskByTaskId(t.Id);
      var s = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableTaskByTaskId(e.Id);
      if (i.TaskSort === s.TaskSort) {
        return t.Id - e.Id;
      } else {
        return i.TaskSort - s.TaskSort;
      }
    };
  }
  PhraseEx(t) {
    var e = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableInfoByActivityId(this.Id);
    if (e) {
      this.TurntableCostConfigId = e.CostItemId;
      this.TurntableCostCount = e.CostItemCount;
      this.TurntableType = e.TurntableType;
      e = t.Qps;
      if (e) {
        this.QuestList.length = 0;
        this.QuestStateMap.clear();
        this.DailyTaskInfo.clear();
        if (this.TurntableType === 1) {
          var i = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableActivityByActivityId(this.Id);
          for (let t = 0; t < i.length; t++) {
            this.QuestList.push(i[t].CoinQuestId);
            var s = {
              QuestState: ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i[t].CoinQuestId),
              QuestUnlockStamp: this.TNe(this.BeginOpenTime, t)
            };
            this.QuestStateMap.set(i[t].CoinQuestId, s);
          }
        } else if (this.TurntableType === 2 && e.JS_) {
          for (const c of e.JS_) {
            this.RefreshTask(c, true);
          }
        }
        this.AllRewardInfo.clear();
        this.RoundRewardIdMap.clear();
        this.RoundIdList.length = 0;
        var r;
        var n;
        var t = ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableAwardsByActivityId(this.Id);
        var a = e.sMs;
        var h = e.aMs;
        var o = e.hMs;
        var u = new Map();
        for (const g of t) {
          var f;
          var _;
          var l = [];
          for ([f, _] of g.RewardItem) {
            var v = [{
              IncId: 0,
              ItemId: f
            }, _];
            l.push(v);
          }
          if (l.length !== 1) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Activity", 37, "[转盘活动] 转盘奖项配置物品数量错误", ["Id", g.Id]);
            }
          } else {
            let t = false;
            if (a || g.GroupId < h || o.includes(g.Id)) {
              t = true;
            }
            var d = {
              Id: g.Id,
              RoundId: g.GroupId,
              IsClaimed: t,
              RewardItem: l[0],
              IsSpecial: g.IsSpecial
            };
            this.AllRewardInfo.set(g.Id, d);
            let e = u.get(d.RoundId);
            (e = e || []).push(d);
            u.set(d.RoundId, e);
          }
        }
        for ([r, n] of u.entries()) {
          n.sort(this.SNe);
          var M = [];
          for (const m of n) {
            M.push(m.Id);
          }
          this.RoundRewardIdMap.set(r, M);
          this.RoundIdList.push(r);
        }
        this.RoundIdList.sort((t, e) => t - e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[转盘活动] 未找到对应TurntableInfo", ["ActivityId", this.Id]);
    }
  }
  GetExDataRedPointShowState() {
    return !!this.IsActivityUnFinished() && (!!this.IsHasPreQuestRedDot() || !!this.IsHasRewardRedDot() || !!this.IsHasUnlockRedDot() || this.IsHasDailyRedDot() || this.IsHasNewQuestRedDot());
  }
  GetExDataFinishShowState() {
    return !this.IsActivityUnFinished();
  }
  GetActivityCurrencyCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.TurntableCostConfigId);
  }
  OnQuestStateChange(t, e) {
    let i = false;
    if (this.LocalConfig.PreShowGuideQuest.includes(t)) {
      i = true;
    }
    var s;
    var r = this.QuestStateMap.get(t);
    if (r) {
      s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
      r.QuestState = s;
      this.QuestStateMap.set(t, r);
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 1, t, 0, s === 2 ? 1 : 0);
      i = true;
    }
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, this.Id);
    }
  }
  ReadCurrentUnlockQuest() {
    var t;
    if (this.IsActivityUnFinished()) {
      t = this.GetCurrentQuestIndex();
      t = this.QuestList[t];
      if (this.QuestStateMap.get(t).QuestState === 2) {
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 1, t, 0, 0);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  GetCurrentQuestIndex() {
    for (let t = 0; t < this.QuestList.length; t++) {
      switch (this.QuestStateMap.get(this.QuestList[t]).QuestState) {
        case 0:
        case 1:
          if (t > 0) {
            return t - 1;
          } else {
            return t;
          }
        case 2:
          return t;
      }
    }
    return this.QuestList.length - 1;
  }
  IsHasNewQuestRedDot() {
    if (this.TurntableType === 1 && this.IsActivityUnFinished() && this.GetPreGuideQuestFinishState()) {
      for (const e of this.QuestList) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
        if (t === 2) {
          if (ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, e, 0)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetCurrentQuestProgress() {
    let i = 0;
    this.QuestStateMap.forEach((t, e) => {
      if (t.QuestState === 3) {
        i++;
      }
    });
    return i;
  }
  TNe(t, e) {
    t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond);
    if (t.getHours() < TimeUtil_1.TimeUtil.CrossDayHour) {
      t.setDate(t.getDate() - 1);
    }
    t.setHours(TimeUtil_1.TimeUtil.CrossDayHour, 0, 0, 0);
    t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond;
    return t + e * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  SavePreQuestRedDot(t) {
    if (this.IsHasPreQuestRedDot()) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 1, t, 0, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  IsHasPreQuestRedDot() {
    return !this.GetPreGuideQuestFinishState() && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, this.GetUnFinishPreGuideQuestId(), 0) === 0;
  }
  IsActivityUnFinished() {
    for (const t of this.AllRewardInfo.values()) {
      if (!t.IsClaimed) {
        return true;
      }
    }
    return false;
  }
  IsRoundUnFinished(t) {
    t = this.RoundRewardIdMap.get(t);
    if (t) {
      for (const e of t) {
        if (!this.AllRewardInfo.get(e).IsClaimed) {
          return true;
        }
      }
    }
    return false;
  }
  IsHasRewardRedDot() {
    return !!(this.GetActivityCurrencyCount() >= this.TurntableCostCount) && !!this.IsActivityUnFinished();
  }
  GetCurrentRoundId() {
    for (const t of this.RoundIdList) {
      if (this.IsRoundUnFinished(t)) {
        return t;
      }
    }
    return this.RoundIdList.at(-1) ?? 0;
  }
  IsRewardSpecial(t) {
    return this.AllRewardInfo.get(t)?.IsSpecial ?? false;
  }
  SetRunResult(t, e) {
    const i = this.AllRewardInfo.get(t);
    i.IsClaimed = true;
    if (i.IsSpecial) {
      for (const s of this.RoundRewardIdMap.get(i.RoundId)) {
        const i = this.AllRewardInfo.get(s);
        i.IsClaimed = true;
      }
    }
    this._Ln = e;
  }
  GetRunResult() {
    return this._Ln;
  }
  RefreshTask(t, e) {
    let i = this.DailyTaskInfo.get(t.s5n);
    if (!i) {
      if (!e) {
        return;
      }
      i = new ActivityCommonDefine_1.ActivityTaskData();
      this.DailyTaskInfo.set(t.s5n, i);
    }
    i.Refresh(t);
  }
  GetAllTurntableDailyQuestData() {
    return Array.from(this.DailyTaskInfo.values()).sort(this.eLl);
  }
  IsHasDailyRedDot() {
    return this.TurntableType === 2 && !!this.GetPreGuideQuestFinishState() && TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp() !== ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 3, 0, 0);
  }
  SaveDailyRedDot() {
    var t;
    if (this.IsHasDailyRedDot()) {
      t = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 3, 0, 0, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  SaveUnlockRedDot() {
    if (this.IsHasUnlockRedDot()) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 2, 0, 0, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  IsHasUnlockRedDot() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 2, 0, 0) === 0;
  }
}
exports.ActivityTurntableData = ActivityTurntableData;
//# sourceMappingURL=ActivityTurntableData.js.map