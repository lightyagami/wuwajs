"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FlagAreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/FlagAreaByAreaId");
const MoraleAreaAll_1 = require("../../../Core/Define/ConfigQuery/MoraleAreaAll");
const MoraleFlagTypeByType_1 = require("../../../Core/Define/ConfigQuery/MoraleFlagTypeByType");
const MoraleLvPowerAll_1 = require("../../../Core/Define/ConfigQuery/MoraleLvPowerAll");
const MoraleRoleGrowthByLevel_1 = require("../../../Core/Define/ConfigQuery/MoraleRoleGrowthByLevel");
const OccupyScoreAll_1 = require("../../../Core/Define/ConfigQuery/OccupyScoreAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MoraleConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetAllScoreConfigList() {
    return OccupyScoreAll_1.configOccupyScoreAll.GetConfigList() ?? [];
  }
  GetFlagConfigListByAreaId(e) {
    return FlagAreaByAreaId_1.configFlagAreaByAreaId.GetConfigList(e) ?? [];
  }
  GetFlagTypeConfig(e) {
    return MoraleFlagTypeByType_1.configMoraleFlagTypeByType.GetConfig(e);
  }
  GetAllMoraleLvPowerConfigList() {
    return MoraleLvPowerAll_1.configMoraleLvPowerAll.GetConfigList() ?? [];
  }
  GetAllAreaConfigList() {
    return MoraleAreaAll_1.configMoraleAreaAll.GetConfigList() ?? [];
  }
  GetAllAttrAddIdList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("MoraleRoleAttrAddIdList") ?? [];
  }
  GetRoleAttrAddConfigByLv(e) {
    return MoraleRoleGrowthByLevel_1.configMoraleRoleGrowthByLevel.GetConfig(e);
  }
  GetScoreProgressRichValue() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MoraleScoreProgressRichValue") ?? 0;
  }
  GetMoraleGameOverQuestId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MoraleGameOver") ?? 0;
  }
  GetMoraleMarkIsAutoTrack() {
    return !!CommonParamById_1.configCommonParamById.GetBoolConfig("MoraleMarkIsAutoTrack");
  }
  GetMoraleBuffShowTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MoraleBuffShowTime") ?? 1;
  }
  GetMoraleSelectHighLevelFlag() {
    return !!CommonParamById_1.configCommonParamById.GetBoolConfig("MoraleSelectHighLevelFlag");
  }
  GetMoraleIsShowSmallFlagProgress() {
    return !!CommonParamById_1.configCommonParamById.GetBoolConfig("MoraleIsShowSmallFlagProgress");
  }
  GetMoraleHighFlagUnFinishIsShowExploreBoxProgress() {
    return !!CommonParamById_1.configCommonParamById.GetBoolConfig("MoraleHighFlagUnFinishIsShowExploreBoxProgress");
  }
}
exports.MoraleConfig = MoraleConfig;
//# sourceMappingURL=MoraleConfig.js.map