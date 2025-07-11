"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinTrialConfig = undefined;
const RoleSkinTrialActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialActivityById");
const RoleSkinTrialInfoById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialInfoById");
const RoleSkinTrialInfoByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialInfoByRoleId");
const RoleSkinTrialUiConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialUiConfigById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class RoleSkinTrialConfig extends ConfigBase_1.ConfigBase {
  GetRoleSkinTrialInfoByRoleId(i) {
    return RoleSkinTrialInfoByRoleId_1.configRoleSkinTrialInfoByRoleId.GetConfig(i);
  }
  GetRoleSkinTrialInfoById(i) {
    return RoleSkinTrialInfoById_1.configRoleSkinTrialInfoById.GetConfig(i);
  }
  GetRoleSkinTrialActivityByActivityId(i) {
    return RoleSkinTrialActivityById_1.configRoleSkinTrialActivityById.GetConfig(i);
  }
  GetRoleSkinTrialUiConfigById(i) {
    return RoleSkinTrialUiConfigById_1.configRoleSkinTrialUiConfigById.GetConfig(i);
  }
}
exports.RoleSkinTrialConfig = RoleSkinTrialConfig;
//# sourceMappingURL=RoleSkinTrialConfig.js.map