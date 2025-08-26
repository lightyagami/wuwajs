"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityData_1 = require("../Activity/ActivityData");
class WeeklyRogueData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.Score = 0;
    this.LastInstInfo = undefined;
    this.AwardsInfoList = undefined;
    this.CycleId = 0;
    this.CycleBeginTime = 0;
    this.CycleEndTime = 0;
    this.WorldLevel = 0;
    this.HasNewSettle = false;
  }
  get NeedOpenActivityMainView() {
    var e = this.HasNewSettle && this.HasScoreRewardEnable();
    this.HasNewSettle = false;
    return e;
  }
  GetExDataRedPointShowState() {
    return this.HasScoreRewardEnable() || this.HasNewCycle();
  }
  GetRogueRedDotState() {
    return !!this.CheckIfInShowTime() && (this.HasScoreRewardEnable() || this.HasNewCycle());
  }
  SaveFirstCheckRedDotState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, this.CycleId, 0, 0) === 1 || (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, this.CycleId, 0, 0, 1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueRedDotInfoRefresh), false);
  }
  HasNewCycle() {
    return !!this.GetPreGuideQuestFinishState() && !ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 0, this.CycleId, 0, 0);
  }
  HasScoreRewardEnable() {
    return this.AwardsInfoList?.some(e => e.zps === Protocol_1.Aki.Protocol.zps.CMs) ?? false;
  }
  IsScoreRewardAllDone() {
    return !this.AwardsInfoList || !this.AwardsInfoList.some(e => e.zps === Protocol_1.Aki.Protocol.zps.Z6n);
  }
  SetScoreRewardState(t, e) {
    var i = this.AwardsInfoList?.find(e => e.v9n === t);
    if (i) {
      i.zps = e;
    }
  }
  GetScoreRewardStateById(t) {
    var e = this.AwardsInfoList?.find(e => e.v9n === t);
    if (e?.zps === Protocol_1.Aki.Protocol.zps.ovs) {
      return 2;
    } else if (e?.zps === Protocol_1.Aki.Protocol.zps.Z6n) {
      return 0;
    } else {
      return 1;
    }
  }
  GetCycleConfig() {
    return ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyCycleConfig(this.CycleId);
  }
  GetCycleRemainTime() {
    return this.CycleEndTime - Time_1.Time.ServerTimeStamp / CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  GetCycleBlackFlowerCost() {
    var e = this.GetCycleConfig();
    let i = 999;
    let r = 0;
    e.BlackFlowerCost.forEach((e, t) => {
      if (t < i) {
        i = t;
      }
      if (t > r) {
        r = t;
      }
    });
    let t = 0;
    return t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel < i ? e.BlackFlowerCost.get(i) ?? 0 : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel > r ? e.BlackFlowerCost.get(r) ?? 0 : e.BlackFlowerCost.get(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel) ?? 0;
  }
  GetLvInfo() {
    var e = this.GetCycleConfig();
    let i = 999;
    let r = 0;
    e.Diff.forEach((e, t) => {
      if (t < i) {
        i = t;
      }
      if (t > r) {
        r = t;
      }
    });
    let t = 0;
    return t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel < i ? e.Diff.get(i) ?? 0 : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel > r ? e.Diff.get(r) ?? 0 : e.Diff.get(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel) ?? 0;
  }
  GetScoreRate() {
    var e = this.GetCycleConfig();
    return Math.round(e.ScoreRate / 100);
  }
  GetCycleCountDownData() {
    let e = this.GetCycleRemainTime();
    var t = (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY ? 3 : e >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var i = e >= CommonDefine_1.SECOND_PER_DAY ? 2 : e >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, i);
  }
  OnQuestStateChange(e, t) {
    if (!!this.LocalConfig.PreShowGuideQuest.includes(e) && !(t < Protocol_1.Aki.Protocol.hTs.a3_)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueRedDotInfoRefresh);
    }
  }
  PhraseEx(e) {
    var t = e.TN_;
    if (t) {
      if (this.CheckIfInShowTime()) {
        ModelManager_1.ModelManager.WeeklyRogueModel.CurrentActivityId = e.s5n;
      }
      e = this.CycleId;
      this.CycleId = t.bN_;
      if (e !== t.bN_) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueCycleRefresh);
      }
      this.CycleBeginTime = t.RN_;
      this.CycleEndTime = t.AN_;
      this.LastInstInfo = t.LN_;
      this.Score = t.SMs;
      this.AwardsInfoList = t.wN_;
      this.WorldLevel = t.cSs;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueRedDotInfoRefresh);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 34, "WeeklyRogueData无周常数据");
    }
  }
  GetExDataFinishShowState() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && !!this.AwardsInfoList && !this.AwardsInfoList.some(e => e.zps !== Protocol_1.Aki.Protocol.zps.ovs);
  }
}
exports.WeeklyRogueData = WeeklyRogueData;
//# sourceMappingURL=WeeklyRogueData.js.map