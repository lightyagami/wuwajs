"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLongShanData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const LongShanScoreRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LongShanScoreRewardByActivityId");
const LongShanStageAll_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageAll");
const LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const LongShanScoreRewardData_1 = require("./LongShanScoreRewardData");
const LongShanStageInfo_1 = require("./LongShanStageInfo");
const TASK_FINISH_PERCENT = 100;
class ActivityLongShanData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.StageIds = undefined;
    this.ROe = undefined;
    this.ScoreRewardIds = [];
    this.cz1 = new Map();
    this.ScoreItemId = 0;
    this.ScoreItemTotal = 0;
    this.TaskSort = (e, t) => {
      var r;
      var i;
      if (e.mMs !== t.mMs) {
        if (e.mMs) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.dMs !== t.dMs) {
        if (e.dMs) {
          return -1;
        } else {
          return 1;
        }
      } else if ((r = LongShanTaskById_1.configLongShanTaskById.GetConfig(e.s5n).SortId) !== (i = LongShanTaskById_1.configLongShanTaskById.GetConfig(t.s5n).SortId)) {
        return r - i;
      } else {
        return e.s5n - t.s5n;
      }
    };
    this.GetScoreItemCount = () => {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ScoreItemId);
    };
  }
  OnInit(e) {
    this.InitScoreReward();
  }
  PhraseEx(e) {
    this.ROe?.clear();
    this.ROe = this.ROe ?? new Map();
    this.StageIds = [];
    for (const a of LongShanStageAll_1.configLongShanStageAll.GetConfigList(this.Id)) {
      this.StageIds.push(a.Id);
      var t = e.Kps?.gMs?.find(e => e.s5n === a.Id);
      if (t) {
        t = new LongShanStageInfo_1.LongShanStageInfo(t);
        this.ROe.set(a.Id, t);
      }
    }
    var r = e.Kps?.nK1;
    if (r) {
      for (const n of r) {
        var i = this.GetScoreRewardDataById(n);
        if (i) {
          i.Achieved = true;
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Activity", 71, "[LongShanActivity] 奖励Id不存在", ["ActivityId", this.Id], ["RewardId", n]);
        }
      }
    }
  }
  InitScoreReward() {
    this.cz1.clear();
    this.ScoreRewardIds = [];
    for (const t of LongShanScoreRewardByActivityId_1.configLongShanScoreRewardByActivityId.GetConfigList(this.Id) ?? []) {
      this.ScoreRewardIds.push(t.Id);
      var e = new LongShanScoreRewardData_1.LongShanScoreRewardData();
      e.Id = t.Id;
      e.Goal = t.Score;
      e.DropId = t.DropId;
      e.GetCurrentScore = this.GetScoreItemCount;
      this.ScoreItemId = t.ItemId;
      this.ScoreItemTotal = Math.max(this.ScoreItemTotal, e.Goal);
      this.cz1.set(t.Id, e);
    }
  }
  UpdateStage(e) {
    for (const i of e) {
      var t;
      var r = this.ROe.get(i.s5n);
      if (r) {
        t = new LongShanStageInfo_1.LongShanStageInfo(i);
        this.ROe.set(i.s5n, t);
        this.OnStageInfoChange(r, t);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LongShanUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  OnStageInfoChange(e, t) {
    for (var [r, i] of e.TaskInfoMap) {
      var a = t.TaskInfoMap.get(r);
      if (a) {
        this.OnStageTaskInfoChange(r, i, a);
      }
    }
  }
  OnStageTaskInfoChange(e, t, r) {
    if (!t.dMs && r.dMs && (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e).JumpId) > 0 && (r = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(t)).SkipName === 8) {
      e = Number(r.Val1);
      ModelManager_1.ModelManager.MapModel?.RemoveMapMarksByConfigId(7, e);
    }
  }
  UpdateScoreRewardStatus(e) {
    for (const r of e) {
      var t = this.GetScoreRewardDataById(r);
      if (t) {
        t.Achieved = true;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetStageInfoById(e) {
    var t = this.ROe?.get(e)?.ProtoStageInfo;
    if (t) {
      if (t.CMs) {
        return t;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e]);
    }
  }
  GetStageInfoByIdIncludeLock(e) {
    var t = this.ROe?.get(e)?.ProtoStageInfo;
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e]);
    }
  }
  GetProgress(e) {
    var t;
    var e = this.GetStageInfoById(e);
    if (e) {
      t = e.cMs.filter(e => e.mMs).length;
      return Math.ceil(t / e.cMs.length * 100);
    } else {
      return 0;
    }
  }
  IsStageUnlock(e) {
    var t = this.IsStageReachOpenTime(e);
    return this.GetStageInfoByIdIncludeLock(e).CMs && t;
  }
  IsStageReachOpenTime(e) {
    var t;
    var r = this.GetStageInfoByIdIncludeLock(e);
    if (r) {
      t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      return (r = Number(MathUtils_1.MathUtils.LongToBigInt(r.Pps))) === 0 || r < t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 71, "龙山活动阶段数据为空", ["stageId", e]);
      }
      return false;
    }
  }
  GetScoreRewardRelativeProgress(t) {
    var e = this.GetAllScoreRewardData();
    var r = e.findIndex(e => e.Id === t);
    var i = e[r].Goal;
    var r = r - 1;
    let a = 0;
    if (r >= 0) {
      a = e[r].Goal;
    }
    return (this.GetScoreItemCount() - a) / (i - a);
  }
  CheckStageRed(e) {
    var t = this.GetStageInfoById(e);
    return !!t && (!ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) || t.cMs.findIndex(e => e.dMs && !e.mMs) >= 0);
  }
  SaveNewStageFlag(e) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  CheckAnyStageRed() {
    if (this.StageIds) {
      for (const e of this.StageIds) {
        if (this.CheckStageRed(e)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckScoreRewardRedDot() {
    for (const e of this.GetAllScoreRewardData()) {
      if (e.GetState() === 0) {
        return true;
      }
    }
    return false;
  }
  GetExDataRedPointShowState() {
    return this.CheckAnyStageRed() || this.CheckScoreRewardRedDot();
  }
  GetExDataFinishShowState() {
    for (const e of this.GetAllScoreRewardData()) {
      if (e.GetState() !== 2) {
        return false;
      }
    }
    if (this.StageIds) {
      for (const t of this.StageIds) {
        if (this.GetProgress(t) !== TASK_FINISH_PERCENT) {
          return false;
        }
      }
    }
    return true;
  }
  GetAllScoreRewardData() {
    return Array.from(this.cz1.values()).sort((e, t) => e.Goal - t.Goal);
  }
  GetScoreRewardDataById(e) {
    return this.cz1.get(e);
  }
  GetAllAvailableScoreRewardIds() {
    var e = [];
    for (const t of this.GetAllScoreRewardData()) {
      if (t.GetState() === 0) {
        e.push(t.Id);
      }
    }
    return e;
  }
}
exports.ActivityLongShanData = ActivityLongShanData;
//# sourceMappingURL=ActivityLongShanData.js.map