"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityConfig = undefined;
const ActivityById_1 = require("../../../Core/Define/ConfigQuery/ActivityById");
const ActivityFilterAll_1 = require("../../../Core/Define/ConfigQuery/ActivityFilterAll");
const ActivityFilterById_1 = require("../../../Core/Define/ConfigQuery/ActivityFilterById");
const ActivityPermanentFilterAll_1 = require("../../../Core/Define/ConfigQuery/ActivityPermanentFilterAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ActivityConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(e) {
    return ActivityById_1.configActivityById.GetConfig(e);
  }
  GetActivityFilter(e) {
    return ActivityFilterById_1.configActivityFilterById.GetConfig(e);
  }
  GetAllActivityFilter() {
    return ActivityFilterAll_1.configActivityFilterAll.GetConfigList();
  }
  GetAllActivityPermanentFilter() {
    return ActivityPermanentFilterAll_1.configActivityPermanentFilterAll.GetConfigList();
  }
}
exports.ActivityConfig = ActivityConfig;
//# sourceMappingURL=ActivityConfig.js.map