"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDisplayModelBase = undefined;
class RoleDisplayModelBase {
  constructor() {
    this.FFe = 0;
    this.FGi = "";
    this.bVi = -1;
    this.D0d = 0;
    this.jGi = 0;
    this.x0d = false;
    this.U0d = false;
    this.B0d = false;
    this.k0d = 3;
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.FGi;
  }
  get SkinId() {
    return this.bVi;
  }
  get ElementId() {
    return this.D0d;
  }
  get Level() {
    return this.jGi;
  }
  get IsInTeam() {
    return this.x0d;
  }
  get IsTrial() {
    return this.U0d;
  }
  get IsNew() {
    return this.B0d;
  }
  get TypeTag() {
    return this.k0d;
  }
  InitBase(t) {
    this.FFe = t.Id;
    this.FGi = t.Name;
    this.bVi = t.SkinId;
    this.D0d = t.ElementId;
    this.jGi = t.Level;
    this.x0d = t.IsInTeam;
    this.U0d = t.IsTrial;
    this.B0d = t.IsNew;
    this.k0d = t.TypeTag;
  }
}
exports.RoleDisplayModelBase = RoleDisplayModelBase;
//# sourceMappingURL=RoleDevDisplayModelBase.js.map