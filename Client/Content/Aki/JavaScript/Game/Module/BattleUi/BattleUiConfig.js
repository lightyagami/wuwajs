"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById");
const ElementInfoById_1 = require("../../../Core/Define/ConfigQuery/ElementInfoById");
const GamepadKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/GamepadKeyByKeyName");
const HeadIconEnergyBarAll_1 = require("../../../Core/Define/ConfigQuery/HeadIconEnergyBarAll");
const PcKeyByKeyName_1 = require("../../../Core/Define/ConfigQuery/PcKeyByKeyName");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class BattleUiConfig extends ConfigBase_1.ConfigBase {
  GetHardnessPercentList() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("HardnessPercentStage1");
    var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("HardnessPercentStage2");
    var a = CommonParamById_1.configCommonParamById.GetIntArrayConfig("HardnessPercentStage3");
    return [CommonParamById_1.configCommonParamById.GetIntArrayConfig("HardnessPercentStage4"), a, r, e];
  }
  GetElementConfig(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e);
  }
  GetBufferAnimationSpeed() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BossHPAttenuateBufferSpeed");
  }
  GetPcKeyConfig(e) {
    return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(e);
  }
  GetGamePadKeyConfig(e) {
    return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(e);
  }
  GetPropertyType(e) {
    return BasePropertyById_1.configBasePropertyById.GetConfig(e).ElementPropertyType;
  }
  GetThreadColor(e, r) {
    if (r === 0 || r === 2) {
      return ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3;
    }
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleListHighestLevel();
    var a = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel1;
    var n = ModelManager_1.ModelManager.BattleUiModel.ThreatLevel3;
    let o = undefined;
    r -= e;
    return o = a <= r ? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor3 : r < a && n <= r ? ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor2 : ModelManager_1.ModelManager.BattleUiModel.ThreatLevelColor1;
  }
  GetAllHeadIconEnergyBarConfig() {
    return HeadIconEnergyBarAll_1.configHeadIconEnergyBarAll.GetConfigList();
  }
}
exports.BattleUiConfig = BattleUiConfig;
//# sourceMappingURL=BattleUiConfig.js.map