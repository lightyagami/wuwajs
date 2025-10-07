"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoActivityData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const PhotoFightActivityById_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightActivityById");
const PhotoFightActivityByInstId_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightActivityByInstId");
const PhotoFightActivityGroupByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightActivityGroupByActivityId");
const PhotoFightRewardByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightRewardByActivityId");
const PhotoFightRewardTabByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/PhotoFightRewardTabByActivityId");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityCommonDefine_1 = require("../../../ActivityCommonDefine");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityData_1 = require("../../../ActivityData");
const FightPhotoLevelData_1 = require("./FightPhotoLevelData");
const FightPhotoLevelGroupData_1 = require("./FightPhotoLevelGroupData");
const FightPhotoTaskData_1 = require("./FightPhotoTaskData");
class FightPhotoActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.BRd = new Map();
    this.kRd = new Map();
    this.ORd = [];
    this.IsNeedShowTip = false;
    this.q6c = new Map();
    this.qRd = new Map();
    this.lVl = (t, i) => t.Status !== i.Status ? t.Status - i.Status : t.Id - i.Id;
    this.GRd = [];
    this.x9l = 0;
    this.cBd = false;
  }
  OnInit(t) {
    t = t.Gbd;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FightPhotograph", 71, "PhotoFightActivityData未初始化 无效activityInfo");
      }
    } else {
      this.FRd();
      this.NRd();
      this.UpdateLevelGroupData(t.Fbd);
      this.UpdateTaskData(t.Nbd);
    }
  }
  GetExDataRedPointShowState() {
    return this.CheckRedDot();
  }
  CheckRedDot() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && (this.IsTaskHasRedDot() || this.IsLevelHasRedDot());
  }
  GetExDataFinishShowState() {
    for (const t of this.ORd) {
      if (!t.IsFinished) {
        return false;
      }
    }
    for (const i of this.q6c.values()) {
      if (!i.IsFinished) {
        return false;
      }
    }
    return true;
  }
  FRd() {
    for (const e of PhotoFightActivityGroupByActivityId_1.configPhotoFightActivityGroupByActivityId.GetConfigList(this.Id)) {
      var t = new FightPhotoLevelGroupData_1.FightPhotoLevelGroupData(e);
      this.BRd.set(e.Id, t);
      this.ORd.push(t);
      for (const o of t.LevelIdList) {
        var i = PhotoFightActivityById_1.configPhotoFightActivityById.GetConfig(o);
        if (i === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FightPhotograph", 71, "战斗拍照关卡配置不存在", ["levelId", o]);
          }
        } else {
          (i = new FightPhotoLevelData_1.FightPhotoLevelData(i)).LevelGroupData = t;
          this.kRd.set(o, i);
          t.PushFightPhotoLevel(i);
        }
      }
    }
    this.ORd.sort((t, i) => t.SortId - i.SortId);
  }
  VRd(t) {
    var i = this.BRd.get(t);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FightPhotograph", 71, "战斗拍照关卡组配置不存在", ["levelGroupId", t]);
    }
    return i;
  }
  jRd(t) {
    var i = this.kRd.get(t);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FightPhotograph", 71, "战斗拍照关卡配置不存在", ["levelId", t]);
    }
    return i;
  }
  UpdateLevelGroupData(t) {
    for (const e of t) {
      var i = this.VRd(e.S9n);
      if (i !== undefined) {
        i.UnlockTime = MathUtils_1.MathUtils.LongToNumber(e.pDs);
        this.UpdateLevelData(e.Vbd);
      }
    }
  }
  UpdateLevelData(t, i = true) {
    for (const o of t) {
      var e = this.jRd(o.gG_);
      if (e !== undefined) {
        if (!i && e.IsDifficulty && !e.IsUnLock && o.Sps) {
          this.IsNeedShowTip = true;
        }
        e.IsUnLock = o.Sps;
        e.IsFinished = o.jbd > 0;
        e.SetRoleIdList(o.fUs);
      }
    }
  }
  GetSelectLevelGroupDataIndex() {
    const i = this.GetCurrentLevelData(false);
    if (i) {
      return this.ORd.findIndex(t => t.Id === i.LevelGroupData.Id);
    } else {
      return this.GetFirstUnFinishedLevelGroupDataIndex();
    }
  }
  GetFirstUnFinishedLevelGroupDataIndex() {
    var i = this.ORd.length;
    let e = -1;
    for (let t = 0; t < i; t++) {
      var o = this.ORd[t];
      if (o.IsUnLock && !o.IsFinished) {
        return t;
      }
      if (e === -1 && !o.IsUnLock) {
        e = t;
      }
    }
    if (e === -1) {
      return i - 1;
    } else {
      return e - 1;
    }
  }
  IsLevelHasRedDot() {
    for (const t of this.kRd.values()) {
      if (t.HasRedDot) {
        return true;
      }
    }
    return false;
  }
  GetLevelGroupDataList() {
    return this.ORd;
  }
  GetTotalLevelNum() {
    return this.BRd.size;
  }
  GetFinishedLevelNum() {
    let t = 0;
    for (const i of this.BRd.values()) {
      if (i.IsFinished) {
        t++;
      }
    }
    return t;
  }
  NRd() {
    for (const i of PhotoFightRewardByActivityId_1.configPhotoFightRewardByActivityId.GetConfigList(this.Id)) {
      var t = new FightPhotoTaskData_1.FightPhotoTaskData(i);
      this.q6c.set(i.Id, t);
      this.qRd.set(t.TabType, [...(this.qRd.get(t.TabType) ?? []), t]);
    }
  }
  HRd(t) {
    var i = this.q6c.get(t);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FightPhotograph", 71, "战斗拍照任务配置不存在", ["taskId", t]);
    }
  }
  UpdateTaskData(t) {
    for (const i of t) {
      this.HRd(i.s5n).Status = ActivityCommonDefine_1.taskStateResolver[i.H6n];
    }
  }
  RequestTaskReward(t) {
    var i = [];
    for (const e of this.GetTaskDataList(t)) {
      if (e.IsUnclaimed) {
        i.push(e.Id);
      }
    }
    ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.RequestTaskReward(i);
  }
  UpdateTaskRewardStatus(t) {
    for (const i of t) {
      this.HRd(i.s5n).Status = ActivityCommonDefine_1.taskStateResolver[i.H6n];
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  IsTaskHasRedDot() {
    for (const t of this.q6c.values()) {
      if (t.IsUnclaimed) {
        return true;
      }
    }
    return false;
  }
  IsTaskHasRedDotByTab(t) {
    for (const i of this.qRd.get(t) ?? []) {
      if (i.IsUnclaimed) {
        return true;
      }
    }
    return false;
  }
  GetTaskDataList(t) {
    return (this.qRd.get(t) ?? []).sort(this.lVl);
  }
  GetTotalTaskNum() {
    return this.q6c.size;
  }
  GetFinishedTaskNum() {
    let t = 0;
    for (const i of this.q6c.values()) {
      if (i.IsFinished) {
        t++;
      }
    }
    return t;
  }
  GetFightPhotoTaskTabList() {
    var t;
    if (this.GRd.length === 0) {
      t = PhotoFightRewardTabByActivityId_1.configPhotoFightRewardTabByActivityId.GetConfigList(this.Id);
      this.GRd = [...t];
    }
    return this.GRd;
  }
  GetCurrentLevelData(t = true) {
    var i;
    if (ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.CheckInFightPhotoDungeon()) {
      i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      i = PhotoFightActivityByInstId_1.configPhotoFightActivityByInstId.GetConfig(i);
      this.x9l = i.Id;
    }
    if (this.x9l !== 0) {
      return this.jRd(this.x9l);
    }
    if (t && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FightPhotograph", 71, "当前不存在正在进行的战斗拍照关卡");
    }
  }
  SetCurrentLevelId(t) {
    this.x9l = t;
  }
  get IsNeedShowFightPhotoMainView() {
    return this.cBd;
  }
  set IsNeedShowFightPhotoMainView(t) {
    this.cBd = t;
  }
}
exports.FightPhotoActivityData = FightPhotoActivityData;
//# sourceMappingURL=FightPhotoActivityData.js.map