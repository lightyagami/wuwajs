"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingHandbookConfig = undefined;
const TrackMoonHandbookRewardAll_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonHandbookRewardAll");
const TrackMoonHandbookRewardById_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonHandbookRewardById");
const ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class MoonChasingHandbookConfig extends ConfigBase_1.ConfigBase {
  GetHandbookRewardById(o) {
    return TrackMoonHandbookRewardById_1.configTrackMoonHandbookRewardById.GetConfig(o);
  }
  GetHandbookRewardList() {
    return TrackMoonHandbookRewardAll_1.configTrackMoonHandbookRewardAll.GetConfigList() ?? [];
  }
}
exports.MoonChasingHandbookConfig = MoonChasingHandbookConfig;
//# sourceMappingURL=MoonChasingHandbookConfig.js.map