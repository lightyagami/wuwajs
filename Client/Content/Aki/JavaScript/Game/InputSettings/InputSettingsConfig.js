"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSettingsConfig = undefined;
const ActionMappingAll_1 = require("../../Core/Define/ConfigQuery/ActionMappingAll");
const ActionMappingByActionName_1 = require("../../Core/Define/ConfigQuery/ActionMappingByActionName");
const ActionMappingByActionType_1 = require("../../Core/Define/ConfigQuery/ActionMappingByActionType");
const AxisMappingAll_1 = require("../../Core/Define/ConfigQuery/AxisMappingAll");
const AxisMappingByAxisName_1 = require("../../Core/Define/ConfigQuery/AxisMappingByAxisName");
const AxisMappingByAxisType_1 = require("../../Core/Define/ConfigQuery/AxisMappingByAxisType");
const CombinationActionAll_1 = require("../../Core/Define/ConfigQuery/CombinationActionAll");
const CombinationActionByActionName_1 = require("../../Core/Define/ConfigQuery/CombinationActionByActionName");
const CombinationActionByActionType_1 = require("../../Core/Define/ConfigQuery/CombinationActionByActionType");
const CombinationAxisAll_1 = require("../../Core/Define/ConfigQuery/CombinationAxisAll");
const CombinationAxisByAxisName_1 = require("../../Core/Define/ConfigQuery/CombinationAxisByAxisName");
const GamepadKeyById_1 = require("../../Core/Define/ConfigQuery/GamepadKeyById");
const GamepadKeyByKeyName_1 = require("../../Core/Define/ConfigQuery/GamepadKeyByKeyName");
const PcKeyAll_1 = require("../../Core/Define/ConfigQuery/PcKeyAll");
const PcKeyById_1 = require("../../Core/Define/ConfigQuery/PcKeyById");
const PcKeyByKeyName_1 = require("../../Core/Define/ConfigQuery/PcKeyByKeyName");
const PlatformIconById_1 = require("../../Core/Define/ConfigQuery/PlatformIconById");
const ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class InputSettingsConfig extends ConfigBase_1.ConfigBase {
  GetAllActionMappingConfig() {
    return ActionMappingAll_1.configActionMappingAll.GetConfigList();
  }
  GetActionMappingConfigByActionType(e) {
    return ActionMappingByActionType_1.configActionMappingByActionType.GetConfigList(e);
  }
  GetActionMappingConfigByActionName(e) {
    return ActionMappingByActionName_1.configActionMappingByActionName.GetConfig(e);
  }
  GetAllAxisMappingConfig() {
    return AxisMappingAll_1.configAxisMappingAll.GetConfigList();
  }
  GetAxisMappingConfigByActionType(e) {
    return AxisMappingByAxisType_1.configAxisMappingByAxisType.GetConfigList(e);
  }
  GetAxisMappingConfigByAxisName(e) {
    return AxisMappingByAxisName_1.configAxisMappingByAxisName.GetConfig(e);
  }
  GetAllCombinationActionConfig() {
    return CombinationActionAll_1.configCombinationActionAll.GetConfigList();
  }
  GetCombinationActionConfigByActionName(e) {
    return CombinationActionByActionName_1.configCombinationActionByActionName.GetConfig(e);
  }
  GetCombinationActionConfigByActionNameInList(e) {
    var i = this.GetAllCombinationActionConfig();
    if (i) {
      for (const n of i) {
        if (n.ActionName === e) {
          return n;
        }
      }
    }
  }
  GetCombinationActionConfigByActionType(e) {
    return CombinationActionByActionType_1.configCombinationActionByActionType.GetConfigList(e);
  }
  GetAllCombinationAxisConfig() {
    return CombinationAxisAll_1.configCombinationAxisAll.GetConfigList();
  }
  GetCombinationAxisConfigByAxisName(e) {
    return CombinationAxisByAxisName_1.configCombinationAxisByAxisName.GetConfig(e);
  }
  GetPcKeyConfig(e) {
    return PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(e);
  }
  GetPcKeyConfigList() {
    return PcKeyAll_1.configPcKeyAll.GetConfigList();
  }
  GetPcKeyConfigById(e) {
    return PcKeyById_1.configPcKeyById.GetConfig(e);
  }
  GetGamepadKeyConfig(e) {
    return GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(e);
  }
  GetGamepadKeyConfigById(e) {
    return GamepadKeyById_1.configGamepadKeyById.GetConfig(e);
  }
  GetPlatformIconConfig(e) {
    return PlatformIconById_1.configPlatformIconById.GetConfig(e);
  }
}
exports.InputSettingsConfig = InputSettingsConfig;
//# sourceMappingURL=InputSettingsConfig.js.map