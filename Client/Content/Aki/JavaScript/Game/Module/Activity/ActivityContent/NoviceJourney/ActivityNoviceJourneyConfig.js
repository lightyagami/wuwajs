"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNoviceJourneyConfig = undefined;
const NewbieCourseAll_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCourseAll");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityNoviceJourneyConfig extends ConfigBase_1.ConfigBase {
  GetNoticeJourneyConfigList() {
    return NewbieCourseAll_1.configNewbieCourseAll.GetConfigList();
  }
  GetRewardList(e) {
    var r = [];
    for (const i of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e).DropPreview) {
      var o = {
        ItemId: i[0],
        Count: i[1]
      };
      r.push(o);
    }
    return r;
  }
}
exports.ActivityNoviceJourneyConfig = ActivityNoviceJourneyConfig;
//# sourceMappingURL=ActivityNoviceJourneyConfig.js.map