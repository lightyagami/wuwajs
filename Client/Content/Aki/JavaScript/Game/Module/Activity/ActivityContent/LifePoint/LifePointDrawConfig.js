"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawConfig = undefined;
const LifePointActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LifePointActivityByActivityId");
const LifePointChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/LifePointChallengeById");
const LifePointEntranceById_1 = require("../../../../../Core/Define/ConfigQuery/LifePointEntranceById");
const LifePointGroupByGroupId_1 = require("../../../../../Core/Define/ConfigQuery/LifePointGroupByGroupId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class LifePointDrawConfig extends ConfigBase_1.ConfigBase {
  GetLifePointEntranceById(e) {
    return LifePointEntranceById_1.configLifePointEntranceById.GetConfig(e);
  }
  GetLifePointGroupByGroupId(e) {
    return LifePointGroupByGroupId_1.configLifePointGroupByGroupId.GetConfig(e);
  }
  GetLifePointChallengeById(e) {
    return LifePointChallengeById_1.configLifePointChallengeById.GetConfig(e);
  }
  GetLifePointDrawActivityById(e) {
    return LifePointActivityByActivityId_1.configLifePointActivityByActivityId.GetConfig(e);
  }
}
exports.LifePointDrawConfig = LifePointDrawConfig;
//# sourceMappingURL=LifePointDrawConfig.js.map