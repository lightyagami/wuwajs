"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotAudioModel = undefined;
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LauncherLanguageLib_1 = require("../../../Launcher/Util/LauncherLanguageLib");
const ModelManager_1 = require("../../Manager/ModelManager");
const GLOBAL = "gl";
class PlotAudioModel extends ModelBase_1.ModelBase {
  static GetExternalSourcesMediaName(e) {
    var a = new StringBuilder_1.StringBuilder();
    let r = false;
    let n = "";
    var t = PlotAudioModel.HL1(e.VarParams, e.FileName);
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
        r = e.CheckGenderKo;
    }
    let i = LanguageSystem_1.LanguageSystem.PackageAudio;
    if (e.GlobalLanguage) {
      i = GLOBAL;
    }
    if (r) {
      n = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? "_F" : "_M";
    }
    a.Append(i, "_", t, n, ".wem");
    return a.ToString();
  }
  static GetAudioMouthAnimName(e) {
    var a = new StringBuilder_1.StringBuilder();
    let r = false;
    let n = "";
    var t = PlotAudioModel.HL1(e.VarParams, e.FileName);
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
        r = e.CheckGenderKo;
    }
    let i = LanguageSystem_1.LanguageSystem.PackageAudio;
    if (e.GlobalLanguage) {
      i = GLOBAL;
    }
    if (r) {
      n = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? "_F" : "_M";
    }
    a.Append(i, "_", t, n);
    t = a.ToString();
    a.Clear();
    a.Append("/Game/Aki/Sequence/SequenceAnim/VoiceMouth/", LanguageSystem_1.LanguageSystem.PackageAudio, "/", t, ".", t);
    return a.ToString();
  }
  static GetExternalSourcesMediaNameForEditor(e, a) {
    let r = false;
    let n = "";
    var t = PlotAudioModel.HL1(e.VarParams, e.FileName);
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
        r = e.CheckGenderKo;
    }
    if (r) {
      n = a ? "_F" : "_M";
    }
    a = LanguageSystem_1.LanguageSystem.PackageAudio;
    return new StringBuilder_1.StringBuilder(a, "_", t, n, ".wem").ToString();
  }
  static Vih(e) {
    e = e.split(" ");
    const r = {};
    e.forEach(e => {
      var [e, a] = e.split("=");
      r[e] = a;
    });
    return r;
  }
  static HL1(e, a) {
    let r = "";
    if (StringUtils_1.StringUtils.IsBlank(e) || ((e = PlotAudioModel.Vih(e)).VarType === "Global" && (r = ModelManager_1.ModelManager.WorldModel?.GetWorldStateGeneric(e.Key) ?? ""), StringUtils_1.StringUtils.IsBlank(r))) {
      return a;
    } else {
      return a.replace(/\{VarParams\}/g, r);
    }
  }
}
exports.PlotAudioModel = PlotAudioModel;
//# sourceMappingURL=PlotAudioModel.js.map