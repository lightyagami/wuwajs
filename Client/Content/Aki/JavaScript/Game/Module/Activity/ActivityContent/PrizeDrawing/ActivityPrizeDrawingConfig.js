"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPrizeDrawingConfig = undefined;
const KujiActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/KujiActivityByActivityId");
const KujiAwardsGroupById_1 = require("../../../../../Core/Define/ConfigQuery/KujiAwardsGroupById");
const KujiAwardsGroupByKujiId_1 = require("../../../../../Core/Define/ConfigQuery/KujiAwardsGroupByKujiId");
const KujiQuestById_1 = require("../../../../../Core/Define/ConfigQuery/KujiQuestById");
const KujiQuestByKujiId_1 = require("../../../../../Core/Define/ConfigQuery/KujiQuestByKujiId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityPrizeDrawingConfig extends ConfigBase_1.ConfigBase {
  GetKujiActivityByActivityId(i) {
    return KujiActivityByActivityId_1.configKujiActivityByActivityId.GetConfig(i);
  }
  GetKujiAwardsGroupById(i) {
    return KujiAwardsGroupById_1.configKujiAwardsGroupById.GetConfig(i);
  }
  GetKujiAwardsGroupByKujiId(i) {
    return KujiAwardsGroupByKujiId_1.configKujiAwardsGroupByKujiId.GetConfigList(i);
  }
  GetKujiQuestConfigById(i) {
    return KujiQuestById_1.configKujiQuestById.GetConfig(i);
  }
  GetKujiQuestConfigByKujiId(i) {
    return KujiQuestByKujiId_1.configKujiQuestByKujiId.GetConfigList(i);
  }
}
exports.ActivityPrizeDrawingConfig = ActivityPrizeDrawingConfig;
//# sourceMappingURL=ActivityPrizeDrawingConfig.js.map