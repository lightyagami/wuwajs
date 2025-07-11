"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationData = undefined;
class EditFormationRoleData {
  constructor(t, i, s, e, o) {
    this.Position = 0;
    this.ConfigId = 0;
    this.RoleSkinId = 0;
    this.PlayerId = 0;
    this.Level = 0;
    this.Position = t;
    this.ConfigId = i;
    this.RoleSkinId = s;
    this.PlayerId = o;
    this.Level = e;
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
  AddRoleData(t, i, s, e, o = false) {
    var r = this.Wke.length + 1;
    this.Wke.push(t);
    var t = new EditFormationRoleData(r, t, i, s, e);
    this.pXe.set(r, t);
    if (o) {
      this.n5t = r;
    }
  }
  GetRoleDataByPosition(t) {
    return this.pXe.get(t);
  }
  get GetRoleIdList() {
    return this.Wke;
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