"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationData = undefined;
const RoleUtils_1 = require("../RoleUi/RoleUtils");
class EditFormationRoleData {
  constructor(t, i, e, s, r) {
    this.Position = 0;
    this.ConfigId = 0;
    this.RoleSkinId = 0;
    this.PlayerId = 0;
    this.Level = 0;
    this.Position = t;
    this.ConfigId = i;
    this.RoleSkinId = e;
    this.PlayerId = r;
    this.Level = s;
  }
}
class EditFormationData {
  constructor(t) {
    this.FormationId = 0;
    this.n5t = 0;
    this.Wke = [];
    this.pXe = new Map();
    this.FormationId = t;
  }
  AddRoleData(t, i, e, s, r = false) {
    var o = this.Wke.length + 1;
    this.Wke.push(t);
    var t = new EditFormationRoleData(o, t, i, e, s);
    this.pXe.set(o, t);
    if (r) {
      this.n5t = o;
    }
  }
  GetRoleDataByPosition(t) {
    return this.pXe.get(t);
  }
  GetRoleDataById(t) {
    for (var [, i] of this.pXe) {
      if (i.ConfigId === t) {
        return i;
      }
    }
  }
  get GetRoleIdList() {
    return this.Wke;
  }
  GetRoleIdListWithTrial(t) {
    var i = [...this.GetRoleIdList];
    if (t) {
      return i;
    } else {
      return i.filter(t => !RoleUtils_1.RoleUtils.IsTrialRole(t));
    }
  }
  SetCurrentRole(t) {
    for (const i of this.pXe.values()) {
      if (i.ConfigId === t) {
        this.n5t = i.Position;
      }
    }
  }
  GetRoleDataMap() {
    return this.pXe;
  }
  GetRoleDataMapWithTrial(t) {
    if (t) {
      return this.GetRoleDataMap();
    }
    var i;
    var e;
    var s = new Map();
    for ([i, e] of this.GetRoleDataMap()) {
      if (!RoleUtils_1.RoleUtils.IsTrialRole(e.ConfigId)) {
        s.set(i, e);
      }
    }
    return s;
  }
  get GetCurrentRoleConfigId() {
    var t = this.n5t - 1;
    return this.Wke[t];
  }
  get GetCurrentRolePosition() {
    return this.n5t;
  }
}
exports.EditFormationData = EditFormationData;
//# sourceMappingURL=EditFormationData.js.map