"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingRewardConfig = undefined;
const TrackMoonTargetById_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonTargetById");
const TrackMoonTargetTypeAll_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonTargetTypeAll");
const ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class MoonChasingRewardConfig extends ConfigBase_1.ConfigBase {
  GetAllRewardTargetTypeList() {
    return TrackMoonTargetTypeAll_1.configTrackMoonTargetTypeAll.GetConfigList();
  }
  GetRewardTargetById(e) {
    return TrackMoonTargetById_1.configTrackMoonTargetById.GetConfig(e);
  }
}
exports.MoonChasingRewardConfig = MoonChasingRewardConfig;
//# sourceMappingURL=MoonChasingRewardConfigRewardConfig.js.map