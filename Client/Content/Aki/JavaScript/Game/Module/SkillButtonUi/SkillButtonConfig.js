"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonConfig = undefined;
const BehaviorCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/BehaviorCommonButtonAll");
const BehaviorCommonButtonById_1 = require("../../../Core/Define/ConfigQuery/BehaviorCommonButtonById");
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId");
const SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById");
const SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById");
const SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll");
const SkillFollowerButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillFollowerButtonByPbDataId");
const SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag");
const SkillPriorityButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillPriorityButtonAll");
const SkillVehicleButtonByTemplateId_1 = require("../../../Core/Define/ConfigQuery/SkillVehicleButtonByTemplateId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
  GetAllSkillButtonConfig(e) {
    return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(e);
  }
  GetAllSkillCommonButtonConfig() {
    return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
  }
  GetAllSkillFollowerButtonConfig(e) {
    return SkillFollowerButtonByPbDataId_1.configSkillFollowerButtonByPbDataId.GetConfigList(e);
  }
  GetAllSkillVehicleButtonConfig(e) {
    return SkillVehicleButtonByTemplateId_1.configSkillVehicleButtonByTemplateId.GetConfigList(e);
  }
  GetAllSkillPriorityButtonConfig() {
    return SkillPriorityButtonAll_1.configSkillPriorityButtonAll.GetConfigList();
  }
  GetSkillIndexConfig(e) {
    return SkillButtonIndexById_1.configSkillButtonIndexById.GetConfig(e);
  }
  GetSkillIconConfigByTag(e) {
    return SkillIconByTag_1.configSkillIconByTag.GetConfig(e);
  }
  GetSkillButtonEffectConfig(e) {
    return SkillButtonEffectById_1.configSkillButtonEffectById.GetConfig(e);
  }
  GetAllBehaviorCommonButtonConfig() {
    return BehaviorCommonButtonAll_1.configBehaviorCommonButtonAll.GetConfigList();
  }
  GetBehaviorCommonButtonConfig(e) {
    return BehaviorCommonButtonById_1.configBehaviorCommonButtonById.GetConfig(e);
  }
}
exports.SkillButtonConfig = SkillButtonConfig;
//# sourceMappingURL=SkillButtonConfig.js.map