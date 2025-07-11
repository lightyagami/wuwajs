"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleOnlineInstanceData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const RoleDataBase_1 = require("./RoleDataBase");
class RoleOnlineInstanceData extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e);
    this.WeaponTrialData = undefined;
    this.SetDefaultData();
  }
  SetDefaultData() {
    var e = this.GetRoleConfig();
    this.WeaponTrialData = new WeaponTrialData_1.WeaponTrialData();
    this.WeaponTrialData.SetTrialId(e.WeaponType);
  }
  IsTrialRole() {
    return false;
  }
  GetRoleId() {
    return this.Id;
  }
  GetName(e) {
    var a = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(a.Name);
  }
  CanChangeName() {
    return false;
  }
  GetShowAttributeValueById(e) {
    return 0;
  }
  IsOnlineRole() {
    return true;
  }
  GetWeaponData() {
    return this.WeaponTrialData;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return false;
  }
}
exports.RoleOnlineInstanceData = RoleOnlineInstanceData;
//# sourceMappingURL=RoleOnlineInstanceData.js.map