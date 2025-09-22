"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const FightPhotoOptionAll_1 = require("../../../Core/Define/ConfigQuery/FightPhotoOptionAll");
const PhotoFilterAll_1 = require("../../../Core/Define/ConfigQuery/PhotoFilterAll");
const PhotoFilterById_1 = require("../../../Core/Define/ConfigQuery/PhotoFilterById");
const PhotoMontageById_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageById");
const PhotoMontageBySkinIdAndMainAnimInstanceType_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageBySkinIdAndMainAnimInstanceType");
const PhotoSetupAll_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupAll");
const PhotoSetupByValueType_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupByValueType");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const PhotographDefine_1 = require("./PhotographDefine");
class PhotographConfig extends ConfigBase_1.ConfigBase {
  GetPhotoMontageConfig(e) {
    return PhotoMontageById_1.configPhotoMontageById.GetConfig(e);
  }
  GetPhotoMontageConfigListBySkinIdAndMainAnim(e, o) {
    return PhotoMontageBySkinIdAndMainAnimInstanceType_1.configPhotoMontageBySkinIdAndMainAnimInstanceType.GetConfigList(e, o);
  }
  GetPhotoSetupConfig(e) {
    return PhotoSetupByValueType_1.configPhotoSetupByValueType.GetConfig(e);
  }
  GetAllPhotoSetupConfig() {
    return PhotoSetupAll_1.configPhotoSetupAll.GetConfigList();
  }
  GetDepthDistanceDefaultValue() {
    var e = this.GetPhotoSetupConfig(4);
    if (e) {
      return e.ValueRange[2];
    } else {
      return PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
    }
  }
  GetDepthOfFieldRadiusDefaultValue() {
    var e = this.GetPhotoSetupConfig(5);
    if (e) {
      return e.ValueRange[2];
    } else {
      return PhotographDefine_1.DEFAULT_APERTURE;
    }
  }
  GetAllPhotoFilterConfig() {
    return PhotoFilterAll_1.configPhotoFilterAll.GetConfigList();
  }
  GetPhotoFilterConfigById(e) {
    return PhotoFilterById_1.configPhotoFilterById.GetConfig(e);
  }
  GetAllFightPhotoOptionConfig() {
    return FightPhotoOptionAll_1.configFightPhotoOptionAll.GetConfigList();
  }
  GetUiCameraFightPhotographConfig(e) {
    var o = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(26, e);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FightPhotograph", 71, "在UiCameraFightPhotographSettings表里未找到对应数据", ["handleName", e]);
    }
  }
}
exports.PhotographConfig = PhotographConfig;
//# sourceMappingURL=PhotographConfig.js.map