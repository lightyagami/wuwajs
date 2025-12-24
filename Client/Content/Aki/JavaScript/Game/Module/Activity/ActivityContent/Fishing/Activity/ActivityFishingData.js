"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFishingData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../../ActivityCommonDefine");
const ActivityData_1 = require("../../../ActivityData");
const ActivityFishingDefine_1 = require("./ActivityFishingDefine");
class ActivityFishingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.tcl = 0;
    this.icl = 0;
    this.ix_ = new Map();
    this.rx_ = new Map();
    this.lVl = (t, e) => {
      var i;
      var r;
      if (t.Status === e.Status) {
        i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(t.Id);
        r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(e.Id);
        if (i.SortId === r.SortId) {
          return t.Id - e.Id;
        } else {
          return i.SortId - r.SortId;
        }
      } else {
        return t.Status - e.Status;
      }
    };
    this.ox_ = new Map();
    this.nx_ = 0;
    this.MilestoneRewardMaxCount = 0;
  }
  OnInit(t) {
    this.sx_();
  }
  PhraseEx(t) {
    t = t.YS_;
    if (t) {
      this.tcl = MathUtils_1.MathUtils.LongToNumber(t._M_);
      this.icl = MathUtils_1.MathUtils.LongToNumber(t.cM_);
      this.RefreshLimitTimeTaskDataList(t.$M_, false);
      this.MilestoneRewardItemAccumulate = t.QM_;
      this.RefreshMilestoneReward(t.WM_, false);
    }
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityConfig(this.Id);
  }
  GetExDataRedPointShowState() {
    if (this.IsUnLock()) {
      return !!this.GetTimeLimitRedDotState() || !!this.GetHandBookRedDotState();
    } else {
      return this.GetPreOpenFirstCheckRedDotState();
    }
  }
  GetButtonRedPointShowState() {
    return !this.IsUnLock() && this.GetPreOpenFirstCheckRedDotState();
  }
  GetExternalButtonRedPointState() {
    return this.GetButtonRedPointShowState();
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  GetTimeLimitRedDotState() {
    return !!this.IsLimitTimeRewardOn() && (this.GetTimeLimitRewardRedDotState() || this.GetLimitTimeShopRedDotState());
  }
  GetTimeLimitRewardRedDotState() {
    var e = this.GetRewardTargetTabList();
    for (let t = 0; t < e.length; t++) {
      var i = t + 1;
      if (this.GetTimeLimitTasksRedDotStateByGroupId(i)) {
        return true;
      }
    }
    return this.GetAllAvailableGetMilestoneRewardIds().length > 0;
  }
  GetHandBookRedDotState() {
    return ModelManager_1.ModelManager.FishingModel.GetHandBookRewardRedDotState();
  }
  GetLimitTimeShopRedDotState() {
    return ModelManager_1.ModelManager.PayShopModel.CheckShopItemCheckFlag(209);
  }
  GetPreOpenFirstCheckRedDotState() {
    var t = this.CanPreOpen();
    var e = this.HasPreOpenCondition();
    return !!t && !!e && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0;
  }
  SaveFirstCheckRedDotState(t, e = 0) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, t, e, 0) === 1 || (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, t, e, 0, 1), this.RefreshActivityRedDotState(), false);
  }
  GetRewardTargetTabList() {
    return ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingActivityGroupConfig();
  }
  GetRewardTabList() {
    return ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("FishingTimeLimitView");
  }
  IsLimitTimeRewardOn() {
    var t;
    return !!this.IsUnLock() && (t = TimeUtil_1.TimeUtil.GetServerTime()) >= this.tcl && t <= this.icl;
  }
  GetLimitTimeEndTime() {
    return this.icl;
  }
  RefreshLimitTimeTaskDataList(t, e) {
    for (const i of t) {
      this.ax_(i);
    }
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh);
    }
  }
  ax_(e) {
    let i = this.ix_.get(e.s5n);
    if (!i) {
      i = new ActivityCommonDefine_1.ActivityTaskData();
      var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(e.s5n);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Fishing", 37, "[FishingActivity] 限时奖励无配置", ["TaskId", e.s5n]);
        }
        return;
      }
      let t = this.rx_.get(r.GroupId);
      if (!t) {
        t = new Set();
        this.rx_.set(r.GroupId, t);
      }
      t.add(e.s5n);
      this.ix_.set(e.s5n, i);
    }
    i.Refresh(e);
  }
  SetTimeLimitTaskDone(t) {
    this.ix_.get(t).Status = 2;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh);
  }
  GetTimeLimitTasksByGroupId(t) {
    var e = [];
    var t = this.rx_.get(t);
    if (!t) {
      return e;
    }
    for (const i of t.values()) {
      e.push(this.ix_.get(i));
    }
    return e.sort(this.lVl);
  }
  GetTimeLimitTasksRedDotStateByGroupId(t) {
    for (const e of this.GetTimeLimitTasksByGroupId(t)) {
      if (e.Status === 0) {
        return true;
      }
    }
    return false;
  }
  set MilestoneRewardItemAccumulate(t) {
    this.nx_ = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh);
  }
  get MilestoneRewardItemAccumulate() {
    return this.nx_;
  }
  get MilestoneRewardItemId() {
    return this.GetActivityConfig().MilestonItemId;
  }
  sx_() {
    this.ox_.clear();
    let t = -1;
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingActivityMilestone()) {
      var e = new ActivityFishingDefine_1.FishingRewardProgressData(i.Id, i.ItemNum);
      this.ox_.set(i.Id, e);
      t = Math.max(t, i.ItemNum);
    }
    this.MilestoneRewardMaxCount = t;
  }
  RefreshMilestoneReward(t, e) {
    for (const s of Object.keys(t)) {
      var i = Number.parseInt(s);
      var r = t[s];
      var n = this.ox_.get(i);
      if (n) {
        n.State = r;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Fishing", 37, "[FishingActivity] 里程碑奖励无配置", ["Id", i]);
      }
    }
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh);
    }
  }
  GetAllMilestoneReward() {
    return Array.from(this.ox_.values()).sort((t, e) => t.Id - e.Id);
  }
  GetAllAvailableGetMilestoneRewardIds() {
    var t;
    var e;
    var i = [];
    for ([t, e] of this.ox_.entries()) {
      if (e.IsReceivable()) {
        i.push(t);
      }
    }
    return i;
  }
  GetShopDataList() {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(209);
    if (ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(209)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingTimeLimitShopRefresh);
      this.RefreshActivityRedDotState();
    }
    return t;
  }
  GetRecommendQuestLinkId() {
    var t = this.GetActivityConfig();
    var e = [t.RecommendQuestId, ...t.RecommendQuestLinkList];
    for (let t = e.length - 1; t >= 0; --t) {
      var i = e[t];
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
      var n = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      var n = n === 2 || n === 1;
      if (r && r.CanShowInUiPanel() && n) {
        return i;
      }
    }
  }
  IsRecommendQuestFinished() {
    var t = this.GetActivityConfig().RecommendQuestId;
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t);
  }
}
exports.ActivityFishingData = ActivityFishingData;
//# sourceMappingURL=ActivityFishingData.js.map