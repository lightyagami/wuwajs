"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseConfig = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const KSCBasePropertyById_1 = require("../../../Core/Define/ConfigQuery/KSCBasePropertyById");
const SkillGameplayButtonByGameplayType_1 = require("../../../Core/Define/ConfigQuery/SkillGameplayButtonByGameplayType");
const TrapDefenseActivityByActivityId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseActivityByActivityId");
const TrapDefenseActivityByInstId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseActivityByInstId");
const TrapDefenseAttributeShowById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseAttributeShowById");
const TrapDefenseAuxiliaryById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseAuxiliaryById");
const TrapDefenseAuxiliaryTypeAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseAuxiliaryTypeAll");
const TrapDefenseAuxiliaryTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseAuxiliaryTypeById");
const TrapDefenseBaseConfigByActivityId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBaseConfigByActivityId");
const TrapDefenseBatchConfigById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBatchConfigById");
const TrapDefenseBdAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdAll");
const TrapDefenseBdBuffByGroup_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdBuffByGroup");
const TrapDefenseBdBuffById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdBuffById");
const TrapDefenseBdBuffByLevelAndGroup_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdBuffByLevelAndGroup");
const TrapDefenseBdById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdById");
const TrapDefenseBdGroupByBd_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdGroupByBd");
const TrapDefenseBdGroupById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBdGroupById");
const TrapDefenseBuildingById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingById");
const TrapDefenseBuildingTabTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingTabTypeById");
const TrapDefenseBuildingTypeAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingTypeAll");
const TrapDefenseBuildingTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingTypeById");
const TrapDefenseCsvConfigById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseCsvConfigById");
const TrapDefenseGainingById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseGainingById");
const TrapDefenseItemAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseItemAll");
const TrapDefenseItemByExploreToolId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseItemByExploreToolId");
const TrapDefenseItemById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseItemById");
const TrapDefenseMapAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMapAll");
const TrapDefenseMapByMapId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMapByMapId");
const TrapDefenseMonsterAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterAll");
const TrapDefenseMonsterBodyAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterBodyAll");
const TrapDefenseMonsterById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterById");
const TrapDefenseMonsterGroupConfigById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterGroupConfigById");
const TrapDefenseMonsterRiskAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterRiskAll");
const TrapDefenseMonsterTagAll_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterTagAll");
const TrapDefenseMonsterTagById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterTagById");
const TrapDefenseMonsterTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterTypeById");
const TrapDefenseRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseRewardByActivityId");
const TrapDefenseSpecialRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseSpecialRewardByActivityId");
const TrapDefenseTechByActivityId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseTechByActivityId");
const TrapDefenseTechById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseTechById");
const TrapDefenseWaveByLevelAndWave_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseWaveByLevelAndWave");
const TrapDefenseWaveByTrapDefenseLevelId_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseWaveByTrapDefenseLevelId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class TrapDefenseConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetLevelListByActivityId(e) {
    return TrapDefenseActivityByActivityId_1.configTrapDefenseActivityByActivityId.GetConfigList(e) ?? [];
  }
  GetLevelByInstId(e) {
    return TrapDefenseActivityByInstId_1.configTrapDefenseActivityByInstId.GetConfig(e);
  }
  GetBuildingById(e) {
    return TrapDefenseBuildingById_1.configTrapDefenseBuildingById.GetConfig(e);
  }
  GetAuxiliaryById(e) {
    return TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e);
  }
  GetAllBuildingTypeList() {
    return TrapDefenseBuildingTypeAll_1.configTrapDefenseBuildingTypeAll.GetConfigList() ?? [];
  }
  GetAllAuxiliaryTypeList() {
    return TrapDefenseAuxiliaryTypeAll_1.configTrapDefenseAuxiliaryTypeAll.GetConfigList() ?? [];
  }
  GetAuxiliaryTypeById(e) {
    return TrapDefenseAuxiliaryTypeById_1.configTrapDefenseAuxiliaryTypeById.GetConfig(e);
  }
  GetBuildingTypeById(e) {
    return TrapDefenseBuildingTypeById_1.configTrapDefenseBuildingTypeById.GetConfig(e);
  }
  GetScrollerMoveDistance() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseScrollerMoveDistance");
  }
  GetScrollerPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseScrollerLongPressTime");
  }
  GetBeforeScrollerLongPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseBeforeScrollerLongPressTime");
  }
  GetDragItemClickTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseDragClickTime") ?? 300;
  }
  GetScrollerOffsetX() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetX");
    } else {
      return 0;
    }
  }
  GetScrollerOffsetY() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetY");
    } else {
      return 0;
    }
  }
  GetScrollerOffsetXDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerOffsetXDir");
  }
  GetScrollerOffsetYDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerOffsetYDir");
  }
  GetDragCurve() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionDragCurve");
  }
  GetDragCurveTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionDragAnimationTime");
  }
  GetNextLevelCostThreshold() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseNextLevelCostThreshold") ?? 50;
  }
  GetGainingById(e) {
    return TrapDefenseGainingById_1.configTrapDefenseGainingById.GetConfig(e);
  }
  GetBdById(e) {
    return TrapDefenseBdById_1.configTrapDefenseBdById.GetConfig(e);
  }
  GetAllBdList() {
    return TrapDefenseBdAll_1.configTrapDefenseBdAll.GetConfigList() ?? [];
  }
  GetBdBuffById(e) {
    return TrapDefenseBdBuffById_1.configTrapDefenseBdBuffById.GetConfig(e);
  }
  GetBdBuffByLevelAndGroup(e, r) {
    return TrapDefenseBdBuffByLevelAndGroup_1.configTrapDefenseBdBuffByLevelAndGroup.GetConfig(e, r);
  }
  GetBdBuffListByGroupId(e) {
    return TrapDefenseBdBuffByGroup_1.configTrapDefenseBdBuffByGroup.GetConfigList(e) ?? [];
  }
  GetBdGroupById(e) {
    return TrapDefenseBdGroupById_1.configTrapDefenseBdGroupById.GetConfig(e);
  }
  GetBdGroupListByBdId(e) {
    return TrapDefenseBdGroupByBd_1.configTrapDefenseBdGroupByBd.GetConfigList(e) ?? [];
  }
  GetHelpIdBdSum() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseBdSumHelpId") ?? 0;
  }
  GetHelpIdMonster() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseMonsterHelpId") ?? 0;
  }
  GetHelpIdFixedReward() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseFixedRewardHelpId") ?? 0;
  }
  GetHelpIdTalentTree() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseTalentTreeHelpId") ?? 0;
  }
  GetHelpIdMainLevel() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseMainLevelHelpId") ?? 0;
  }
  GetHelpIdRougeLevel() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRougeLevelHelpId") ?? 0;
  }
  GetHelpIdLevelSaveProgress() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseLevelSaveProgressHelpId") ?? 0;
  }
  GetRewardListByActivityId(e) {
    return TrapDefenseRewardByActivityId_1.configTrapDefenseRewardByActivityId.GetConfigList(e);
  }
  GetSpecialRewardByActivityId(e) {
    return TrapDefenseSpecialRewardByActivityId_1.configTrapDefenseSpecialRewardByActivityId.GetConfigList(e);
  }
  GetHelpIdBdBuffSelect() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseBdBuffSelectHelpId") ?? 0;
  }
  GetBattleGoldToItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRefreshBattleGoldToItemId") ?? 1;
  }
  GetDevelopTabConfig(e) {
    return TrapDefenseBuildingTabTypeById_1.configTrapDefenseBuildingTabTypeById.GetConfig(e);
  }
  GetTalentTreeCurrencyItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseTalentTreeCurrencyItemId") ?? 1;
  }
  GetBaseProperty(e) {
    return KSCBasePropertyById_1.configKSCBasePropertyById.GetConfig(e);
  }
  GetAttrShow(e) {
    return TrapDefenseAttributeShowById_1.configTrapDefenseAttributeShowById.GetConfig(e);
  }
  GetTrapDefenseMapConfigById(e) {
    return TrapDefenseMapByMapId_1.configTrapDefenseMapByMapId.GetConfig(e);
  }
  GetTrapDefenseRoutePreviewInterval() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRoutePreviewInterval") ?? 0;
  }
  GetTrapDefenseRoutePointShootInterval() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRoutePointShootInterval") ?? 0;
  }
  GetTrapDefenseRoutePointNum() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRoutePointNum") ?? 1;
  }
  GetTrapDefenseRoutePreviewTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseRoutePreviewTime") ?? 0;
  }
  GetTrapDefensePurificationItemsConsume() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefensePurificationItemsConsume") ?? 0;
  }
  GetTrapDefenseWarningDistance() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseWarningDistance") ?? 0;
  }
  GetTrapDefenseWavesByLevelId(e) {
    return TrapDefenseWaveByTrapDefenseLevelId_1.configTrapDefenseWaveByTrapDefenseLevelId.GetConfigList(e);
  }
  GetTrapDefenseAllMap() {
    return TrapDefenseMapAll_1.configTrapDefenseMapAll.GetConfigList() ?? [];
  }
  GetWaveListByLevelId(e) {
    return TrapDefenseWaveByTrapDefenseLevelId_1.configTrapDefenseWaveByTrapDefenseLevelId.GetConfigList(e) ?? [];
  }
  GetWaveConfigByLevelIdAndWaveId(e, r) {
    return TrapDefenseWaveByLevelAndWave_1.configTrapDefenseWaveByLevelAndWave.GetConfig(e, r);
  }
  GetCsvMainConfigByMonsterWaveMainId(e) {
    e = TrapDefenseCsvConfigById_1.configTrapDefenseCsvConfigById.GetConfig(e)?.Batches;
    if (e) {
      return Json_1.Json.Parse(e) ?? [];
    } else {
      return [];
    }
  }
  GetCsvWaveConfigByWaveId(e) {
    return TrapDefenseBatchConfigById_1.configTrapDefenseBatchConfigById.GetConfig(e);
  }
  GetCsvMonsterGroupConfigByMonsterId(e) {
    e = TrapDefenseMonsterGroupConfigById_1.configTrapDefenseMonsterGroupConfigById.GetConfig(e)?.Monsters;
    if (e) {
      return Json_1.Json.Parse(e) ?? [];
    } else {
      return [];
    }
  }
  GetMonsterConfigById(e) {
    return TrapDefenseMonsterById_1.configTrapDefenseMonsterById.GetConfig(e);
  }
  GetAllMonsterConfigList() {
    return TrapDefenseMonsterAll_1.configTrapDefenseMonsterAll.GetConfigList() ?? [];
  }
  GetMonsterTypeConfigById(e) {
    return TrapDefenseMonsterTypeById_1.configTrapDefenseMonsterTypeById.GetConfig(e);
  }
  GetMonsterTagConfigById(e) {
    return TrapDefenseMonsterTagById_1.configTrapDefenseMonsterTagById.GetConfig(e);
  }
  GetAllMonsterTagList() {
    return TrapDefenseMonsterTagAll_1.configTrapDefenseMonsterTagAll.GetConfigList() ?? [];
  }
  GetAllMonsterRiskList() {
    return TrapDefenseMonsterRiskAll_1.configTrapDefenseMonsterRiskAll.GetConfigList() ?? [];
  }
  GetAllMonsterBodyList() {
    return TrapDefenseMonsterBodyAll_1.configTrapDefenseMonsterBodyAll.GetConfigList() ?? [];
  }
  GetTrapDefenseComboDuration() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseComboDuration") ?? 0;
  }
  GetTrapDefenseTalentTreeConfigByActivityId(e) {
    return TrapDefenseTechByActivityId_1.configTrapDefenseTechByActivityId.GetConfigList(e);
  }
  GetTrapDefenseTalentTreeNodeConfigById(e) {
    return TrapDefenseTechById_1.configTrapDefenseTechById.GetConfig(e);
  }
  GetTrapDefenseItemConfigById(e) {
    return TrapDefenseItemById_1.configTrapDefenseItemById.GetConfig(e);
  }
  GetTrapDefenseItemByExploreToolId(e) {
    return TrapDefenseItemByExploreToolId_1.configTrapDefenseItemByExploreToolId.GetConfig(e);
  }
  GetAllTrapDefenseItem() {
    return TrapDefenseItemAll_1.configTrapDefenseItemAll.GetConfigList() ?? [];
  }
  GetTrapDefenseSkillButtonConfigByType(e) {
    return SkillGameplayButtonByGameplayType_1.configSkillGameplayButtonByGameplayType.GetConfigList(e);
  }
  GetActivityConfig() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetActivityId();
    return TrapDefenseBaseConfigByActivityId_1.configTrapDefenseBaseConfigByActivityId.GetConfig(e);
  }
  GetTrapDefenseComboAdvancedPerformanceThreshold() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("TrapDefenseComboAdvancedPerformanceThreshold") ?? 0;
  }
}
exports.TrapDefenseConfig = TrapDefenseConfig;
//# sourceMappingURL=TrapDefenseConfig.js.map