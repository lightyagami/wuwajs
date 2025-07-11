"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonConfig = undefined;
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId");
const SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById");
const SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById");
const SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll");
const SkillFollowerButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillFollowerButtonByPbDataId");
const SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag");
const SkillPriorityButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillPriorityButtonAll");
const SkillVehicleButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillVehicleButtonByPbDataId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
  GetAllSkillButtonConfig(l) {
    return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(l);
  }
  GetAllSkillCommonButtonConfig() {
    return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
  }
  GetAllSkillFollowerButtonConfig(l) {
    return SkillFollowerButtonByPbDataId_1.configSkillFollowerButtonByPbDataId.GetConfigList(l);
  }
  GetAllSkillVehicleButtonConfig(l) {
    return SkillVehicleButtonByPbDataId_1.configSkillVehicleButtonByPbDataId.GetConfigList(l);
  }
  GetAllSkillPriorityButtonConfig() {
    return SkillPriorityButtonAll_1.configSkillPriorityButtonAll.GetConfigList();
  }
  GetSkillIndexConfig(l) {
    return SkillButtonIndexById_1.configSkillButtonIndexById.GetConfig(l);
  }
  GetSkillIconConfigByTag(l) {
    return SkillIconByTag_1.configSkillIconByTag.GetConfig(l);
  }
  GetSkillButtonEffectConfig(l) {
    return SkillButtonEffectById_1.configSkillButtonEffectById.GetConfig(l);
  }
}
exports.SkillButtonConfig = SkillButtonConfig;
//# sourceMappingURL=SkillButtonConfig.js.map