"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSpecialRobotData = undefined;
const RoleRobotData_1 = require("./RoleRobotData");
class RoleSpecialRobotData extends RoleRobotData_1.RoleRobotData {
  constructor() {
    super(...arguments);
    this.IsUnlockInternal = false;
    this.IsVisibleInFormationInternal = false;
    this.IsVisibleInRoleSystemInternal = false;
  }
  IsUnlock() {
    return this.IsUnlockInternal;
  }
  SetIsUnlock(t) {
    this.IsUnlockInternal = t;
  }
  CanEditInFormation() {
    return true;
  }
  IsVisibleInFormation() {
    return this.IsVisibleInFormationInternal;
  }
  SetIsVisibleInFormation(t) {
    this.IsVisibleInFormationInternal = t;
  }
  IsVisibleInRoleSystem() {
    return this.IsVisibleInRoleSystemInternal;
  }
  SetIsVisibleInRoleSystem(t) {
    this.IsVisibleInRoleSystemInternal = t;
  }
}
exports.RoleSpecialRobotData = RoleSpecialRobotData;
//# sourceMappingURL=RoleSpecialRobotData.js.map