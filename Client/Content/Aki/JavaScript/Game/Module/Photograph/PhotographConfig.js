"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographConfig = undefined;
const PhotoFilterAll_1 = require("../../../Core/Define/ConfigQuery/PhotoFilterAll");
const PhotoFilterById_1 = require("../../../Core/Define/ConfigQuery/PhotoFilterById");
const PhotoMontageById_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageById");
const PhotoMontageByRoleIdAndMainAnimInstanceType_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageByRoleIdAndMainAnimInstanceType");
const PhotoSetupAll_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupAll");
const PhotoSetupByValueType_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupByValueType");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const PhotographDefine_1 = require("./PhotographDefine");
class PhotographConfig extends ConfigBase_1.ConfigBase {
  GetPhotoMontageConfig(e) {
    return PhotoMontageById_1.configPhotoMontageById.GetConfig(e);
  }
  GetPhotoMontageConfigListByRoleIdAndMainAnim(e, o) {
    return PhotoMontageByRoleIdAndMainAnimInstanceType_1.configPhotoMontageByRoleIdAndMainAnimInstanceType.GetConfigList(e, o);
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
}
exports.PhotographConfig = PhotographConfig;
//# sourceMappingURL=PhotographConfig.js.map