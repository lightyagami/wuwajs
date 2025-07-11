"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItemModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const BuffItemData_1 = require("./BuffItemData");
const UseBuffItemRoleData_1 = require("./UseBuffItemRoleData");
class BuffItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.F0t = new Map();
    this.lnt = new Map();
    this.K4l = new Map();
    this.V0t = 0;
    this.H0t = undefined;
    this.j0t = undefined;
    this.W0t = 0;
    this.K0t = e => {
      if (this.GetBuffItemRemainCdTime(this.W0t) <= 0) {
        if (this.j0t) {
          this.j0t();
        }
        this.Q0t();
      }
    };
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.ClearAllUseBuffItemRoleData();
    this.ClearAllBuffItemData();
    return true;
  }
  OnLeaveLevel() {
    this.ClearAllUseBuffItemRoleData();
    return true;
  }
  NewBuffItemData(e, t, i) {
    t = new BuffItemData_1.BuffItemData(e, t, i);
    this.lnt.set(e, t);
  }
  GetBuffItemData(e) {
    return this.lnt.get(e);
  }
  GetBuffItemMap() {
    return this.lnt;
  }
  GetInCdBuffItemMap(e) {
    for (const i of this.lnt.values()) {
      var t;
      if (!(i.GetBuffItemRemainCdTime() <= 0)) {
        t = i.ItemConfigId;
        e.set(t, i);
      }
    }
  }
  ClearAllBuffItemData() {
    this.F0t.clear();
    this.lnt.clear();
  }
  NewUseBuffItemRoleData(e, t, i, s, r, f, a, u) {
    e = new UseBuffItemRoleData_1.UseBuffItemRoleData(e, t, i, s, r, f, a, u);
    this.F0t.set(t, e);
  }
  SetCurrentUseBuffItemId(e) {
    this.V0t = e;
  }
  GetCurrentUseBuffItemId() {
    return this.V0t;
  }
  GetAllUseBuffItemRole() {
    return this.F0t;
  }
  GetUseBuffItemRole(e) {
    return this.F0t.get(e);
  }
  GetUseItemRoleByRoleConfigId(e) {
    for (const t of this.F0t.values()) {
      if (t.RoleConfigId === e) {
        return t;
      }
    }
  }
  ClearAllUseBuffItemRoleData() {
    this.F0t.clear();
  }
  GetBuffItemRemainCdTime(e) {
    e = this.GetBuffItemData(e);
    if (e) {
      return e.GetBuffItemRemainCdTime();
    } else {
      return 0;
    }
  }
  GetBuffItemTotalCdTime(e) {
    e = this.GetBuffItemData(e);
    if (e) {
      return e.GetBuffItemTotalCdTime();
    } else {
      return 0;
    }
  }
  SetBuffItemCdTimeStamp(e, t, i) {
    var s = this.GetBuffItemData(e);
    if (s) {
      s.SetEndCdTimeStamp(t);
      s.SetTotalCdTime(i);
    } else {
      this.NewBuffItemData(e, t, i);
    }
  }
  SetBuffItemCdEndCallback(e, t) {
    if (this.GetBuffItemData(e)) {
      this.W0t = e;
      this.j0t = t;
      this.H0t = TimerSystem_1.TimerSystem.Forever(this.K0t, TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  Q0t() {
    if (TimerSystem_1.TimerSystem.Has(this.H0t)) {
      TimerSystem_1.TimerSystem.Remove(this.H0t);
    }
    this.W0t = 0;
    this.j0t = undefined;
    this.H0t = undefined;
  }
  SetBuffEquipItem(e, t) {
    this.K4l.set(e, t);
  }
  IsEquippedBuffItem(e) {
    return !!this.K4l.get(e);
  }
  GetEquippedBuffsByRoleId(e, t = false) {
    var i = new Array();
    for (const s of ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffEquipItemByRoleId(e)) {
      if (!!this.IsEquippedBuffItem(s.ItemId) && (!t || !!s.EnableInUI)) {
        i.push(...s.Buffs);
      }
    }
    return i;
  }
  GetEquippedBuffItemConfigByRoleId(e) {
    var t = new Array();
    for (const i of ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffEquipItemByRoleId(e)) {
      if (this.IsEquippedBuffItem(i.ItemId)) {
        t.push(i);
      }
    }
    return t;
  }
}
exports.BuffItemModel = BuffItemModel;
//# sourceMappingURL=BuffItemModel.js.map