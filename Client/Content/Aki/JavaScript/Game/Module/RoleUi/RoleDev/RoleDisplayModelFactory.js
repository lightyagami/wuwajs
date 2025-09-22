"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDisplayModelFactory = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const ForecastRoleDisplayModel_1 = require("./Data/ForecastRoleDisplayModel");
const RuntimeRoleDisplayModel_1 = require("./Data/RuntimeRoleDisplayModel");
const RoleDevUtils_1 = require("./RoleDevUtils");
class RoleDisplayModelFactory {
  static get Instance() {
    if (this.cj === undefined) {
      this.cj = new RoleDisplayModelFactory();
    }
    return this.cj;
  }
  BuildRoleDisplayModel(e, l = 0) {
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      const o = new ForecastRoleDisplayModel_1.ForecastRoleDisplayModel();
      o.InitByRoleId(e);
      return o;
    }
    const o = new RuntimeRoleDisplayModel_1.RuntimeRoleDisplayModel();
    var a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (a) {
      o.InitByRoleData(a);
    } else {
      o.InitByRoleId(e);
    }
    return o;
  }
}
(exports.RoleDisplayModelFactory = RoleDisplayModelFactory).cj = undefined;
//# sourceMappingURL=RoleDisplayModelFactory.js.map