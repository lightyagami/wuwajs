"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayConfig = undefined;
const FunPlayActivityChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/FunPlayActivityChallengeById");
const FunPlaySharpCommentById_1 = require("../../../../../Core/Define/ConfigQuery/FunPlaySharpCommentById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityFunPlayConfig extends ConfigBase_1.ConfigBase {
  GetFunPlayActivityChallenge(e) {
    return FunPlayActivityChallengeById_1.configFunPlayActivityChallengeById.GetConfig(e);
  }
  GetFunPlaySharpComment(e) {
    return FunPlaySharpCommentById_1.configFunPlaySharpCommentById.GetConfig(e);
  }
}
exports.ActivityFunPlayConfig = ActivityFunPlayConfig;
//# sourceMappingURL=ActivityFunPlayConfig.js.map