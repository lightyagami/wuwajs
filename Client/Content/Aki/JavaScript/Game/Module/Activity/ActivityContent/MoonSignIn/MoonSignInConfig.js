"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInConfig = undefined;
const MoonLabelById_1 = require("../../../../../Core/Define/ConfigQuery/MoonLabelById");
const MoonPhaseRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MoonPhaseRewardByActivityId");
const PhaseOfMoonAll_1 = require("../../../../../Core/Define/ConfigQuery/PhaseOfMoonAll");
const PhaseOfMoonById_1 = require("../../../../../Core/Define/ConfigQuery/PhaseOfMoonById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class MoonSignInConfig extends ConfigBase_1.ConfigBase {
  GetPhaseOfMoonList() {
    return PhaseOfMoonAll_1.configPhaseOfMoonAll.GetConfigList();
  }
  GetMoonSignReward(e) {
    return MoonPhaseRewardByActivityId_1.configMoonPhaseRewardByActivityId.GetConfig(e);
  }
  GetPhaseOfMoonById(e) {
    return PhaseOfMoonById_1.configPhaseOfMoonById.GetConfig(e);
  }
  GetMoonLabelById(e) {
    return MoonLabelById_1.configMoonLabelById.GetConfig(e);
  }
}
exports.MoonSignInConfig = MoonSignInConfig;
//# sourceMappingURL=MoonSignInConfig.js.map