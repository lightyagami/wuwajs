"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureConfig = undefined;
const AtmosphereLevelByActivityId_1 = require("../../../../Core/Define/ConfigQuery/AtmosphereLevelByActivityId");
const AtmosphereLevelByActivityIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/AtmosphereLevelByActivityIdAndLevel");
const FurnitureAll_1 = require("../../../../Core/Define/ConfigQuery/FurnitureAll");
const FurnitureByActivityId_1 = require("../../../../Core/Define/ConfigQuery/FurnitureByActivityId");
const FurnitureById_1 = require("../../../../Core/Define/ConfigQuery/FurnitureById");
const FurnitureBySourceTypeAndGetWayId_1 = require("../../../../Core/Define/ConfigQuery/FurnitureBySourceTypeAndGetWayId");
const FurnitureByTagId_1 = require("../../../../Core/Define/ConfigQuery/FurnitureByTagId");
const FurnitureDiyTagAll_1 = require("../../../../Core/Define/ConfigQuery/FurnitureDiyTagAll");
const FurnitureDiyTagById_1 = require("../../../../Core/Define/ConfigQuery/FurnitureDiyTagById");
const FurnitureFilterConfigAll_1 = require("../../../../Core/Define/ConfigQuery/FurnitureFilterConfigAll");
const FurnitureFilterConfigById_1 = require("../../../../Core/Define/ConfigQuery/FurnitureFilterConfigById");
const FurniturePresetConfigByAreaId_1 = require("../../../../Core/Define/ConfigQuery/FurniturePresetConfigByAreaId");
const FurnitureQualityConfigById_1 = require("../../../../Core/Define/ConfigQuery/FurnitureQualityConfigById");
const SpringFestivalAreaByAll_1 = require("../../../../Core/Define/ConfigQuery/SpringFestivalAreaByAll");
const SpringFestivalAreaByFloor_1 = require("../../../../Core/Define/ConfigQuery/SpringFestivalAreaByFloor");
const SpringFestivalAreaById_1 = require("../../../../Core/Define/ConfigQuery/SpringFestivalAreaById");
const SpringFestivalAreaCameraById_1 = require("../../../../Core/Define/ConfigQuery/SpringFestivalAreaCameraById");
const SpringFestivalByActivityId_1 = require("../../../../Core/Define/ConfigQuery/SpringFestivalByActivityId");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class FurnitureConfig extends ConfigBase_1.ConfigBase {
  GetGameplayConfigById(e) {
    return SpringFestivalByActivityId_1.configSpringFestivalByActivityId.GetConfig(e);
  }
  GetFurnitureConfig(e) {
    return FurnitureById_1.configFurnitureById.GetConfig(e);
  }
  GetFurnitureConfigListByTagId(e) {
    return FurnitureByTagId_1.configFurnitureByTagId.GetConfigList(e);
  }
  GetFurnitureAreaConfig(e) {
    return SpringFestivalAreaById_1.configSpringFestivalAreaById.GetConfig(e);
  }
  GetFurnitureTagConfig(e) {
    return FurnitureDiyTagById_1.configFurnitureDiyTagById.GetConfig(e);
  }
  HasFurnitureLimit(e) {
    return this.GetFurnitureConfig(e).LimitCount > 0;
  }
  GetFurniturePresetConfig(e) {
    return FurniturePresetConfigByAreaId_1.configFurniturePresetConfigByAreaId.GetConfig(e);
  }
  GetFurnitureTagConfigList() {
    return FurnitureDiyTagAll_1.configFurnitureDiyTagAll.GetConfigList();
  }
  GetAtmosphereLevelConfig(e, r) {
    return AtmosphereLevelByActivityIdAndLevel_1.configAtmosphereLevelByActivityIdAndLevel.GetConfig(e, r);
  }
  GetAtmosphereLevelConfigList(e) {
    return AtmosphereLevelByActivityId_1.configAtmosphereLevelByActivityId.GetConfigList(e);
  }
  GetFurnitureConfigListByHandleId(e) {
    return FurnitureByActivityId_1.configFurnitureByActivityId.GetConfigList(e);
  }
  GetFurnitureQualityConfig(e) {
    return FurnitureQualityConfigById_1.configFurnitureQualityConfigById.GetConfig(e);
  }
  GetFurnitureFilterConfig(e) {
    return FurnitureFilterConfigById_1.configFurnitureFilterConfigById.GetConfig(e);
  }
  GetFurnitureFilterConfigList() {
    return FurnitureFilterConfigAll_1.configFurnitureFilterConfigAll.GetConfigList();
  }
  GetFurnitureConfigListBySourceTypeAndGetWayId(e, r) {
    return FurnitureBySourceTypeAndGetWayId_1.configFurnitureBySourceTypeAndGetWayId.GetConfigList(e, r);
  }
  GetFurnitureAreaConfigListByFloorId(e) {
    return SpringFestivalAreaByFloor_1.configSpringFestivalAreaByFloor.GetConfigList(e);
  }
  GetFurnitureConfigList() {
    return FurnitureAll_1.configFurnitureAll.GetConfigList();
  }
  GetFurnitureAreaConfigList() {
    return SpringFestivalAreaByAll_1.configSpringFestivalAreaByAll.GetConfigList();
  }
  GetFurnitureAreaConfigBySlotEntityId(e) {
    for (const r of this.GetFurnitureAreaConfigList()) {
      if (r.SlotEntityIds.includes(e)) {
        return r;
      }
    }
  }
  GetAreaCameraConfig(e) {
    return SpringFestivalAreaCameraById_1.configSpringFestivalAreaCameraById.GetConfig(e);
  }
}
exports.FurnitureConfig = FurnitureConfig;
//# sourceMappingURL=FurnitureConfig.js.map