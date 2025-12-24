"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoadBookConfig = undefined;
const MotorcycleChallengeAll_1 = require("../../../../../Core/Define/ConfigQuery/MotorcycleChallengeAll");
const MotorcycleChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/MotorcycleChallengeById");
const RoadBookAreaByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookAreaByActivityId");
const RoadBookAreaById_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookAreaById");
const RoadBookConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookConfigByActivityId");
const RoadBookLevelExpByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookLevelExpByActivityId");
const RoadBookLevelExpById_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookLevelExpById");
const RoadBookPhantomGainByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookPhantomGainByActivityId");
const RoadBookPhantomGainById_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookPhantomGainById");
const RoadBookTaskByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookTaskByActivityId");
const RoadBookTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/RoadBookTaskByTaskId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoadBookConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(o) {
    return RoadBookConfigByActivityId_1.configRoadBookConfigByActivityId.GetConfig(o);
  }
  GetLevelExpConfig(o) {
    return RoadBookLevelExpById_1.configRoadBookLevelExpById.GetConfig(o);
  }
  GetAllLevelExpConfig(o) {
    return RoadBookLevelExpByActivityId_1.configRoadBookLevelExpByActivityId.GetConfigList(o) ?? [];
  }
  GetRoadBookTaskConfig(o) {
    return RoadBookTaskByTaskId_1.configRoadBookTaskByTaskId.GetConfig(o);
  }
  GetAllRoadBookTaskConfig(o) {
    return RoadBookTaskByActivityId_1.configRoadBookTaskByActivityId.GetConfigList(o) ?? [];
  }
  GetAreaConfig(o) {
    return RoadBookAreaById_1.configRoadBookAreaById.GetConfig(o);
  }
  GetAllAreaConfig(o) {
    return RoadBookAreaByActivityId_1.configRoadBookAreaByActivityId.GetConfigList(o) ?? [];
  }
  GetPhantomConfig(o) {
    return RoadBookPhantomGainById_1.configRoadBookPhantomGainById.GetConfig(o);
  }
  GetAllPhantomConfig(o) {
    return RoadBookPhantomGainByActivityId_1.configRoadBookPhantomGainByActivityId.GetConfigList(o) ?? [];
  }
  GetAllMotorChallengeConfig() {
    return MotorcycleChallengeAll_1.configMotorcycleChallengeAll.GetConfigList() ?? [];
  }
  GetMotorChallengeConfig(o) {
    return MotorcycleChallengeById_1.configMotorcycleChallengeById.GetConfig(o);
  }
}
exports.ActivityRoadBookConfig = ActivityRoadBookConfig;
//# sourceMappingURL=ActivityRoadBookConfig.js.map