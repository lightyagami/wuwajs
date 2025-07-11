"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceDungeonEntranceViewGetterDataMap = exports.instanceDetectItemGetterDataMap = undefined;
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const ActivitySolarSpeedController_1 = require("../../Activity/ActivityContent/SolarisSpeed/Controller/ActivitySolarSpeedController");
exports.instanceDetectItemGetterDataMap = {
  [4]: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
  10: undefined,
  11: undefined,
  15: undefined,
  19: undefined,
  20: undefined,
  12: undefined,
  21: undefined,
  22: {
    SubtitleTextIdGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceSubtitleArgsByInstanceId,
    CheckFinishedGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.CheckInstanceFinishedByInstanceId
  },
  23: undefined,
  24: undefined,
  25: undefined,
  26: undefined,
  27: undefined,
  28: {
    SubtitleTextIdGetter: ActivitySolarSpeedController_1.ActivitySolarSpeedController.GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter: ActivitySolarSpeedController_1.ActivitySolarSpeedController.GetInstanceSubtitleArgsByInstanceId
  },
  29: undefined,
  30: undefined,
  32: undefined,
  33: undefined,
  31: undefined,
  35: undefined,
  34: undefined,
  36: undefined
};
exports.instanceDungeonEntranceViewGetterDataMap = {
  [1]: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
  10: undefined,
  11: undefined,
  12: {
    DefaultSelectDataGetter: ActivityMowingRiskController_1.ActivityMowingRiskController.GetEntranceViewDefaultSelectData
  },
  13: undefined,
  14: undefined
}; //# sourceMappingURL=InstanceDungeonMapDefine.js.map