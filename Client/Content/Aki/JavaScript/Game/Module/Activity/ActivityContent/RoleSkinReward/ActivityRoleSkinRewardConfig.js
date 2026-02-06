"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleSkinRewardConfig = undefined;
const SkinRewardActivityRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SkinRewardActivityRewardByActivityId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleSkinRewardConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(e) {
    return SkinRewardActivityRewardByActivityId_1.configSkinRewardActivityRewardByActivityId.GetConfig(e);
  }
}
exports.ActivityRoleSkinRewardConfig = ActivityRoleSkinRewardConfig;
//# sourceMappingURL=ActivityRoleSkinRewardConfig.js.map