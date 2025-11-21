"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevSkillViewItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevSkillData_1 = require("./ForecastRoleDevSkillData");
const NotObtainedRoleDevSkillData_1 = require("./NotObtainedRoleDevSkillData");
const ObtainedRoleDevSkillData_1 = require("./ObtainedRoleDevSkillData");
class RoleDevSkillViewItemDataFactory {
  static Create(e, a) {
    var l = RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e);
    let t = undefined;
    switch (l) {
      case 0:
        t = new ObtainedRoleDevSkillData_1.ObtainedRoleDevSkillData();
        break;
      case 1:
        t = new NotObtainedRoleDevSkillData_1.NotObtainedRoleDevSkillData();
        break;
      case 2:
        t = new ForecastRoleDevSkillData_1.ForecastRoleDevSkillData();
        break;
      default:
        t = new NotObtainedRoleDevSkillData_1.NotObtainedRoleDevSkillData();
    }
    t.InitByRoleId(e, l, a);
    return t;
  }
}
exports.RoleDevSkillViewItemDataFactory = RoleDevSkillViewItemDataFactory;
//# sourceMappingURL=RoleDevSkillViewItemDataFactory.js.map