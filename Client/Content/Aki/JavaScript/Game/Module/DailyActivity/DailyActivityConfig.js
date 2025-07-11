"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActivityConfig = undefined;
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const LivenessAll_1 = require("../../../Core/Define/ConfigQuery/LivenessAll");
const LivenessTaskByTaskId_1 = require("../../../Core/Define/ConfigQuery/LivenessTaskByTaskId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DailyActivityConfig extends ConfigBase_1.ConfigBase {
  GetAllActivityGoalData() {
    return LivenessAll_1.configLivenessAll.GetConfigList();
  }
  GetActivityTaskConfigById(e) {
    return LivenessTaskByTaskId_1.configLivenessTaskByTaskId.GetConfig(e);
  }
  GetDropShowInfo(e) {
    return DropPackageById_1.configDropPackageById.GetConfig(e).DropPreview;
  }
}
exports.DailyActivityConfig = DailyActivityConfig;
//# sourceMappingURL=DailyActivityConfig.js.map