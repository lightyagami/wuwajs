"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDisplayModel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevDisplayModelBase_1 = require("./RoleDevDisplayModelBase");
class ForecastRoleDisplayModel extends RoleDevDisplayModelBase_1.RoleDisplayModelBase {
  constructor() {
    super(...arguments);
    this.JGi = 0;
  }
  InitByRoleId(e) {
    this.JGi = e;
    var s = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e);
    var l = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
    this.InitBase({
      Id: e,
      Name: l.RoleName,
      SkinId: 0,
      ElementId: l.ElementId,
      Level: 1,
      IsInTeam: false,
      IsTrial: false,
      IsNew: false,
      TypeTag: s
    });
  }
  get RoleId() {
    return this.JGi;
  }
  get SourceType() {
    return 1;
  }
  get OriginRoleData() {}
}
exports.ForecastRoleDisplayModel = ForecastRoleDisplayModel;
//# sourceMappingURL=ForecastRoleDisplayModel.js.map