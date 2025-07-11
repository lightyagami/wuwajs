"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRogueConfig = undefined;
const RogueActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RogueActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRogueConfig extends ConfigBase_1.ConfigBase {
  GetActivityUniversalConfig(e) {
    e = RogueActivityById_1.configRogueActivityById.GetConfig(e);
    if (e) {
      return e;
    }
  }
}
exports.ActivityRogueConfig = ActivityRogueConfig;
//# sourceMappingURL=ActivityRogueConfig.js.map