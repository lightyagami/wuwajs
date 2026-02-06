"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpConfig = undefined;
const TotalTopUpRewardAll_1 = require("../../../../../Core/Define/ConfigQuery/TotalTopUpRewardAll");
const TotalTopUpRewardById_1 = require("../../../../../Core/Define/ConfigQuery/TotalTopUpRewardById");
const TotalTopUpRoleViewConfigByItemId_1 = require("../../../../../Core/Define/ConfigQuery/TotalTopUpRoleViewConfigByItemId");
const TotalTopUpViewConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TotalTopUpViewConfigByActivityId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class TotalTopUpConfig extends ConfigBase_1.ConfigBase {
  GetRewardConfigById(e) {
    return TotalTopUpRewardById_1.configTotalTopUpRewardById.GetConfig(e);
  }
  GetAllRewardConfigs() {
    return TotalTopUpRewardAll_1.configTotalTopUpRewardAll.GetConfigList();
  }
  GetTotalUpScoreIcon(e) {
    e = TotalTopUpViewConfigByActivityId_1.configTotalTopUpViewConfigByActivityId.GetConfig(e);
    if (e !== undefined) {
      return e.ScoreIcon;
    }
  }
  GetRoleViewConfigByRoleIdOrItemId(e) {
    return TotalTopUpRoleViewConfigByItemId_1.configTotalTopUpRoleViewConfigByItemId.GetConfig(e);
  }
  GetViewConfigByActivityId(e) {
    return TotalTopUpViewConfigByActivityId_1.configTotalTopUpViewConfigByActivityId.GetConfig(e);
  }
}
exports.TotalTopUpConfig = TotalTopUpConfig;
//# sourceMappingURL=TotalTopUpConfig.js.map