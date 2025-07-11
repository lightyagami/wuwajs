"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CiacconaActivityConfigById_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityConfigById");
const CiacconaActivityRewardAll_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityRewardAll");
const CiacconaActivityRewardById_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityRewardById");
const CiacconaChapterSlotById_1 = require("../../../Core/Define/ConfigQuery/CiacconaChapterSlotById");
const CiacconaGalChapterById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalChapterById");
const CiacconaGalChoiceById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalChoiceById");
const CiacconaGalEndingAll_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalEndingAll");
const CiacconaGalEndingById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalEndingById");
const CiacconaGalStepById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalStepById");
const CiacconaGalSubEndingById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalSubEndingById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CiacconaGalActivityData_1 = require("./Data/CiacconaGalActivityData");
const CiacconaGalChapterData_1 = require("./Data/CiacconaGalChapterData");
const CiacconaGalChapterSlotData_1 = require("./Data/CiacconaGalChapterSlotData");
const CiacconaGalChoiceData_1 = require("./Data/CiacconaGalChoiceData");
const CiacconaGalEndingData_1 = require("./Data/CiacconaGalEndingData");
const CiacconaGalRewardData_1 = require("./Data/CiacconaGalRewardData");
const CiacconaGalStepData_1 = require("./Data/CiacconaGalStepData");
const CiacconaGalSubEndingData_1 = require("./Data/CiacconaGalSubEndingData");
class CiacconaGalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Vbc = {
      CiacconaGalChapterData: CiacconaGalChapterById_1.configCiacconaGalChapterById,
      CiacconaGalEndingData: CiacconaGalEndingById_1.configCiacconaGalEndingById,
      CiacconaGalSubEndingData: CiacconaGalSubEndingById_1.configCiacconaGalSubEndingById,
      CiacconaGalStepData: CiacconaGalStepById_1.configCiacconaGalStepById,
      CiacconaGalChoiceData: CiacconaGalChoiceById_1.configCiacconaGalChoiceById,
      CiacconaGalChapterSlotData: CiacconaChapterSlotById_1.configCiacconaChapterSlotById,
      CiacconaGalActivityData: CiacconaActivityConfigById_1.configCiacconaActivityConfigById,
      CiacconaGalRewardData: CiacconaActivityRewardById_1.configCiacconaActivityRewardById
    };
    this.NQ = new Map();
    this.jbc = [];
    this.X4c = undefined;
    this.DataUpdateMask = 0;
    this.IsCurStepDataListDirty = false;
  }
  get ActivityData() {
    return this.X4c ?? this.GetActivityDataById(104800001);
  }
  OnClear() {
    this.IsCurStepDataListDirty = false;
    this.DataUpdateMask = 0;
    this.NQ.clear();
    this.jbc.length = 0;
    return !(this.X4c = undefined);
  }
  Hbc(a, t) {
    var i;
    var e = this.Vbc[t.name].GetConfig(a, true);
    if (e) {
      if (!this.NQ.has(t.name)) {
        this.NQ.set(t.name, new Map());
      }
      if (!(i = this.NQ.get(t.name)).has(a)) {
        i.set(a, new t(e));
      }
      return i.get(a);
    }
  }
  UpdateByServerActivityData(a, t) {
    var i = a.J3c;
    if (i) {
      this.UpdateAllChapterData(i.e4c);
      this.UpdateAllEndingData(i.i4c);
      this.UpdateProgressRewardData(i.t4c);
      this.X4c = this.GetActivityDataById(t);
      this.X4c.UpdateByServerData(i);
      this.X4c.UpdateEndTime(Number(MathUtils_1.MathUtils.LongToBigInt(a.xps)));
      this.DataUpdateMask = 4294967295;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CiacconaGal", 74, "夏空活动服务器数据异常");
    }
  }
  UpdateAllChapterData(a) {
    for (const t of a) {
      this.GetChapterDataById(t.s4c).UpdateByServerData(t);
      for (const i of t.h4c) {
        this.GetChoiceDataById(i.l4c).UpdateByServerData(t);
      }
      for (const e of t.a4c) {
        this.GetSubEndingDataById(e.u4c).UpdateByServerData(e);
      }
    }
    this.DataUpdateMask |= 1;
  }
  UpdateAllEndingData(a) {
    for (const t of a) {
      this.GetEndingDataById(t.u4c).UpdateByServerData(t);
    }
    this.DataUpdateMask |= 8;
  }
  UpdateProgressRewardData(a) {
    for (const t of a) {
      this.GetRewardDataById(t.N6n).UpdateByServerData(t);
    }
    this.DataUpdateMask |= 4;
  }
  UpdateInspirationData(a) {
    if (a) {
      this.X4c?.UpdateInspirationData(a);
      this.DataUpdateMask |= 2;
    }
  }
  UpdateActivityState(a) {
    this.X4c?.UpdateState(a);
    this.DataUpdateMask |= 16;
  }
  GetChapterDataById(a) {
    return this.Hbc(a, CiacconaGalChapterData_1.CiacconaGalChapterData);
  }
  GetChoiceDataById(a) {
    return this.Hbc(a, CiacconaGalChoiceData_1.CiacconaGalChoiceData);
  }
  GetEndingDataById(a) {
    return this.Hbc(a, CiacconaGalEndingData_1.CiacconaGalEndingData);
  }
  GetStepDataById(a) {
    return this.Hbc(a, CiacconaGalStepData_1.CiacconaGalStepData);
  }
  GetAllEndingDataList() {
    return CiacconaGalEndingAll_1.configCiacconaGalEndingAll.GetConfigList().map(a => this.Hbc(a.Id, CiacconaGalEndingData_1.CiacconaGalEndingData));
  }
  GetSubEndingDataById(a) {
    return this.Hbc(a, CiacconaGalSubEndingData_1.CiacconaGalSubEndingData);
  }
  GetChapterSlotDataById(a) {
    return this.Hbc(a, CiacconaGalChapterSlotData_1.CiacconaGalChapterSlotData);
  }
  GetActivityDataById(a) {
    return this.Hbc(a, CiacconaGalActivityData_1.CiacconaGalActivityData);
  }
  GetRewardDataById(a) {
    return this.Hbc(a, CiacconaGalRewardData_1.CiacconaGalRewardData);
  }
  GetAllRewardDataByActivityId(t) {
    return CiacconaActivityRewardAll_1.configCiacconaActivityRewardAll.GetConfigList().filter(a => a.ActivityId === t).map(a => this.Hbc(a.Id, CiacconaGalRewardData_1.CiacconaGalRewardData));
  }
  GetChapterDataBySubEndingId(a) {
    if (this.ActivityData) {
      for (const i of this.ActivityData.SlotIds) {
        var t = this.GetChapterSlotDataById(i);
        var t = this.GetChapterDataById(t.ChapterId);
        if (t.SubEndingIds.includes(a)) {
          return t;
        }
      }
    }
  }
  GetAllChapterData() {
    if (this.ActivityData) {
      return this.ActivityData.SlotIds.map(a => {
        a = this.GetChapterSlotDataById(a);
        return this.GetChapterDataById(a.ChapterId);
      });
    }
  }
  HasAnyProgressReward() {
    return this.GetAllRewardDataByActivityId(this.ActivityData.Id).some(a => a.CanReceive && !a.IsReceived);
  }
  HasAnyEndingReward() {
    return this.GetAllEndingDataList().some(a => a.IsFinished && !a.IsRewarded);
  }
  HasAnySubEndingReward() {
    for (const t of this.ActivityData.SlotIds) {
      var a = this.GetChapterSlotDataById(t);
      if (this.GetChapterDataById(a.ChapterId).SubEndingIds.map(a => this.GetSubEndingDataById(a)).some(a => a.IsFinished && !a.IsRewarded)) {
        return true;
      }
    }
    return false;
  }
  HasAnySubEndingRewardByChapterId(a) {
    return this.GetChapterDataById(a).SubEndingIds.map(a => this.GetSubEndingDataById(a)).some(a => a.IsFinished && !a.IsRewarded);
  }
  GetEndingProgress() {
    var a = this.GetAllEndingDataList();
    return [a.filter(a => a.IsFinished).length, a.length];
  }
  GetSubEndingProgress() {
    let a = 0;
    let t = 0;
    for (const e of this.ActivityData.SlotIds) {
      var i = this.GetChapterSlotDataById(e);
      var i = this.GetChapterDataById(i.ChapterId).SubEndingIds.map(a => this.GetSubEndingDataById(a));
      a += i.filter(a => a.IsFinished).length;
      t += i.length;
    }
    return [a, t];
  }
  GetProgressRewardProgress() {
    var a = this.GetAllRewardDataByActivityId(this.ActivityData.Id);
    return [a.filter(a => a.CanReceive).length, a.length];
  }
  GetCurStepDataList() {
    return this.jbc;
  }
  TryPushCurStepDataById(a) {
    a = this.GetStepDataById(a);
    return !!a && (this.PushCurStepData(a), true);
  }
  PushCurStepData(a) {
    this.IsCurStepDataListDirty = true;
    this.jbc.push(a);
  }
  PopCurStepData() {
    this.IsCurStepDataListDirty = true;
    return this.jbc.pop();
  }
  ClearCurStepData() {
    this.IsCurStepDataListDirty = true;
    this.jbc.length = 0;
  }
}
exports.CiacconaGalModel = CiacconaGalModel;
//# sourceMappingURL=CiacconaGalModel.js.map