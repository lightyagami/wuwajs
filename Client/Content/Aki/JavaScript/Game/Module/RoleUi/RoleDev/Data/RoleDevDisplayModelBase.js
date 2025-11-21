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
    this.Zpd = 0;
    this.jGi = 0;
    this.evd = false;
    this.tvd = false;
    this.ivd = false;
    this.rvd = 3;
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
    return this.Zpd;
  }
  get Level() {
    return this.jGi;
  }
  get IsInTeam() {
    return this.evd;
  }
  get IsTrial() {
    return this.tvd;
  }
  get IsNew() {
    return this.ivd;
  }
  get TypeTag() {
    return this.rvd;
  }
  InitBase(t) {
    this.FFe = t.Id;
    this.FGi = t.Name;
    this.bVi = t.SkinId;
    this.Zpd = t.ElementId;
    this.jGi = t.Level;
    this.evd = t.IsInTeam;
    this.tvd = t.IsTrial;
    this.ivd = t.IsNew;
    this.rvd = t.TypeTag;
  }
}
exports.RoleDisplayModelBase = RoleDisplayModelBase;
//# sourceMappingURL=RoleDevDisplayModelBase.js.map