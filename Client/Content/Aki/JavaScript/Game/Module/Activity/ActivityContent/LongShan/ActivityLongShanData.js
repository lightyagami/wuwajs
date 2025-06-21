"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityLongShanData = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  LongShanScoreRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LongShanScoreRewardByActivityId"),
  LongShanStageAll_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageAll"),
  LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  LongShanScoreRewardData_1 = require("./LongShanScoreRewardData"),
  LongShanStageInfo_1 = require("./LongShanStageInfo");
class ActivityLongShanData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.StageIds = void 0, this.ROe = void 0, this.ScoreRewardIds = [], this.QX1 = new Map, this.ScoreItemId = 0, this.ScoreItemTotal = 0, this.TaskSort = (e, t) => {
      var r, a;
      return e.mMs !== t.mMs ? e.mMs ? 1 : -1 : e.dMs !== t.dMs ? e.dMs ? -1 : 1 : (r = LongShanTaskById_1.configLongShanTaskById.GetConfig(e.s5n).SortId) !== (a = LongShanTaskById_1.configLongShanTaskById.GetConfig(t.s5n).SortId) ? r - a : e.s5n - t.s5n
    }, this.GetScoreItemCount = () => {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ScoreItemId)
    }
  }
  OnInit(e) {
    this.InitScoreReward()
  }
  PhraseEx(e) {
    this.ROe?.clear(), this.ROe = this.ROe ?? new Map, this.StageIds = [];
    for (const n of LongShanStageAll_1.configLongShanStageAll.GetConfigList(this.Id)) {
      this.StageIds.push(n.Id);
      var t = e.Kps?.gMs?.find(e => e.s5n === n.Id);
      t && (t = new LongShanStageInfo_1.LongShanStageInfo(t), this.ROe.set(n.Id, t))
    }
    var r = e.Kps?.pQ1;
    if (r)
      for (const i of r) {
        var a = this.GetScoreRewardDataById(i);
        a ? a.Achieved = !0 : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Activity", 71, "[LongShanActivity] 奖励Id不存在", ["ActivityId", this.Id], ["RewardId", i])
      }
  }
  InitScoreReward() {
    this.QX1.clear(), this.ScoreRewardIds = [];
    for (const t of LongShanScoreRewardByActivityId_1.configLongShanScoreRewardByActivityId.GetConfigList(this.Id) ?? []) {
      this.ScoreRewardIds.push(t.Id);
      var e = new LongShanScoreRewardData_1.LongShanScoreRewardData;
      e.Id = t.Id, e.Goal = t.Score, e.DropId = t.DropId, e.GetCurrentScore = this.GetScoreItemCount, this.ScoreItemId = t.ItemId, this.ScoreItemTotal = Math.max(this.ScoreItemTotal, e.Goal), this.QX1.set(t.Id, e)
    }
  }
  UpdateStage(e) {
    for (const n of e) {
      var t = n.s5n,
        r = this.ROe.get(t),
        a = new LongShanStageInfo_1.LongShanStageInfo(n);
      this.ROe.set(n.s5n, a), r && this.OnStageInfoChange(t, r, a)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LongShanUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)
  }
  OnStageInfoChange(e, t, r) {
    for (var [a, n] of t.TaskInfoMap) {
      var i = r.TaskInfoMap.get(a);
      i && this.OnStageTaskInfoChange(a, n, i)
    }
  }
  OnStageTaskInfoChange(e, t, r) {
    !t.dMs && r.dMs && 0 < (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e).JumpId) && 8 === (r = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(t)).SkipName && (e = Number(r.Val1), ModelManager_1.ModelManager.MapModel?.RemoveMapMarksByConfigId(7, e))
  }
  UpdateScoreRewardStatus(e) {
    for (const r of e) {
      var t = this.GetScoreRewardDataById(r);
      t && (t.Achieved = !0)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)
  }
  NeedSelfControlFirstRedPoint() {
    return !1
  }
  GetStageIndex(e) {
    return this.StageIds.indexOf(e)
  }
  GetStageInfoById(e) {
    var t = this.ROe?.get(e)?.ProtoStageInfo;
    if (t) {
      if (t.CMs) return t
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e])
  }
  GetStageInfoByIdIncludeLock(e) {
    var t = this.ROe?.get(e)?.ProtoStageInfo;
    if (t) return t;
    Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e])
  }
  GetProgress(e) {
    var t, e = this.GetStageInfoById(e);
    return e ? (t = e.cMs.filter(e => e.mMs).length, Math.ceil(t / e.cMs.length * 100)) : 0
  }
  IsStageUnlock(e) {
    var t = this.IsStageReachOpenTime(e);
    return this.GetStageInfoByIdIncludeLock(e).CMs && t
  }
  IsStageReachOpenTime(e) {
    var t, r = this.GetStageInfoByIdIncludeLock(e);
    return r ? (t = TimeUtil_1.TimeUtil.GetServerTimeStamp(), 0 === (r = Number(MathUtils_1.MathUtils.LongToBigInt(r.Pps))) || r < t) : (Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e]), !1)
  }
  GetScoreRewardRelativeProgress(t) {
    var e = this.GetAllScoreRewardData(),
      r = e.findIndex(e => e.Id === t),
      a = e[r].Goal,
      r = r - 1;
    let n = 0;
    return 0 <= r && (n = e[r].Goal), (this.GetScoreItemCount() - n) / (a - n)
  }
  CheckStageRed(e) {
    var t = this.GetStageInfoById(e);
    return !!t && (!ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) || 0 <= t.cMs.findIndex(e => e.dMs && !e.mMs))
  }
  SaveNewStageFlag(e) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, 0, 0, 1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)
  }
  CheckAnyStageRed() {
    if (this.StageIds)
      for (const e of this.StageIds)
        if (this.CheckStageRed(e)) return !0;
    return !1
  }
  CheckScoreRewardRedDot() {
    for (const e of this.GetAllScoreRewardData())
      if (0 === e.GetState()) return !0;
    return !1
  }
  GetExDataRedPointShowState() {
    return this.CheckAnyStageRed() || this.CheckScoreRewardRedDot()
  }
  GetAllScoreRewardData() {
    return Array.from(this.QX1.values()).sort((e, t) => e.Goal - t.Goal)
  }
  GetScoreRewardDataById(e) {
    return this.QX1.get(e)
  }
  GetAllAvailableScoreRewardIds() {
    var e = [];
    for (const t of this.GetAllScoreRewardData()) 0 === t.GetState() && e.push(t.Id);
    return e
  }
}
exports.ActivityLongShanData = ActivityLongShanData;
//# sourceMappingURL=ActivityLongShanData.js.map