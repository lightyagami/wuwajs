"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorDiyConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MotorComponentGroupById_1 = require("../../../../Core/Define/ConfigQuery/MotorComponentGroupById");
const MotorDecorationsById_1 = require("../../../../Core/Define/ConfigQuery/MotorDecorationsById");
const MotorDecorationsPartById_1 = require("../../../../Core/Define/ConfigQuery/MotorDecorationsPartById");
const MotorFrameById_1 = require("../../../../Core/Define/ConfigQuery/MotorFrameById");
const MotorFramePartById_1 = require("../../../../Core/Define/ConfigQuery/MotorFramePartById");
const MotorGeneralPreviewById_1 = require("../../../../Core/Define/ConfigQuery/MotorGeneralPreviewById");
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
  GetMotorDecorationPartConfig(o) {
    return MotorDecorationsPartById_1.configMotorDecorationsPartById.GetConfig(o);
  }
  GetMotorFramePartConfig() {
    return MotorFramePartById_1.configMotorFramePartById.GetConfig(1);
  }
  GetMotorQualityConfig(o) {
    return MotorQualityByQualityId_1.configMotorQualityByQualityId.GetConfig(o);
  }
  GetMotorStickerConfig(o) {
    return MotorStickerById_1.configMotorStickerById.GetConfig(o);
  }
  GetMotorFrameConfig(o) {
    return MotorFrameById_1.configMotorFrameById.GetConfig(o);
  }
  GetMotorDecorationConfig(o) {
    return MotorDecorationsById_1.configMotorDecorationsById.GetConfig(o);
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
  GetMotorGeneralPreviewConfig(o) {
    return MotorGeneralPreviewById_1.configMotorGeneralPreviewById.GetConfig(o);
  }
}
exports.MotorDiyConfig = MotorDiyConfig;
//# sourceMappingURL=MotorDiyConfig.js.map