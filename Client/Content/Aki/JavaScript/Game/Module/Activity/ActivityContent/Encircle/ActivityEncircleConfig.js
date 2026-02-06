"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityEncircleConfig = undefined;
const EncircleChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/EncircleChallengeById");
const EncircleChallengeGroupByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/EncircleChallengeGroupByActivityId");
const EncircleChallengeGroupById_1 = require("../../../../../Core/Define/ConfigQuery/EncircleChallengeGroupById");
const EncircleMapByMapId_1 = require("../../../../../Core/Define/ConfigQuery/EncircleMapByMapId");
const EncircleMapItemById_1 = require("../../../../../Core/Define/ConfigQuery/EncircleMapItemById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityEncircleConfig extends ConfigBase_1.ConfigBase {
  GetEncircleMap(e) {
    return EncircleMapByMapId_1.configEncircleMapByMapId.GetConfigList(e);
  }
  GetEncircleGroups(e) {
    return EncircleChallengeGroupByActivityId_1.configEncircleChallengeGroupByActivityId.GetConfigList(e);
  }
  GetEncircleGroup(e) {
    return EncircleChallengeGroupById_1.configEncircleChallengeGroupById.GetConfig(e);
  }
  GetEncircleChallenges(e, r) {
    e = this.GetEncircleGroups(e);
    if (e && e.length > 0) {
      return e[r - 1].Challenges;
    }
  }
  GetEncircleChallengeConfig(e) {
    return EncircleChallengeById_1.configEncircleChallengeById.GetConfig(e);
  }
  GetMapItemType(e) {
    return EncircleMapItemById_1.configEncircleMapItemById.GetConfig(e)?.Type;
  }
  GetMapItemMemo(e) {
    return EncircleMapItemById_1.configEncircleMapItemById.GetConfig(e)?.Memo;
  }
  GetMapItemResource(e) {
    return EncircleMapItemById_1.configEncircleMapItemById.GetConfig(e)?.ResourcePath;
  }
}
exports.ActivityEncircleConfig = ActivityEncircleConfig;
//# sourceMappingURL=ActivityEncircleConfig.js.map