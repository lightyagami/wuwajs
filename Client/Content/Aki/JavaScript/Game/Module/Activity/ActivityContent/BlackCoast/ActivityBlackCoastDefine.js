"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastTaskData = exports.BlackCoastStageInfo = exports.BlackCoastProgressRewardData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../ActivityCommonDefine");
const ActivityBlackCoastController_1 = require("./ActivityBlackCoastController");
class BlackCoastProgressRewardData {
  constructor() {
    this.Id = 0;
    this.Goal = 0;
    this.Achieved = false;
    this.DropId = 0;
    this.cbe = [];
    this.GetCurrentGoal = undefined;
  }
  GetPreviewReward() {
    if (this.cbe.length === 0) {
      if (this.DropId === 0) {
        return [];
      }
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.DropId);
      this.cbe = t;
    }
    return this.cbe;
  }
  GetState() {
    if (this.Achieved) {
      return 2;
    } else if (!this.GetCurrentGoal || this.GetCurrentGoal() < this.Goal) {
      return 1;
    } else {
      return 0;
    }
  }
}
exports.BlackCoastProgressRewardData = BlackCoastProgressRewardData;
class BlackCoastStageInfo {
  constructor(t, e) {
    this.StageId = t;
    this.Index = e;
    this.TaskMap = new Map();
    this.kja = false;
    this.jOe = (t, e) => t.Status !== e.Status ? t.Status - e.Status : t.SortId !== e.SortId ? t.SortId - e.SortId : t.TaskId - e.TaskId;
    this.Nja = t => {
      if (t) {
        ActivityBlackCoastController_1.ActivityBlackCoastController.RequestTaskReward(this.StageId, t);
      }
    };
    for (const r of ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetAllTaskConfigByStageId(this.StageId)) {
      var s = new BlackCoastTaskData(r.TaskId);
      s.JumpId = r.JumpId;
      s.SortId = r.SortId;
      s.TitleTextId = r.TaskName;
      s.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(r.DropId);
      s.ReceiveDelegate = this.Nja;
      this.TaskMap.set(r.TaskId, s);
    }
  }
  get StageState() {
    if (!this.kja) {
      return 0;
    }
    for (const t of this.TaskMap.values()) {
      if (!t.IsTaken) {
        return 1;
      }
    }
    return 2;
  }
  get IsUnlock() {
    return this.StageState !== 0;
  }
  GetVideoSource() {
    return ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(this.StageId).VideoSource;
  }
  GetRewardState() {
    for (const t of this.TaskMap.values()) {
      if (t.Status === 0) {
        return true;
      }
    }
    return false;
  }
  GetTaskProgress() {
    var t = this.TaskMap.size;
    let e = 0;
    for (const s of this.TaskMap.values()) {
      if (s.IsTaken) {
        e++;
      }
    }
    return Math.ceil(e / t * 100);
  }
  GetTaskList() {
    return Array.from(this.TaskMap.values()).sort(this.jOe);
  }
  GetLockConditionText() {
    var t = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(this.StageId);
    return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t.OpenConditionId) ?? "";
  }
  StageUpdate(t) {
    for (const a of t.cMs) {
      var e;
      var s;
      var r = this.TaskMap.get(a.s5n);
      if (r) {
        e = r.IsFinished;
        r.Current = a.lMs;
        r.Target = a.j6n;
        r.Status = ActivityCommonDefine_1.taskStateResolver[a.H6n];
        s = r.IsFinished;
        if (!e && s) {
          this.Fja(r.TaskId);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Activity", 37, "[BlackCoastActivity] 活动Task不存在", ["StageId", this.StageId], ["TaskId", a.s5n]);
      }
    }
    this.kja = true;
  }
  SetTaskRewardGot(t) {
    this.TaskMap.get(t).Status = 2;
  }
  Fja(t) {
    var t = this.TaskMap.get(t);
    if (t.JumpId > 0 && (t = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(t.JumpId)).SkipName === 8) {
      t = Number(t.Val1);
      ModelManager_1.ModelManager.MapModel.RemoveMapMarksByConfigId(7, t);
    }
  }
}
exports.BlackCoastStageInfo = BlackCoastStageInfo;
class BlackCoastTaskData {
  constructor(t) {
    this.TaskId = t;
    this.Status = 1;
    this.Current = 0;
    this.Target = 0;
    this.JumpId = 0;
    this.SortId = 0;
    this.TitleTextId = "";
    this.RewardList = [];
    this.ReceiveDelegate = undefined;
  }
  get IsFinished() {
    return this.Status !== 1;
  }
  get IsTaken() {
    return this.Status === 2;
  }
}
exports.BlackCoastTaskData = BlackCoastTaskData;
//# sourceMappingURL=ActivityBlackCoastDefine.js.map