"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRewardConfig = undefined;
const GivebackScoreRewardAll_1 = require("../../../Core/Define/ConfigQuery/GivebackScoreRewardAll");
const GivebackScoreRewardById_1 = require("../../../Core/Define/ConfigQuery/GivebackScoreRewardById");
const GivebackTaskAll_1 = require("../../../Core/Define/ConfigQuery/GivebackTaskAll");
const GivebackTaskByTaskId_1 = require("../../../Core/Define/ConfigQuery/GivebackTaskByTaskId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FeedbackRewardConfig extends ConfigBase_1.ConfigBase {
  GetGivebackScoreRewardById(e) {
    return GivebackScoreRewardById_1.configGivebackScoreRewardById.GetConfig(e);
  }
  GetGivebackScoreRewardAll() {
    return GivebackScoreRewardAll_1.configGivebackScoreRewardAll.GetConfigList();
  }
  GetGivebackTaskById(e) {
    return GivebackTaskByTaskId_1.configGivebackTaskByTaskId.GetConfig(e);
  }
  GetGivebackTaskAll() {
    return GivebackTaskAll_1.configGivebackTaskAll.GetConfigList();
  }
}
exports.FeedbackRewardConfig = FeedbackRewardConfig;
//# sourceMappingURL=FeedbackRewardConfig.js.map