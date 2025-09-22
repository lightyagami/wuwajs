"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRoleViewItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevRoleData_1 = require("./ForecastRoleDevRoleData");
const NotObtainedRoleDevRoleData_1 = require("./NotObtainedRoleDevRoleData");
const ObtainedRoleDevRoleData_1 = require("./ObtainedRoleDevRoleData");
class RoleDevRoleViewItemDataFactory {
  static Create(e) {
    let t = undefined;
    switch (RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e)) {
      case 0:
        (t = new ObtainedRoleDevRoleData_1.ObtainedRoleDevRoleData()).InitByRoleId(e, 0);
        break;
      case 2:
        (t = new ForecastRoleDevRoleData_1.ForecastRoleDevRoleData()).InitByRoleId(e, 2);
        break;
      default:
        (t = new NotObtainedRoleDevRoleData_1.NotObtainedRoleDevRoleData()).InitByRoleId(e, 1);
    }
    return t;
  }
}
exports.RoleDevRoleViewItemDataFactory = RoleDevRoleViewItemDataFactory;
//# sourceMappingURL=RoleDevRoleViewItemDataFactory.js.map