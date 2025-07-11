"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillResponseData = undefined;
class RoleSkillResponseData {
  constructor() {
    this.Pmo = undefined;
    this.xmo = undefined;
    this.wmo = 0;
  }
  UpdateRoleSkillViewResponse(e, t, s) {
    this.Pmo = e;
    this.xmo = t;
    this.wmo = s;
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillEffect() {
    return this.Pmo;
  }
  GetNextLevelSkillEffect() {
    return this.xmo;
  }
}
exports.RoleSkillResponseData = RoleSkillResponseData;
//# sourceMappingURL=RoleSkillResponseData.js.map