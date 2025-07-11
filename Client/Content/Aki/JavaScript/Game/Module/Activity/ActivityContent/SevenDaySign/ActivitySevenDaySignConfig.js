"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySevenDaySignConfig = undefined;
const ActivitySignById_1 = require("../../../../../Core/Define/ConfigQuery/ActivitySignById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivitySevenDaySignConfig extends ConfigBase_1.ConfigBase {
  GetActivitySignById(i) {
    return ActivitySignById_1.configActivitySignById.GetConfig(i);
  }
  GetActivityRewardByDay(i, e) {
    return ActivitySignById_1.configActivitySignById.GetConfig(i)?.SignRewards[e];
  }
}
exports.ActivitySevenDaySignConfig = ActivitySevenDaySignConfig;
//# sourceMappingURL=ActivitySevenDaySignConfig.js.map