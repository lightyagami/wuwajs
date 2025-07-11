"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleModuleDataBase = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class RoleModuleDataBase {
  constructor(e) {
    this.RoleId = e;
  }
  GetRoleConfig() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId);
  }
}
exports.RoleModuleDataBase = RoleModuleDataBase;
//# sourceMappingURL=RoleModuleDataBase.js.map