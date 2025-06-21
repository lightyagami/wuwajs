"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalData = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData");
class BeginnerCarnivalData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.TaskDataMap = new Map, this.JumpTaskMap = new Map, this.ChoseRoleId = 0, this.GetRoleTaskId = 0, this.ItemId = 0, this.GachaId = [], this.GiftId = []
  }
  PhraseEx(e) {
    this.TaskDataMap.clear();
    for (const o of e.l41?.L$s?.E$s ?? []) {
      const t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(o.s5n);
      if (t) {
        let e = this.TaskDataMap.get(t.TaskType);
        (e = e || []).push(o), this.TaskDataMap.set(t.TaskType, e)
      }
    }
    this.JumpTaskMap.clear();
    for (const r of e.l41.Mou) this.JumpTaskMap.set(r.Eou, r.Iou);
    this.ChoseRoleId = e.l41.Q6n;
    const t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(e.s5n);
    this.ItemId = t.ItemId, this.GachaId = t.GachaIds, this.GiftId = t.PayGifts, this.GetRoleTaskId = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTaskByTaskType(0).TaskId
  }
  GetProgress(e) {
    e = this.TaskDataMap.get(e);
    if (!e) return [0, 0];
    var t = e.length;
    let o = 0;
    for (const r of e) r.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken && o++;
    return [o, t]
  }
  GetTaskDataById(e) {
    for (var [, t] of this.TaskDataMap)
      for (const o of t)
        if (o.s5n === e) return o
  }
  GetTaskIdListByTypeId(e) {
    var t = [];
    for (const o of this.TaskDataMap.get(e)) t.push(o.s5n);
    return t
  }
  GetAnyRedDotShow() {
    for (var [, e] of this.TaskDataMap)
      for (const r of e)
        if (r.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10009),
      o = ModelManager_1.ModelManager.FunctionModel.IsOpen(10010);
    return !!(t && !this.GetHaveGachaEnter() || o && !this.GetHaveShopEnter()) || !this.ChoseRoleId
  }
  GetAnyTaskRedDotShow() {
    for (var [, e] of this.TaskDataMap)
      for (const t of e)
        if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    return !1
  }
  GetTabRedDotShow(e) {
    e = this.TaskDataMap.get(e);
    if (e)
      for (const t of e)
        if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    return !1
  }
  GetRoleGetTaskTabRedDotShow(e) {
    e = this.TaskDataMap.get(e);
    if (!e) return !1;
    for (const t of e)
      if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    for (const o of this.TaskDataMap.get(0) ?? [])
      if (o.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) return !0;
    return !this.ChoseRoleId
  }
  GetExDataRedPointShowState() {
    return this.GetAnyRedDotShow()
  }
  GetCurrentItemCount() {
    return this.ItemId ? ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemId) : 0
  }
  GetHaveShopEnter() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalShop) ?? "";
    return e || !1
  }
  SetShopEnter() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalShop, !0)
  }
  GetHaveGachaEnter() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalGacha) ?? "";
    return e || !1
  }
  SetGachaEnter() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalGacha, !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)
  }
  GetHaveChoseRoleViewEnter() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalChoseRoleView) ?? "";
    return e || !1
  }
  SetChoseRoleViewEnter() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BeginnerCarnivalChoseRoleView, !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id)
  }
}
exports.BeginnerCarnivalData = BeginnerCarnivalData;
//# sourceMappingURL=BeginnerCarnivalData.js.map