"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueConfig = undefined;
const RogueResEffectById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectById");
const RogueResEffectTagById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectTagById");
const RogueResEventBgById_1 = require("../../../Core/Define/ConfigQuery/RogueResEventBgById");
const RogueResEventBgmById_1 = require("../../../Core/Define/ConfigQuery/RogueResEventBgmById");
const RogueResEventCueByType_1 = require("../../../Core/Define/ConfigQuery/RogueResEventCueByType");
const RogueResEventPlotByPlotId_1 = require("../../../Core/Define/ConfigQuery/RogueResEventPlotByPlotId");
const RogueResEventStepById_1 = require("../../../Core/Define/ConfigQuery/RogueResEventStepById");
const RogueResGlobalParamAll_1 = require("../../../Core/Define/ConfigQuery/RogueResGlobalParamAll");
const RogueResGridEventById_1 = require("../../../Core/Define/ConfigQuery/RogueResGridEventById");
const RogueResGridExploreByInstId_1 = require("../../../Core/Define/ConfigQuery/RogueResGridExploreByInstId");
const RogueResGridMapTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueResGridMapTypeById");
const RogueResInstGridById_1 = require("../../../Core/Define/ConfigQuery/RogueResInstGridById");
const RogueResMoodRuleById_1 = require("../../../Core/Define/ConfigQuery/RogueResMoodRuleById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MapRogueConfig extends ConfigBase_1.ConfigBase {
  GetGridMapTypeConfigById(e) {
    return RogueResGridMapTypeById_1.configRogueResGridMapTypeById.GetConfig(e);
  }
  GetGridEventConfigById(e) {
    return RogueResGridEventById_1.configRogueResGridEventById.GetConfig(e);
  }
  GetInsGridConfigByInstId(e) {
    return RogueResInstGridById_1.configRogueResInstGridById.GetConfig(e);
  }
  GetRogueResEventCueByType(e) {
    return RogueResEventCueByType_1.configRogueResEventCueByType.GetConfig(e);
  }
  GetRogueEffectById(e) {
    return RogueResEffectById_1.configRogueResEffectById.GetConfig(e);
  }
  GetRogueEffectTagById(e) {
    return RogueResEffectTagById_1.configRogueResEffectTagById.GetConfig(e);
  }
  GetRogueEventStepById(e) {
    return RogueResEventStepById_1.configRogueResEventStepById.GetConfig(e);
  }
  GetRogueEventPlotById(e) {
    return RogueResEventPlotByPlotId_1.configRogueResEventPlotByPlotId.GetConfig(e);
  }
  GetMoodRuleById(e) {
    return RogueResMoodRuleById_1.configRogueResMoodRuleById.GetConfig(e);
  }
  GetEventBgById(e) {
    return RogueResEventBgById_1.configRogueResEventBgById.GetConfig(e);
  }
  GetEventBgmById(e) {
    return RogueResEventBgmById_1.configRogueResEventBgmById.GetConfig(e);
  }
  GetExploreByInstId(e) {
    return RogueResGridExploreByInstId_1.configRogueResGridExploreByInstId.GetConfig(e);
  }
  GetGlobalParamConfig() {
    var e = RogueResGlobalParamAll_1.configRogueResGlobalParamAll.GetConfigList();
    if (e && e.length > 0) {
      return e[0];
    }
  }
}
exports.MapRogueConfig = MapRogueConfig;
//# sourceMappingURL=MapRogueConfig.js.map