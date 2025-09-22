"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceDungeonEntranceViewGetterDataMap = exports.instanceDetectItemGetterDataMap = undefined;
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const ActivitySolarSpeedController_1 = require("../../Activity/ActivityContent/SolarisSpeed/Controller/ActivitySolarSpeedController");
exports.instanceDetectItemGetterDataMap = {
  [22]: {
    SubtitleTextIdGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceSubtitleArgsByInstanceId,
    CheckFinishedGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.CheckInstanceFinishedByInstanceId
  },
  28: {
    SubtitleTextIdGetter: ActivitySolarSpeedController_1.ActivitySolarSpeedController.GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter: ActivitySolarSpeedController_1.ActivitySolarSpeedController.GetInstanceSubtitleArgsByInstanceId
  }
};
exports.instanceDungeonEntranceViewGetterDataMap = {
  [12]: {
    DefaultSelectDataGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetEntranceViewDefaultSelectData
  }
}; //# sourceMappingURL=InstanceDungeonMapDefine.js.map