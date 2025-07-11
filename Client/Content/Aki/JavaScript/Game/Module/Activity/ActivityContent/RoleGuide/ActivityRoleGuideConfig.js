"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGuideConfig = undefined;
const RoleGuideActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleGuideActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleGuideConfig extends ConfigBase_1.ConfigBase {
  GetRoleTrialActivityConfig(e) {
    return RoleGuideActivityById_1.configRoleGuideActivityById.GetConfig(e);
  }
}
exports.ActivityRoleGuideConfig = ActivityRoleGuideConfig;
//# sourceMappingURL=ActivityRoleGuideConfig.js.map