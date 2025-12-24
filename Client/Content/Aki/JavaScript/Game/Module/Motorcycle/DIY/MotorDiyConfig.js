"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorDiyConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MotorComponentGroupById_1 = require("../../../../Core/Define/ConfigQuery/MotorComponentGroupById");
const MotorLoadProjectAll_1 = require("../../../../Core/Define/ConfigQuery/MotorLoadProjectAll");
const MotorLoadProjectById_1 = require("../../../../Core/Define/ConfigQuery/MotorLoadProjectById");
const MotorQualityByQualityId_1 = require("../../../../Core/Define/ConfigQuery/MotorQualityByQualityId");
const MotorSkinById_1 = require("../../../../Core/Define/ConfigQuery/MotorSkinById");
const MotorStickerById_1 = require("../../../../Core/Define/ConfigQuery/MotorStickerById");
const MotorStickerPartById_1 = require("../../../../Core/Define/ConfigQuery/MotorStickerPartById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MotorDiyConfig extends ConfigBase_1.ConfigBase {
  GetMotorSkinConfig(o) {
    return MotorSkinById_1.configMotorSkinById.GetConfig(o);
  }
  GetMotorStickerPartConfig(o) {
    return MotorStickerPartById_1.configMotorStickerPartById.GetConfig(o);
  }
  GetMotorQualityConfig(o) {
    return MotorQualityByQualityId_1.configMotorQualityByQualityId.GetConfig(o);
  }
  GetMotorStickerConfig(o) {
    return MotorStickerById_1.configMotorStickerById.GetConfig(o);
  }
  GetMotorComponentGroupConfig(o) {
    return MotorComponentGroupById_1.configMotorComponentGroupById.GetConfig(o);
  }
  GetAllMotorPresetList() {
    var o = MotorLoadProjectAll_1.configMotorLoadProjectAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorLoadProject表无效All");
      }
      return [];
    } else {
      return o;
    }
  }
  GetMotorPresetConfig(o) {
    return MotorLoadProjectById_1.configMotorLoadProjectById.GetConfig(o);
  }
}
exports.MotorDiyConfig = MotorDiyConfig;
//# sourceMappingURL=MotorDiyConfig.js.map