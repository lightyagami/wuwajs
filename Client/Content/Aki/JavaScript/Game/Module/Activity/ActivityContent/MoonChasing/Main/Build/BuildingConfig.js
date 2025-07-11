"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingConfig = undefined;
const BuildingAll_1 = require("../../../../../../../Core/Define/ConfigQuery/BuildingAll");
const BuildingById_1 = require("../../../../../../../Core/Define/ConfigQuery/BuildingById");
const BuildingUpGradeCurveByGroupId_1 = require("../../../../../../../Core/Define/ConfigQuery/BuildingUpGradeCurveByGroupId");
const BuildingUpGradeCurveByGroupIdAndLevel_1 = require("../../../../../../../Core/Define/ConfigQuery/BuildingUpGradeCurveByGroupIdAndLevel");
const ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class BuildingConfig extends ConfigBase_1.ConfigBase {
  GetBuildingAll() {
    return BuildingAll_1.configBuildingAll.GetConfigList();
  }
  GetBuildingById(e) {
    return BuildingById_1.configBuildingById.GetConfig(e);
  }
  GetBuildingUpGradeCurveByGroupIdAndLevel(e, r) {
    return BuildingUpGradeCurveByGroupIdAndLevel_1.configBuildingUpGradeCurveByGroupIdAndLevel.GetConfig(e, r);
  }
  GetBuildingUpGradeCurveByGroupId(e) {
    return BuildingUpGradeCurveByGroupId_1.configBuildingUpGradeCurveByGroupId.GetConfigList(e);
  }
}
exports.BuildingConfig = BuildingConfig;
//# sourceMappingURL=BuildingConfig.js.map