"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialConfig = undefined;
const GuideTutorialById_1 = require("../../../Core/Define/ConfigQuery/GuideTutorialById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class TutorialConfig extends ConfigBase_1.ConfigBase {
  GetTutorial(e) {
    return GuideTutorialById_1.configGuideTutorialById.GetConfig(e);
  }
  HasUnlockReward(e) {
    return this.GetTutorial(e)?.DisableDropReward === false;
  }
}
exports.TutorialConfig = TutorialConfig;
//# sourceMappingURL=TutorialConfig.js.map