"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  CiacconaActivityConfigById_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityConfigById"),
  CiacconaActivityRewardAll_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityRewardAll"),
  CiacconaActivityRewardById_1 = require("../../../Core/Define/ConfigQuery/CiacconaActivityRewardById"),
  CiacconaChapterSlotById_1 = require("../../../Core/Define/ConfigQuery/CiacconaChapterSlotById"),
  CiacconaGalChapterById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalChapterById"),
  CiacconaGalChoiceById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalChoiceById"),
  CiacconaGalEndingAll_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalEndingAll"),
  CiacconaGalEndingById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalEndingById"),
  CiacconaGalStepById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalStepById"),
  CiacconaGalSubEndingById_1 = require("../../../Core/Define/ConfigQuery/CiacconaGalSubEndingById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CiacconaGalActivityData_1 = require("./Data/CiacconaGalActivityData"),
  CiacconaGalChapterData_1 = require("./Data/CiacconaGalChapterData"),
  CiacconaGalChapterSlotData_1 = require("./Data/CiacconaGalChapterSlotData"),
  CiacconaGalChoiceData_1 = require("./Data/CiacconaGalChoiceData"),
  CiacconaGalEndingData_1 = require("./Data/CiacconaGalEndingData"),
  CiacconaGalRewardData_1 = require("./Data/CiacconaGalRewardData"),
  CiacconaGalStepData_1 = require("./Data/CiacconaGalStepData"),
  CiacconaGalSubEndingData_1 = require("./Data/CiacconaGalSubEndingData");
class CiacconaGalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.Vbc = {
      CiacconaGalChapterData: CiacconaGalChapterById_1.configCiacconaGalChapterById,
      CiacconaGalEndingData: CiacconaGalEndingById_1.configCiacconaGalEndingById,
      CiacconaGalSubEndingData: CiacconaGalSubEndingById_1.configCiacconaGalSubEndingById,
      CiacconaGalStepData: CiacconaGalStepById_1.configCiacconaGalStepById,
      CiacconaGalChoiceData: CiacconaGalChoiceById_1.configCiacconaGalChoiceById,
      CiacconaGalChapterSlotData: CiacconaChapterSlotById_1.configCiacconaChapterSlotById,
      CiacconaGalActivityData: CiacconaActivityConfigById_1.configCiacconaActivityConfigById,
      CiacconaGalRewardData: CiacconaActivityRewardById_1.configCiacconaActivityRewardById
    }, this.NQ = new Map, this.jbc = [], this.X4c = void 0, this.DataUpdateMask = 0, this.IsCurStepDataListDirty = !1
  }
  get ActivityData() {
    return this.X4c ?? this.GetActivityDataById(104800001)
  }
  OnClear() {
    return this.IsCurStepDataListDirty = !1, this.DataUpdateMask = 0, this.NQ.clear(), this.jbc.length = 0, !(this.X4c = void 0)
  }
  Hbc(a, t) {
    var i, e = this.Vbc[t.name].GetConfig(a, !0);
    if (e) return this.NQ.has(t.name) || this.NQ.set(t.name, new Map), (i = this.NQ.get(t.name)).has(a) || i.set(a, new t(e)), i.get(a)
  }
  UpdateByServerActivityData(a, t) {
    var i = a.J3c;
    i ? (this.UpdateAllChapterData(i.e4c), this.UpdateAllEndingData(i.i4c), this.UpdateProgressRewardData(i.t4c), this.X4c = this.GetActivityDataById(t), this.X4c.UpdateByServerData(i), this.X4c.UpdateEndTime(Number(MathUtils_1.MathUtils.LongToBigInt(a.xps))), this.DataUpdateMask = 4294967295) : Log_1.Log.CheckError() && Log_1.Log.Error("CiacconaGal", 74, "夏空活动服务器数据异常")
  }
  UpdateAllChapterData(a) {
    for (const t of a) {
      this.GetChapterDataById(t.s4c).UpdateByServerData(t);
      for (const i of t.h4c) this.GetChoiceDataById(i.l4c).UpdateByServerData(t);
      for (const e of t.a4c) this.GetSubEndingDataById(e.u4c).UpdateByServerData(e)
    }
    this.DataUpdateMask |= 1
  }
  UpdateAllEndingData(a) {
    for (const t of a) this.GetEndingDataById(t.u4c).UpdateByServerData(t);
    this.DataUpdateMask |= 8
  }
  UpdateProgressRewardData(a) {
    for (const t of a) this.GetRewardDataById(t.N6n).UpdateByServerData(t);
    this.DataUpdateMask |= 4
  }
  UpdateInspirationData(a) {
    a && (this.X4c?.UpdateInspirationData(a), this.DataUpdateMask |= 2)
  }
  UpdateActivityState(a) {
    this.X4c?.UpdateState(a), this.DataUpdateMask |= 16
  }
  GetChapterDataById(a) {
    return this.Hbc(a, CiacconaGalChapterData_1.CiacconaGalChapterData)
  }
  GetChoiceDataById(a) {
    return this.Hbc(a, CiacconaGalChoiceData_1.CiacconaGalChoiceData)
  }
  GetEndingDataById(a) {
    return this.Hbc(a, CiacconaGalEndingData_1.CiacconaGalEndingData)
  }
  GetStepDataById(a) {
    return this.Hbc(a, CiacconaGalStepData_1.CiacconaGalStepData)
  }
  GetAllEndingDataList() {
    return CiacconaGalEndingAll_1.configCiacconaGalEndingAll.GetConfigList().map(a => this.Hbc(a.Id, CiacconaGalEndingData_1.CiacconaGalEndingData))
  }
  GetSubEndingDataById(a) {
    return this.Hbc(a, CiacconaGalSubEndingData_1.CiacconaGalSubEndingData)
  }
  GetChapterSlotDataById(a) {
    return this.Hbc(a, CiacconaGalChapterSlotData_1.CiacconaGalChapterSlotData)
  }
  GetActivityDataById(a) {
    return this.Hbc(a, CiacconaGalActivityData_1.CiacconaGalActivityData)
  }
  GetRewardDataById(a) {
    return this.Hbc(a, CiacconaGalRewardData_1.CiacconaGalRewardData)
  }
  GetAllRewardDataByActivityId(t) {
    return CiacconaActivityRewardAll_1.configCiacconaActivityRewardAll.GetConfigList().filter(a => a.ActivityId === t).map(a => this.Hbc(a.Id, CiacconaGalRewardData_1.CiacconaGalRewardData))
  }
  GetChapterDataBySubEndingId(a) {
    if (this.ActivityData)
      for (const i of this.ActivityData.SlotIds) {
        var t = this.GetChapterSlotDataById(i),
          t = this.GetChapterDataById(t.ChapterId);
        if (t.SubEndingIds.includes(a)) return t
      }
  }
  GetAllChapterData() {
    if (this.ActivityData) return this.ActivityData.SlotIds.map(a => {
      a = this.GetChapterSlotDataById(a);
      return this.GetChapterDataById(a.ChapterId)
    })
  }
  HasAnyProgressReward() {
    return this.GetAllRewardDataByActivityId(this.ActivityData.Id).some(a => a.CanReceive && !a.IsReceived)
  }
  HasAnyEndingReward() {
    return this.GetAllEndingDataList().some(a => a.IsFinished && !a.IsRewarded)
  }
  HasAnySubEndingReward() {
    for (const t of this.ActivityData.SlotIds) {
      var a = this.GetChapterSlotDataById(t);
      if (this.GetChapterDataById(a.ChapterId).SubEndingIds.map(a => this.GetSubEndingDataById(a)).some(a => a.IsFinished && !a.IsRewarded)) return !0
    }
    return !1
  }
  HasAnySubEndingRewardByChapterId(a) {
    return this.GetChapterDataById(a).SubEndingIds.map(a => this.GetSubEndingDataById(a)).some(a => a.IsFinished && !a.IsRewarded)
  }
  GetEndingProgress() {
    var a = this.GetAllEndingDataList();
    return [a.filter(a => a.IsFinished).length, a.length]
  }
  GetSubEndingProgress() {
    let a = 0,
      t = 0;
    for (const e of this.ActivityData.SlotIds) {
      var i = this.GetChapterSlotDataById(e),
        i = this.GetChapterDataById(i.ChapterId).SubEndingIds.map(a => this.GetSubEndingDataById(a));
      a += i.filter(a => a.IsFinished).length, t += i.length
    }
    return [a, t]
  }
  GetProgressRewardProgress() {
    var a = this.GetAllRewardDataByActivityId(this.ActivityData.Id);
    return [a.filter(a => a.CanReceive).length, a.length]
  }
  GetCurStepDataList() {
    return this.jbc
  }
  TryPushCurStepDataById(a) {
    a = this.GetStepDataById(a);
    return !!a && (this.PushCurStepData(a), !0)
  }
  PushCurStepData(a) {
    this.IsCurStepDataListDirty = !0, this.jbc.push(a)
  }
  PopCurStepData() {
    return this.IsCurStepDataListDirty = !0, this.jbc.pop()
  }
  ClearCurStepData() {
    this.IsCurStepDataListDirty = !0, this.jbc.length = 0
  }
}
exports.CiacconaGalModel = CiacconaGalModel;
//# sourceMappingURL=CiacconaGalModel.js.map