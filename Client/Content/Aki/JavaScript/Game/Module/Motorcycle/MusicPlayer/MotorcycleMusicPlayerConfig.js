"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicPlayerConfig = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class MotorcycleMusicPlayerConfig extends ConfigBase_1.ConfigBase {
  GetFavoriteAlbumId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomMusicCollectAlbum");
  }
  GetDefaultAlbumId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomMusicDefaultAlbum");
  }
  GetFavoriteCountLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomMusicCollectMaxCount");
  }
  GetAlbumVelocity() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicUIVelocity") ?? 1;
  }
  GetDragSwapSpeed() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicDragSwapSpeed") ?? 10;
  }
  GetDragScrollSpeedRange() {
    var e = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorMusicDragScrollSpeed");
    if (e && e.length >= 2) {
      return [e[0], e[1]];
    } else {
      return [0.001, 0.01];
    }
  }
  GetStartDelay() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicStartDelay") ?? 1) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetFadeInTime() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicStartFadein") ?? 1) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetFadeOutTime() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicStartFadeout") ?? 1) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetMusicUnlockTipTime() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicUnlockTipTime") ?? 3) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetRestartFadeInTime() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicRestartFadein") ?? 1) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetInterruptFadeOutTime() {
    return Math.round((CommonParamById_1.configCommonParamById.GetFloatConfig("MotorMusicInterruptFadeout") ?? 1) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  GetScaleCurvePath() {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("AlbumScaleCurve");
  }
  GetAlphaCurvePath() {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("AlbumAlphaCurve");
  }
  GetRotateCurvePath() {
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("AlbumRotateCurve");
  }
}
exports.MotorcycleMusicPlayerConfig = MotorcycleMusicPlayerConfig;
//# sourceMappingURL=MotorcycleMusicPlayerConfig.js.map