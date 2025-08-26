"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossConfig = undefined;
const LineCrossActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LineCrossActivityByActivityId");
const LineCrossChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/LineCrossChallengeById");
const LineCrossEntranceById_1 = require("../../../../../Core/Define/ConfigQuery/LineCrossEntranceById");
const LineCrossGroupByGroupId_1 = require("../../../../../Core/Define/ConfigQuery/LineCrossGroupByGroupId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class LineCrossConfig extends ConfigBase_1.ConfigBase {
  GetLineCrossEntranceById(e) {
    return LineCrossEntranceById_1.configLineCrossEntranceById.GetConfig(e);
  }
  GetLineCrossGroupByGroupId(e) {
    return LineCrossGroupByGroupId_1.configLineCrossGroupByGroupId.GetConfig(e);
  }
  GetLineCrossChallengeById(e) {
    return LineCrossChallengeById_1.configLineCrossChallengeById.GetConfig(e);
  }
  GetLineCrossActivityById(e) {
    return LineCrossActivityByActivityId_1.configLineCrossActivityByActivityId.GetConfig(e);
  }
}
exports.LineCrossConfig = LineCrossConfig;
//# sourceMappingURL=LineCrossConfig.js.map