"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const InfrActivityTaskByTaskId_1 = require("../../../Core/Define/ConfigQuery/InfrActivityTaskByTaskId");
const InfrArchiveItemAll_1 = require("../../../Core/Define/ConfigQuery/InfrArchiveItemAll");
const InfrArchiveItemById_1 = require("../../../Core/Define/ConfigQuery/InfrArchiveItemById");
const InfrArchiveItemQualityById_1 = require("../../../Core/Define/ConfigQuery/InfrArchiveItemQualityById");
const InfrArchiveTaskAll_1 = require("../../../Core/Define/ConfigQuery/InfrArchiveTaskAll");
const InfrAutoPilotCircleAll_1 = require("../../../Core/Define/ConfigQuery/InfrAutoPilotCircleAll");
const InfrItemQualityById_1 = require("../../../Core/Define/ConfigQuery/InfrItemQualityById");
const InfrLevelAll_1 = require("../../../Core/Define/ConfigQuery/InfrLevelAll");
const InfrLevelByLevel_1 = require("../../../Core/Define/ConfigQuery/InfrLevelByLevel");
const InfrPasserAll_1 = require("../../../Core/Define/ConfigQuery/InfrPasserAll");
const InfrPasserById_1 = require("../../../Core/Define/ConfigQuery/InfrPasserById");
const InfrPhoneMessageAll_1 = require("../../../Core/Define/ConfigQuery/InfrPhoneMessageAll");
const InfrPhoneMessageById_1 = require("../../../Core/Define/ConfigQuery/InfrPhoneMessageById");
const InfrPhoneTaskAll_1 = require("../../../Core/Define/ConfigQuery/InfrPhoneTaskAll");
const InfrRoadBuildAll_1 = require("../../../Core/Define/ConfigQuery/InfrRoadBuildAll");
const InfrRoadBuildById_1 = require("../../../Core/Define/ConfigQuery/InfrRoadBuildById");
const InfrRoadBuildByMarkId_1 = require("../../../Core/Define/ConfigQuery/InfrRoadBuildByMarkId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InfrastructureConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetRoadConfigById(e) {
    return InfrRoadBuildById_1.configInfrRoadBuildById.GetConfig(e);
  }
  GetRoadConfigList() {
    return InfrRoadBuildAll_1.configInfrRoadBuildAll.GetConfigList() ?? [];
  }
  GetRoadConfigByMarkId(e) {
    return InfrRoadBuildByMarkId_1.configInfrRoadBuildByMarkId.GetConfig(e);
  }
  GetLevelConfigById(e) {
    return InfrLevelByLevel_1.configInfrLevelByLevel.GetConfig(e);
  }
  GetMaxLevel() {
    return this.GetAllLevelConfigs().reduce((e, r) => e.Level > r.Level ? e : r).Level;
  }
  GetAllLevelConfigs() {
    return InfrLevelAll_1.configInfrLevelAll.GetConfigList() ?? [];
  }
  GetItemQualityColor(e) {
    return InfrItemQualityById_1.configInfrItemQualityById.GetConfig(e)?.Color ?? "#FFE65A";
  }
  GetInfrActivityTaskConfig(e) {
    return InfrActivityTaskByTaskId_1.configInfrActivityTaskByTaskId.GetConfig(e);
  }
  GetArchiveItemQualityPath(e) {
    return InfrArchiveItemQualityById_1.configInfrArchiveItemQualityById.GetConfig(e)?.Path ?? "";
  }
  GetArchiveItemConfig(e) {
    return InfrArchiveItemById_1.configInfrArchiveItemById.GetConfig(e);
  }
  GetArchiveItemById(e) {
    return InfrArchiveItemById_1.configInfrArchiveItemById.GetConfig(e);
  }
  GetArchiveItemIdConfigList() {
    return InfrArchiveItemAll_1.configInfrArchiveItemAll.GetConfigList() ?? [];
  }
  GetInfrArchiveTaskList() {
    return InfrArchiveTaskAll_1.configInfrArchiveTaskAll.GetConfigList() ?? [];
  }
  GetInfrPhoneTaskList() {
    return InfrPhoneTaskAll_1.configInfrPhoneTaskAll.GetConfigList() ?? [];
  }
  GetInfrPasserConfigList() {
    return InfrPasserAll_1.configInfrPasserAll.GetConfigList() ?? [];
  }
  GetInfrPasserConfigById(e) {
    return InfrPasserById_1.configInfrPasserById.GetConfig(e);
  }
  GetInfrPhoneMessageConfigById(e) {
    return InfrPhoneMessageById_1.configInfrPhoneMessageById.GetConfig(e);
  }
  GetInfrPhoneMessageConfigList() {
    return InfrPhoneMessageAll_1.configInfrPhoneMessageAll.GetConfigList() ?? [];
  }
  GetHelpIdActivity() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BuildRoad_ActivityHelpId") ?? 0;
  }
  GetHelpIdRoadProcess() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BuildRoad_RoadProcessHelpId") ?? 0;
  }
  GetAutoPilotCircle() {
    return InfrAutoPilotCircleAll_1.configInfrAutoPilotCircleAll.GetConfigList() ?? [];
  }
}
exports.InfrastructureConfig = InfrastructureConfig;
//# sourceMappingURL=InfrastructureConfig.js.map