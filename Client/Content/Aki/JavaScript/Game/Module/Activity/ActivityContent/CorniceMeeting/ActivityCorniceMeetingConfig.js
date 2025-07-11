"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingConfig = undefined;
const CorniceChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/CorniceChallengeById");
const CorniceChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/CorniceChallengeByMarkId");
const CorniceQuestById_1 = require("../../../../../Core/Define/ConfigQuery/CorniceQuestById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityCorniceMeetingConfig extends ConfigBase_1.ConfigBase {
  GetCorniceMeetingChallengeConfig(e) {
    return CorniceChallengeById_1.configCorniceChallengeById.GetConfig(e);
  }
  GetCorniceMeetingQuest(e) {
    return CorniceQuestById_1.configCorniceQuestById.GetConfig(e);
  }
  GetCorniceMeetingChallengeByMarkId(e) {
    return CorniceChallengeByMarkId_1.configCorniceChallengeByMarkId.GetConfig(e);
  }
}
exports.ActivityCorniceMeetingConfig = ActivityCorniceMeetingConfig;
//# sourceMappingURL=ActivityCorniceMeetingConfig.js.map