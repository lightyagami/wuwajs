"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRoguePreviewRoleData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const RoleDataBase_1 = require("../RoleUi/RoleData/RoleDataBase");
class WeeklyRoguePreviewRoleData extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e);
  }
  IsTrialRole() {
    return true;
  }
  GetName(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(this.GetRoleConfig().Name);
  }
  GetRoleId() {
    return this.Id;
  }
  IsOnlineRole() {
    return false;
  }
  CanChangeName() {
    return false;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return false;
  }
}
exports.WeeklyRoguePreviewRoleData = WeeklyRoguePreviewRoleData;
//# sourceMappingURL=WeeklyRoguePreviewRoleData.js.map