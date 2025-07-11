"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleTrialConfig = undefined;
const RoleTrialActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialActivityById");
const RoleTrialInfoById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialInfoById");
const RoleTrialRoleConfigByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialRoleConfigByRoleId");
const RoleTrialUiConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialUiConfigById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleTrialConfig extends ConfigBase_1.ConfigBase {
  GetRoleTrialActivityConfig(e) {
    return RoleTrialActivityById_1.configRoleTrialActivityById.GetConfig(e);
  }
  GetRoleTrialInfoConfigByRoleId(e) {
    return RoleTrialInfoById_1.configRoleTrialInfoById.GetConfig(e);
  }
  GetRoleTrialRoleConfigByRoleId(e) {
    return RoleTrialRoleConfigByRoleId_1.configRoleTrialRoleConfigByRoleId.GetConfig(e);
  }
  GetRoleTrialUiConfigById(e) {
    return RoleTrialUiConfigById_1.configRoleTrialUiConfigById.GetConfig(e);
  }
}
exports.ActivityRoleTrialConfig = ActivityRoleTrialConfig;
//# sourceMappingURL=ActivityRoleTrialConfig.js.map