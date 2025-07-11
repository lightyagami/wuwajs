"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelResponseData = undefined;
const RoleDefine_1 = require("../RoleDefine");
class RoleLevelResponseData {
  constructor() {
    this.xuo = 0;
    this.wuo = new RoleLevelUpViewResponseData();
  }
  UpdateRoleLevelUpViewResponse(e) {
    this.wuo = e;
  }
  CalculateItemList(e, t) {
    for (const i of this.wuo.O9n) {
      if (i.Z4n === e) {
        this.xuo = e;
        i.e5n = t ? i.e5n + 1 : i.e5n - 1;
        return true;
      }
    }
    if (!t) {
      return false;
    }
    this.xuo = e;
    var s = new RoleDefine_1.ArrayIntInt();
    s.Z4n = e;
    s.e5n = 1;
    this.wuo.O9n.push(s);
    return true;
  }
  SetSelectedItemId(e) {
    this.xuo = e;
  }
  GetItemList() {
    return this.wuo.O9n;
  }
  ClearItemList() {
    this.wuo.O9n = [];
  }
  GetItemCountByItemId(e) {
    for (const t of this.wuo.O9n) {
      if (t.Z4n === e) {
        return t.e5n;
      }
    }
    return 0;
  }
  GetCostList() {
    return this.wuo.kHn;
  }
  GetOverFlowMap() {
    var e = new Map();
    for (const t of this.wuo.VHn) {
      e.set(t.Z4n, t.e5n);
    }
    return e;
  }
  GetAddExp() {
    return this.wuo.HHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.wuo.NHn) {
      e.set(t.Z4n, t.e5n);
    }
    return e;
  }
  GetLevelExp(e) {
    for (const t of this.wuo.jHn) {
      if (t.Z4n === e) {
        return t.e5n;
      }
    }
    return 0;
  }
  GetSelectedItemId() {
    return this.xuo;
  }
}
exports.RoleLevelResponseData = RoleLevelResponseData;
class RoleLevelUpViewResponseData {
  constructor() {
    this.F6n = 1;
    this.jHn = undefined;
    this.U8n = 0;
    this.HHn = 0;
    this.NHn = undefined;
    this.kHn = undefined;
    this.VHn = undefined;
    this.O9n = undefined;
  }
}
//# sourceMappingURL=RoleLevelResponseData.js.map