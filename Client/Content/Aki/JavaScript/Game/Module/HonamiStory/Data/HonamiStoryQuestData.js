"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySubQuestData = exports.HonamiStoryMainQuestData = exports.HonamiStoryQuestDataBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../Activity/ActivityCommonDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
class HonamiStoryQuestDataBase {
  constructor() {
    this.ActivityData = undefined;
    this.TaskType = 1;
    this.Id = 0;
    this.ActivityData = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.Id = HonamiStoryQuestDataBase.FFe++;
  }
  get IsInDungeon() {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
  }
  DoMapTrack(t) {
    return !!this.CanMapTrack() && this.MapTrack(t);
  }
}
(exports.HonamiStoryQuestDataBase = HonamiStoryQuestDataBase).FFe = 0;
class HonamiStoryMainQuestData extends HonamiStoryQuestDataBase {
  constructor() {
    super();
    this.ncm = 0;
    this.TaskType = 1;
    this.ncm = this.ActivityData.ActivityQuestId;
  }
  GetLevelPlayInfo() {
    if (this.IsInDungeon) {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.CurAreaId;
      var t = this.ActivityData.GetHonamiStoryAreaData(t);
      if (t) {
        return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t.LevelPlayId);
      }
    }
  }
  GetNameKey() {
    if (this.IsInDungeon) {
      var t = this.GetLevelPlayInfo();
      if (t) {
        return t.NameKey;
      }
    }
    t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.ncm);
    if (t) {
      return t.NameKey;
    } else {
      return "";
    }
  }
  GetDesc() {
    var t;
    if (!this.IsInDungeon && (t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.ncm))) {
      return t.QuestDescribe;
    } else {
      return "";
    }
  }
  GetRewardId() {
    if (this.IsInDungeon) {
      var t = this.GetLevelPlayInfo();
      if (t) {
        return t.RewardId;
      }
    }
    t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.ncm);
    if (t) {
      return t.RewardId ?? 0;
    } else {
      return 0;
    }
  }
  IsFinished() {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckActivityQuestFinished();
  }
  CanMapTrack() {
    return false;
  }
  MapTrack(t) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "主线任务不能追踪");
    }
    return false;
  }
  GetTreeShowData() {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInActivityQuest();
    if (!this.IsInDungeon && t) {
      if (t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.ncm)) {
        return t.Tree?.GetBlackBoard()?.CreateShowData(true);
      } else {
        return undefined;
      }
    } else if (t = this.GetLevelPlayInfo()) {
      return t.Tree?.GetBlackBoard()?.CreateShowData(true);
    } else {
      return undefined;
    }
  }
}
exports.HonamiStoryMainQuestData = HonamiStoryMainQuestData;
class HonamiStorySubQuestData extends HonamiStoryQuestDataBase {
  constructor(t) {
    super();
    this.vAm = 0;
    this.h0i = 1;
    this.le = 0;
    this.sor = 1;
    this.vAm = t;
    this.TaskType = 2;
  }
  UpdateData(t) {
    this.h0i = ActivityCommonDefine_1.taskStateResolver[t.H6n];
    this.le = t.lMs;
    this.sor = t.j6n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("HonamiStory", 78, "HonamiStoryLimitTaskData UpdateData", ["taskId", this.vAm.toString()], ["status", this.h0i], ["current", this.le], ["target", this.sor]);
    }
  }
  get Config() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaTaskById(this.vAm);
  }
  GetNameKey() {
    return this.Config.Name;
  }
  GetDesc() {
    var t = this.Config.Desc;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t;
  }
  GetRewardId() {
    return this.Config.DropId;
  }
  IsFinished() {
    return this.h0i === 2;
  }
  CanMapTrack() {
    return this.IsInDungeon;
  }
  GetLevelPlayInfo() {
    if (this.IsInDungeon) {
      var t = this.Config.BTId;
      if (t !== 0) {
        return ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t);
      }
    }
  }
  MapTrack(t) {
    if (this.IsInDungeon) {
      var e = this.GetLevelPlayInfo();
      if (e) {
        if (e.CanTrack) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("HonamiStory", 78, "支线任务追踪 - " + e.Name, ["isTrack", t]);
          }
          if (t) {
            e.SetTrackPriorityOverride(0);
          } else {
            e.ResetTrackPriorityOverride();
          }
          e.SetTrack(t);
        } else {
          e = e.MarkConfig;
          if (!e) {
            return false;
          }
          ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
            MarkType: 29,
            MarkId: e.MarkId,
            Track: t
          });
        }
        return true;
      }
    }
    return false;
  }
  GetTreeShowData() {
    var t = this.GetLevelPlayInfo();
    if (t) {
      return t.Tree?.GetBlackBoard()?.CreateShowData(true);
    }
  }
}
exports.HonamiStorySubQuestData = HonamiStorySubQuestData;
//# sourceMappingURL=HonamiStoryQuestData.js.map