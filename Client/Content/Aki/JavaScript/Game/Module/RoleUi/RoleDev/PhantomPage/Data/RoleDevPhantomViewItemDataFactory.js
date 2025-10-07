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
  static Create(e) {
    var a = RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e);
    let t = undefined;
    switch (a) {
      case 0:
        t = new ObtainedRoleDevPhantomData_1.ObtainedRoleDevPhantomData();
        break;
      case 1:
        t = new NotObtainedRoleDevPhantomData_1.NotObtainedRoleDevPhantomData();
        break;
      case 2:
        t = new ForecastRoleDevPhantomData_1.ForecastRoleDevPhantomData();
        break;
      default:
        t = new NotObtainedRoleDevPhantomData_1.NotObtainedRoleDevPhantomData();
    }
    t.InitByRoleId(e, a);
    return t;
  }
}
exports.RoleDevPhantomViewItemDataFactory = RoleDevPhantomViewItemDataFactory;
//# sourceMappingURL=RoleDevPhantomViewItemDataFactory.js.map