"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageSystem = exports.languageCultureMap = exports.languageSpeechMapping = exports.LanguageDefine = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const PlatformSdkServer_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkServer");
const LauncherLanguageLib_1 = require("../../Launcher/Util/LauncherLanguageLib");
const AudioSystem_1 = require("../Audio/AudioSystem");
const CommonDefine_1 = require("../Define/CommonDefine");
const LanguageDefineByLanguageCode_1 = require("../Define/ConfigQuery/LanguageDefineByLanguageCode");
const Info_1 = require("./Info");
const Log_1 = require("./Log");
class LanguageDefine {
  constructor(e, a, n) {
    this.LanguageType = e;
    this.LanguageCode = a;
    this.AudioCode = n;
  }
}
exports.LanguageDefine = LanguageDefine;
exports.languageSpeechMapping = new Map([[0, 0], [1, 1], [2, 2], [3, 3], [4, 1], [5, 0], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1]]);
const languageList = [new LanguageDefine(0, "zh-Hans", "zh"), new LanguageDefine(1, "en", "en"), new LanguageDefine(2, "ja", "ja"), new LanguageDefine(3, "ko", "ko"), new LanguageDefine(4, "ru", "en"), new LanguageDefine(5, "zh-Hant", "zh"), new LanguageDefine(6, "de", "en"), new LanguageDefine(7, "es", "en"), new LanguageDefine(8, "pt", "en"), new LanguageDefine(9, "id", "en"), new LanguageDefine(10, "fr", "en"), new LanguageDefine(11, "vi", "en"), new LanguageDefine(12, "th", "en")];
exports.languageCultureMap = new Map([["zh-Hans", 11], ["en", 0], ["ja", 10], ["ko", 9], ["ru", 6], ["zh-Hant", 12], ["de", 3], ["es", 4], ["pt", 14], ["id", 16], ["fr", 1], ["vi", 17], ["th", 18]]);
const languageTypeMap = new Map();
const languageCodeMap = new Map();
for (const d of languageList) {
  languageTypeMap.set(d.LanguageType, d);
  languageCodeMap.set(d.LanguageCode, d);
}
class LanguageSystem {
  static get PackageLanguage() {
    return LanguageSystem.T8 ?? CommonDefine_1.CHS;
  }
  static set PackageLanguage(e) {
    var a = LanguageSystem.T8;
    LanguageSystem.T8 = e;
    UE.LGUIFontData.SetAllFontCurrentCulture(exports.languageCultureMap.get(e));
    if (!Info_1.Info.IsPlayInEditor) {
      UE.KismetInternationalizationLibrary.SetCurrentCulture(e, true);
    }
    if (e !== a) {
      UE.UIText.OnTsLanguageChange();
    }
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkServer_1.PlatformSdkServer.SetLanguage(e);
    }
    LauncherLanguageLib_1.LauncherLanguageLib.SetPackageLanguage(e);
  }
  static get PackageAudio() {
    return LanguageSystem.L8 ?? CommonDefine_1.CHS_AUDIO;
  }
  static SetPackageAudio(a, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameSettings", 64, "开始设置音频语种，对应【SetCurrentAudioCultureAsync】", ["Code", a]);
    }
    LanguageSystem.L8 = a;
    const n = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Config", 30, "SetCurrentAudioCultureAsync", ["Success", e], ["Code", a]);
      }
      (0, puerts_1.releaseManualReleaseDelegate)(n);
      if (e) {
        AudioSystem_1.AudioSystem.SetState("language", a);
      }
    };
    UE.AkGameplayStatics.SetCurrentAudioCultureAsync(a, (0, puerts_1.toManualReleaseDelegate)(n));
  }
  static D8(e) {
    if (e.includes(CommonDefine_1.CHINESE_ISO639_1)) {
      return CommonDefine_1.CHS;
    } else {
      return CommonDefine_1.ENGLISH_ISO639_1;
    }
  }
  static FirstTimeSetLanguage(e) {
    var a = UE.KismetSystemLibrary.GetDefaultLanguage();
    var n = UE.NewArray(UE.BuiltinString);
    for (const r of CommonDefine_1.AVAILABLE_LANGUAGES) {
      n.Add(r);
    }
    var g = this.D8(a);
    var t = UE.KismetInternationalizationLibrary.GetSuitableCulture(n, a, g);
    var u = LanguageDefineByLanguageCode_1.configLanguageDefineByLanguageCode.GetConfig(t);
    var u = !!u?.IsShow && u.IsShow;
    var t = u ? t : this.D8(t);
    if (!u) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Config", 10, "当前语种表格配置不允许生效", ["targetLanguage", t], ["currentCulture", a]);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Config", 30, "第一次设置语言", ["设备默认语言", a], ["查找不到时匹配默认语言", g], ["最合适语言", t]);
    }
    var u = languageCodeMap.get(t);
    if (u) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Config", 30, "FirstTimeSetLanguage", ["Text", u.LanguageCode], ["Audio", u.AudioCode]);
      }
      LanguageSystem.PackageLanguage = u.LanguageCode;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 30, "设置系统找不到配置", ["语种识别码", t]);
      }
      LanguageSystem.PackageLanguage = CommonDefine_1.ENGLISH_ISO639_1;
    }
  }
  static GetAllLanguageDefines() {
    return languageList;
  }
  static GetLanguageDefineByType(e) {
    return languageTypeMap.get(e);
  }
  static GetLanguageDefineByCode(e) {
    return languageCodeMap.get(e);
  }
  static GetCultureOrDefault(e) {
    if (e && e.length !== 0) {
      return e;
    } else {
      return LanguageSystem.PackageLanguage;
    }
  }
  static GetSpeechTypeByLanguageType(e) {
    return exports.languageSpeechMapping.get(e);
  }
}
(exports.LanguageSystem = LanguageSystem).GmShowLanguageKey = false;
LanguageSystem.GmReplaceTextContent = ""; //# sourceMappingURL=LanguageSystem.js.map