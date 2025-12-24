"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityConfig = undefined;
const ActivityById_1 = require("../../../Core/Define/ConfigQuery/ActivityById");
const ActivityFilterAll_1 = require("../../../Core/Define/ConfigQuery/ActivityFilterAll");
const ActivityFilterById_1 = require("../../../Core/Define/ConfigQuery/ActivityFilterById");
const ActivityPermanentFilterAll_1 = require("../../../Core/Define/ConfigQuery/ActivityPermanentFilterAll");
const ActivityTimeShowById_1 = require("../../../Core/Define/ConfigQuery/ActivityTimeShowById");
const ActivityTitleTagsById_1 = require("../../../Core/Define/ConfigQuery/ActivityTitleTagsById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ActivityConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(i) {
    return ActivityById_1.configActivityById.GetConfig(i);
  }
  GetActivityFilter(i) {
    return ActivityFilterById_1.configActivityFilterById.GetConfig(i);
  }
  GetAllActivityFilter() {
    return ActivityFilterAll_1.configActivityFilterAll.GetConfigList();
  }
  GetAllActivityPermanentFilter() {
    return ActivityPermanentFilterAll_1.configActivityPermanentFilterAll.GetConfigList();
  }
  GetActivityTitleTags(i) {
    return ActivityTitleTagsById_1.configActivityTitleTagsById.GetConfig(i);
  }
  GetActivityTimeShow(i) {
    return ActivityTimeShowById_1.configActivityTimeShowById.GetConfig(i);
  }
}
exports.ActivityConfig = ActivityConfig;
//# sourceMappingURL=ActivityConfig.js.map