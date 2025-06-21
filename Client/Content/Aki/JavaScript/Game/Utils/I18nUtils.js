"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.I18nUtils = void 0;
const UE = require("ue"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  I18nResourcesById_1 = require("../../Core/Define/ConfigQuery/I18nResourcesById"),
  I18nTexturesById_1 = require("../../Core/Define/ConfigQuery/I18nTexturesById"),
  MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
  PlotAudioById_1 = require("../../Core/Define/ConfigQuery/PlotAudioById"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../Manager/ModelManager"),
  PlotAudioModel_1 = require("../Module/Plot/PlotAudioModel");
class I18nUtils {
  static GetI18nPathAtCurrentLanguage(o) {
    o = I18nResourcesById_1.configI18nResourcesById.GetConfig(o);
    if (void 0 !== o) {
      o = I18nTexturesById_1.configI18nTexturesById.GetConfig(o.TextureRef);
      if (void 0 !== o) {
        let e = void 0;
        var n = LanguageSystem_1.LanguageSystem.PackageLanguage;
        if (n === CommonDefine_1.CHS ? e = o.ZhHans : n === CommonDefine_1.CHT ? e = o.ZhHant : n === CommonDefine_1.ENGLISH_ISO639_1 ? e = o.En : n === CommonDefine_1.JAPANESE_ISO639_1 ? e = o.Ja : n === CommonDefine_1.KOREAN_ISO639_1 ? e = o.Ko : n === CommonDefine_1.RUSSIA_ISO639_1 ? e = o.Ru : n === CommonDefine_1.GERMANY_ISO639_1 ? e = o.De : n === CommonDefine_1.SPAIN_ISO639_1 ? e = o.Es : n === CommonDefine_1.PORTUGAL_ISO639_1 ? e = o.Pt : n === CommonDefine_1.INDONESIA_ISO639_1 ? e = o.Idn : n === CommonDefine_1.FRANCE_ISO639_1 ? e = o.Fr : n === CommonDefine_1.VIETNAM_ISO639_1 ? e = o.Vi : n === CommonDefine_1.THAILAND_ISO639_1 && (e = o.Th), e) return StringUtils_1.StringUtils.IsEmpty(o.HandleType) || "main_player" !== o.HandleType ? e : this.y$1(e, 1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender())
      }
    }
  }
  static GetI18nPlotAudioMediaName(e) {
    e = I18nResourcesById_1.configI18nResourcesById.GetConfig(e);
    if (void 0 !== e) {
      e = PlotAudioById_1.configPlotAudioById.GetConfig(e.PlotAudioRef);
      if (e) return PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(e)
    }
  }
  static y$1(e, i) {
    return StringUtils_1.StringUtils.IsEmpty(e) ? "" : e.replace(/\{Male:(.*?),Female:(.*?)\}/g, (e, o, n) => i ? o : n)
  }
  static SetRenderComponentTextByTextId(e, o) {
    e && e.IsValid() && e.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o) ?? "")
  }
  static SetI18nBillboardComponentSpriteById(e, o) {
    var o = this.GetI18nPathAtCurrentLanguage(o);
    o && (o = ResourceSystem_1.ResourceSystem.Load(o, UE.Texture2D), e.SetSprite(o))
  }
}
exports.I18nUtils = I18nUtils;
//# sourceMappingURL=I18nUtils.js.map