"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreProgressConfig = undefined;
const AreaTaskExploreByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaTaskExploreByAreaId");
const ExploreProgressAll_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressAll");
const ExploreProgressByArea_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressByArea");
const ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById");
const ExploreProgressRewardAll_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressRewardAll");
const ExploreProgressRewardByArea_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressRewardByArea");
const ExploreTypeByType_1 = require("../../../Core/Define/ConfigQuery/ExploreTypeByType");
const StateByStateId_1 = require("../../../Core/Define/ConfigQuery/StateByStateId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ExploreProgressConfig extends ConfigBase_1.ConfigBase {
  GetExploreProgressConfigById(e) {
    return ExploreProgressById_1.configExploreProgressById.GetConfig(e);
  }
  GetExploreProgressConfigListByArea(e) {
    return ExploreProgressByArea_1.configExploreProgressByArea.GetConfigList(e);
  }
  GetAllExploreProgressConfig() {
    return ExploreProgressAll_1.configExploreProgressAll.GetConfigList();
  }
  GetAreaMissionConfigByAreaId(e) {
    return AreaTaskExploreByAreaId_1.configAreaTaskExploreByAreaId.GetConfigList(e);
  }
  GetStateConfigByStateId(e) {
    return StateByStateId_1.configStateByStateId.GetConfig(e);
  }
  GetAreaStageAwardConfigByAreaId(e) {
    return ExploreProgressRewardByArea_1.configExploreProgressRewardByArea.GetConfigList(e);
  }
  GetAreaStageRewardConfigList() {
    return ExploreProgressRewardAll_1.configExploreProgressRewardAll.GetConfigList();
  }
  GetExploreTypeByType(e) {
    return ExploreTypeByType_1.configExploreTypeByType.GetConfig(e);
  }
}
exports.ExploreProgressConfig = ExploreProgressConfig;
//# sourceMappingURL=ExploreProgressConfig.js.map