"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomViewItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevPhantomData_1 = require("./ForecastRoleDevPhantomData");
const NotObtainedRoleDevPhantomData_1 = require("./NotObtainedRoleDevPhantomData");
const ObtainedRoleDevPhantomData_1 = require("./ObtainedRoleDevPhantomData");
class RoleDevPhantomViewItemDataFactory {
  static Create(e, a) {
    var t = RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e);
    let o = undefined;
    switch (t) {
      case 0:
        o = new ObtainedRoleDevPhantomData_1.ObtainedRoleDevPhantomData();
        break;
      case 1:
        o = new NotObtainedRoleDevPhantomData_1.NotObtainedRoleDevPhantomData();
        break;
      case 2:
        o = new ForecastRoleDevPhantomData_1.ForecastRoleDevPhantomData();
        break;
      default:
        o = new NotObtainedRoleDevPhantomData_1.NotObtainedRoleDevPhantomData();
    }
    o.InitByRoleId(e, t, a);
    return o;
  }
}
exports.RoleDevPhantomViewItemDataFactory = RoleDevPhantomViewItemDataFactory;
//# sourceMappingURL=RoleDevPhantomViewItemDataFactory.js.map