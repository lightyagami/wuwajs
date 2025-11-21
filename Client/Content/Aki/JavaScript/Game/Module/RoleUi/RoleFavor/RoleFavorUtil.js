"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorUtil = undefined;
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class RoleFavorUtil {
  static GetCurLanguageCvName(e) {
    var r = ConfigManager_1.ConfigManager.RoleFavorConfig?.GetFavorRoleInfoConfig(e);
    if (r === undefined) {
      return StringUtils_1.EMPTY_STRING;
    }
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        return r.CVNameCn;
      case CommonDefine_1.JAPANESE_ISO639_1:
        return r.CVNameJp;
      case CommonDefine_1.ENGLISH_ISO639_1:
        return r.CVNameEn;
      case CommonDefine_1.KOREAN_ISO639_1:
        return r.CVNameKo;
      default:
        return r.CVNameCn;
    }
  }
}
exports.RoleFavorUtil = RoleFavorUtil;
//# sourceMappingURL=RoleFavorUtil.js.map