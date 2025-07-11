"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const GamePlayScanByUid_1 = require("../../../Core/Define/ConfigQuery/GamePlayScanByUid");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelGamePlayConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.eIe = undefined;
    this.ScanMaxDistance = 0;
    this.ScanShowInteractionEffectMaxDistance = 0;
    this.ScanDetectConcealedDistance = 0;
    this.InteractInputCacheTime = 0;
    this.GenExtraGuideEffectMaxDist = 0;
    this.GenExtraGuideEffectMinDist = 0;
    this.ExtraGuideEffectRaiseDist = 0;
  }
  OnInit() {
    this.eIe = new Map();
    this.ScanMaxDistance = CommonParamById_1.configCommonParamById.GetIntConfig("scan_max_distance") ?? 0;
    this.ScanShowInteractionEffectMaxDistance = CommonParamById_1.configCommonParamById.GetIntConfig("scan_interaction_effect_max_distance") ?? 0;
    this.ScanDetectConcealedDistance = CommonParamById_1.configCommonParamById.GetIntConfig("scan_detect_concealed_distance") ?? 0;
    this.InteractInputCacheTime = CommonParamById_1.configCommonParamById.GetIntConfig("interact_input_cache_time") ?? 0;
    this.GenExtraGuideEffectMaxDist = CommonParamById_1.configCommonParamById.GetIntConfig("MaxNavigateToGuideEffectDist") ?? 0;
    this.GenExtraGuideEffectMinDist = CommonParamById_1.configCommonParamById.GetIntConfig("MinNavigateToGuideEffectDist") ?? 0;
    this.ExtraGuideEffectRaiseDist = CommonParamById_1.configCommonParamById.GetIntConfig("GuideEffectRaiseDist") ?? 0;
    return true;
  }
  OnClear() {
    return !(this.eIe = undefined);
  }
  GetScanInfoById(e) {
    var a = this.eIe?.get(e);
    if (!a) {
      if (a = GamePlayScanByUid_1.configGamePlayScanByUid.GetConfig(e)) {
        this.eIe.set(e, a);
      }
    }
    return a;
  }
}
exports.LevelGamePlayConfig = LevelGamePlayConfig;
//# sourceMappingURL=LevelGamePlayConfig.js.map