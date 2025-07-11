"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyBoardData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const DangoMonopolyGridData_1 = require("./DangoMonopolyGridData");
class DangoMonopolyBoardData {
  constructor(t, i) {
    this.Id = 0;
    this.GroupId = 0;
    this.Index = 0;
    this.IsRewarded = false;
    this.RewardItemId = 0;
    this.RewardItemCount = 0;
    this.FinishTitle = "";
    this.FinishDesc = "";
    this.GridList = [];
    this.GridMap = new Map();
    this.ActivityData = undefined;
    this.UnlockTime = 0;
    this.RecordRollDiceTimes = 0;
    this.RecordTriggerBuffMap = new Map();
    this.OwnedBuffIdList = [];
    this.Id = t;
    this.Index = i;
  }
  static Create(t, i) {
    i = new DangoMonopolyBoardData(t.BoardId, i);
    i.AU(t);
    return i;
  }
  AU(t) {
    this.RewardItemId = t.ItemId;
    this.RewardItemCount = t.ItemNum;
    this.GroupId = t.BoardGroupId;
    this.FinishTitle = t.FinishTitle;
    this.FinishDesc = t.FinishDesc;
    ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetGridList(t.GridGroupId).forEach((t, i) => {
      i = DangoMonopolyGridData_1.DangoMonopolyGridData.Create(t, i, this);
      this.GridList.push(i);
      this.GridMap.set(t.GridId, i);
    });
  }
  SetActivityData(t) {
    this.ActivityData = t;
  }
  SetRewarded(t) {
    this.IsRewarded = t;
  }
  IsFinish() {
    var t = this.ActivityData?.CurrentBoardData;
    if (t?.IsGreaterIndex(this.Index)) {
      return true;
    }
    if (t?.IsEqualIndex(this.Index) && !this.GetCurrentGridData()?.IsLessIndex(this.GridList.length - 1)) {
      return true;
    }
    return false;
  }
  IsRunning() {
    return !!this.ActivityData?.CurrentBoardData?.IsEqualIndex(this.Index);
  }
  GetCurrentGridData() {
    if (this.IsRunning()) {
      return this.ActivityData?.RunningGridData;
    }
  }
  IsGreaterIndex(t) {
    return this.Index > t;
  }
  IsEqualIndex(t) {
    return this.Index === t;
  }
  IsLessIndex(t) {
    return this.Index < t;
  }
  IsCanReceiveReward() {
    return !this.IsRewarded && !!this.IsFinish();
  }
  GetDangoBuffShowList() {
    const s = [];
    const o = this.GetFinishGridNum();
    this.GridList.forEach(t => {
      var i;
      var r;
      var e = t.GetDangoData();
      if (e) {
        i = e.Id;
        r = t.GetAddPropertyConfig();
        s.push({
          DangoId: i,
          PropertyId: r?.Id ?? 0,
          GridId: t.Id,
          IsActive: o >= t.GetPosition(),
          DangoIcon: e.Icon,
          DangoName: e.NameKey,
          PropertyDesc: r?.Desc ?? "not property, gridId: " + t.Id,
          PropertyTitle: r?.Title ?? "not property, gridId: " + t.Id
        });
      }
    });
    return s;
  }
  GetAllGridRewardItemList() {
    const i = [];
    this.GridList.forEach(t => {
      if (t.IsExistItem()) {
        i.push({
          Id: t.ItemId,
          Num: t.ItemCount,
          IsDouble: t.IsActiveDouble(),
          UniqueId: 0
        });
      }
    });
    return this.ActivityData?.GetItemShowList(i) ?? [];
  }
  GetPosition() {
    return this.Index + 1;
  }
  GetFinishGridNum() {
    var t;
    if (this.IsFinish()) {
      return this.GridList.length;
    } else if (t = this.GetCurrentGridData()) {
      return t.GetPosition();
    } else {
      return 0;
    }
  }
  InitStartMoveDango(t) {
    if (!this.IsRunning()) {
      return 0;
    }
    var i = this.GetCurrentGridData();
    if (!i) {
      const s = this.GridList[t] ?? this.GridList[this.GridList.length - 1];
      this.ActivityData?.UpdateTargetGrid(s?.Id);
      return s.GetPosition();
    }
    var i = i.Index;
    var r = Math.min(i + t, this.GridList.length - 1);
    var e = r - i;
    const s = this.GridList[r];
    this.ActivityData?.UpdateTargetGrid(s?.Id);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "InitStartMoveDango=>初始化移动", ["骰子最终结果(包含特性之后)", t], ["实际移动步数", e], ["起点Index", i], ["目标格子Id", s.Id], ["目标格子Index", r], ["目标格子位置", s.GetPosition()]);
    }
    return e;
  }
  MoveDangoOneStep() {
    var t;
    var i;
    return !!this.IsRunning() && (i = this.ActivityData?.RunningGridData?.Id ?? 0, t = this.ActivityData?.TargetGridData?.Id ?? 0, i = Math.min(i + 1, t), this.ActivityData?.UpdateRunningGrid(i), true);
  }
  IsMoveToTarget() {
    return (this.ActivityData?.RunningGridData?.Id ?? 0) === (this.ActivityData?.TargetGridData?.Id ?? 0);
  }
  GetEndGridId() {
    return this.GridList[this.GridList.length - 1]?.Id ?? 0;
  }
  GetStartGridId() {
    return this.GridList[0]?.Id ?? 0;
  }
  GetFirstDoubleGrid() {
    return this.GridList.find(t => t.PropertyIsDouble());
  }
  IsLock() {
    return this.GetUnlockRemainTime() > 0;
  }
  GetUnlockRemainTime() {
    if (this.UnlockTime <= 0) {
      return 0;
    } else {
      return Math.max(0, this.UnlockTime - TimeUtil_1.TimeUtil.GetServerTime());
    }
  }
  UpdateUnlockTime(t) {
    t = MathUtils_1.MathUtils.LongToNumber(t ?? 0);
    this.UnlockTime = t;
  }
  UpdateRollDiceTimes(t) {
    this.RecordRollDiceTimes = t ?? 0;
  }
  AddRollDiceTimes() {
    this.RecordRollDiceTimes++;
  }
  UpdateRecordTriggerBuff(t, i) {
    this.RecordTriggerBuffMap.set(t, i);
  }
  AddRecordTriggerBuff(t) {
    var i;
    if (!(t <= 0)) {
      i = this.RecordTriggerBuffMap.get(t) ?? 0;
      this.RecordTriggerBuffMap.set(t, i + 1);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "添加触发的特性记录", ["棋盘id", this.Id], ["特性id", t], ["次数", i + 1]);
      }
    }
  }
  ClearRecordTriggerBuff() {
    this.RecordTriggerBuffMap.clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "清理触发的特性记录", ["棋盘id", this.Id]);
    }
  }
  GetRecordTriggerBuffTotalTimes() {
    let r = 0;
    this.RecordTriggerBuffMap.forEach((t, i) => {
      if (!this.ActivityData?.BuffIsImplicit(i)) {
        r += t;
      }
    });
    return r;
  }
  UpdateOwnedBuffIdList(t) {
    this.OwnedBuffIdList.push(t);
  }
  ClearOwnedBuffIdList() {
    this.OwnedBuffIdList.length = 0;
  }
  GetGridListDango() {
    return this.GridList.filter(t => t.IsExistDango());
  }
  GetDangoIdByBuffId(i) {
    return this.GetGridListDango().find(t => t.AddPropertyId === i)?.DangoId ?? this.ActivityData?.Dango?.Id ?? 0;
  }
}
exports.DangoMonopolyBoardData = DangoMonopolyBoardData;
//# sourceMappingURL=DangoMonopolyBoardData.js.map