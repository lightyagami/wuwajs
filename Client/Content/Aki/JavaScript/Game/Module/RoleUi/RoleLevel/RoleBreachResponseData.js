"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBreachResponseData = undefined;
class RoleBreachResponseData {
  UpdateRoleBreakThroughViewResponse(e) {
    this.Iuo = e;
  }
  GetLevelLimit() {
    return this.Iuo.GHn;
  }
  GetUnLockSkillId() {
    return this.Iuo.OHn;
  }
  GetFinalProp() {
    var e = new Map();
    for (const t of this.Iuo.NHn) {
      e.set(t.Z4n, t.e5n);
    }
    return e;
  }
  GetCostList() {
    return this.Iuo.kHn;
  }
  GetRewardList() {
    return this.Iuo.FHn;
  }
}
exports.RoleBreachResponseData = RoleBreachResponseData;
class RoleBreakThroughViewResponse {
  constructor() {
    this.GHn = 0;
    this.OHn = 0;
    this.NHn = undefined;
    this.kHn = undefined;
    this.FHn = undefined;
  }
}
//# sourceMappingURL=RoleBreachResponseData.js.map