"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMapExploreConfig = undefined;
const ExploreActivityById_1 = require("../../../../../Core/Define/ConfigQuery/ExploreActivityById");
const ExploreActivityTaskByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/ExploreActivityTaskByActivityId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityMapExploreConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetExploreTaskList(e) {
    return ExploreActivityTaskByActivityId_1.configExploreActivityTaskByActivityId.GetConfigList(e) ?? [];
  }
  GetActivityInfo(e) {
    return ExploreActivityById_1.configExploreActivityById.GetConfig(e);
  }
}
exports.ActivityMapExploreConfig = ActivityMapExploreConfig;
//# sourceMappingURL=ActivityMapExploreConfig.js.map