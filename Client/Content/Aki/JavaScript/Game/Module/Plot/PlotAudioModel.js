"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotAudioModel = void 0;
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  LauncherLanguageLib_1 = require("../../../Launcher/Util/LauncherLanguageLib"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GLOBAL = "gl";
class PlotAudioModel extends ModelBase_1.ModelBase {
  static GetExternalSourcesMediaName(e) {
    var a = new StringBuilder_1.StringBuilder;
    let r = !1,
      n = "";
    var t = PlotAudioModel.pL1(e.VarParams, e.FileName);
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        r = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        r = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        r = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        r = e.CheckGenderKo
    }
    let i = LanguageSystem_1.LanguageSystem.PackageAudio;
    return e.GlobalLanguage && (i = GLOBAL), r && (n = 0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ? "_F" : "_M"), a.Append(i, "_", t, n, ".wem"), a.ToString()
  }
  static GetAudioMouthAnimName(e) {
    var a = new StringBuilder_1.StringBuilder;
    let r = !1,
      n = "";
    var t = PlotAudioModel.pL1(e.VarParams, e.FileName);
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        r = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        r = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        r = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        r = e.CheckGenderKo
    }
    let i = LanguageSystem_1.LanguageSystem.PackageAudio;
    e.GlobalLanguage && (i = GLOBAL), r && (n = 0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() ? "_F" : "_M"), a.Append(i, "_", t, n);
    t = a.ToString();
    return a.Clear(), a.Append("/Game/Aki/Sequence/SequenceAnim/VoiceMouth/", LanguageSystem_1.LanguageSystem.PackageAudio, "/", t, ".", t), a.ToString()
  }
  static GetExternalSourcesMediaNameForEditor(e, a) {
    let r = !1,
      n = "";
    var t = PlotAudioModel.pL1(e.VarParams, e.FileName);
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        r = e.CheckGenderZh;
        break;
      case LauncherLanguageLib_1.ENGLISH_ISO639_1:
        r = e.CheckGenderEn;
        break;
      case CommonDefine_1.JAPANESE_ISO639_1:
        r = e.CheckGenderJa;
        break;
      case LauncherLanguageLib_1.KOREAN_ISO639_1:
        r = e.CheckGenderKo
    }
    r && (n = a ? "_F" : "_M");
    a = LanguageSystem_1.LanguageSystem.PackageAudio;
    return new StringBuilder_1.StringBuilder(a, "_", t, n, ".wem").ToString()
  }
  static Vih(e) {
    e = e.split(" ");
    const r = {};
    return e.forEach(e => {
      var [e, a] = e.split("=");
      r[e] = a
    }), r
  }
  static pL1(e, a) {
    let r = "";
    return StringUtils_1.StringUtils.IsBlank(e) || ("Global" === (e = PlotAudioModel.Vih(e)).VarType && (r = ModelManager_1.ModelManager.WorldModel?.GetWorldStateGeneric(e.Key) ?? ""), StringUtils_1.StringUtils.IsBlank(r)) ? a : a.replace(/\{VarParams\}/g, r)
  }
}
exports.PlotAudioModel = PlotAudioModel;
//# sourceMappingURL=PlotAudioModel.js.map