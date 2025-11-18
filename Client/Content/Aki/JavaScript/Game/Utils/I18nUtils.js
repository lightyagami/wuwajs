"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nUtils = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const I18nResourcesById_1 = require("../../Core/Define/ConfigQuery/I18nResourcesById");
const I18nTexturesById_1 = require("../../Core/Define/ConfigQuery/I18nTexturesById");
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const PlotAudioById_1 = require("../../Core/Define/ConfigQuery/PlotAudioById");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const ModelManager_1 = require("../Manager/ModelManager");
const PlotAudioModel_1 = require("../Module/Plot/PlotAudioModel");
class I18nUtils {
  static GetI18nPathAtCurrentLanguage(o) {
    o = I18nResourcesById_1.configI18nResourcesById.GetConfig(o);
    if (o !== undefined) {
      o = I18nTexturesById_1.configI18nTexturesById.GetConfig(o.TextureRef);
      if (o !== undefined) {
        let e = undefined;
        var n = LanguageSystem_1.LanguageSystem.PackageLanguage;
        if (n === CommonDefine_1.CHS) {
          e = o.ZhHans;
        } else if (n === CommonDefine_1.CHT) {
          e = o.ZhHant;
        } else if (n === CommonDefine_1.ENGLISH_ISO639_1) {
          e = o.En;
        } else if (n === CommonDefine_1.JAPANESE_ISO639_1) {
          e = o.Ja;
        } else if (n === CommonDefine_1.KOREAN_ISO639_1) {
          e = o.Ko;
        } else if (n === CommonDefine_1.RUSSIA_ISO639_1) {
          e = o.Ru;
        } else if (n === CommonDefine_1.GERMANY_ISO639_1) {
          e = o.De;
        } else if (n === CommonDefine_1.SPAIN_ISO639_1) {
          e = o.Es;
        } else if (n === CommonDefine_1.PORTUGAL_ISO639_1) {
          e = o.Pt;
        } else if (n === CommonDefine_1.INDONESIA_ISO639_1) {
          e = o.Idn;
        } else if (n === CommonDefine_1.FRANCE_ISO639_1) {
          e = o.Fr;
        } else if (n === CommonDefine_1.VIETNAM_ISO639_1) {
          e = o.Vi;
        } else if (n === CommonDefine_1.THAILAND_ISO639_1) {
          e = o.Th;
        }
        if (e) {
          if (!StringUtils_1.StringUtils.IsEmpty(o.HandleType)) {
            if (o.HandleType === "main_player") {
              return this.rW1(e, ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1);
            }
            if (o.HandleType === "main_player_new") {
              return this.YGd(e, ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1);
            }
          }
          return e;
        }
      }
    }
  }
  static GetI18nPlotAudioMediaName(e) {
    e = I18nResourcesById_1.configI18nResourcesById.GetConfig(e);
    if (e !== undefined) {
      e = PlotAudioById_1.configPlotAudioById.GetConfig(e.PlotAudioRef);
      if (e) {
        return PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(e);
      }
    }
  }
  static rW1(e, i) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      return "";
    } else {
      return e.replace(/\{Male:(.*?),Female:(.*?)\}/g, (e, o, n) => i ? o : n);
    }
  }
  static YGd(e, o) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      return "";
    } else {
      e = /\{Male:(?<quote1>['"])(?<maleText>.*?)\1,Female:(?<quote2>['"])(?<femaleText>.*?)\3\}/g.exec(e);
      return (o ? e?.groups?.maleText : e?.groups?.femaleText) ?? "";
    }
  }
  static SetRenderComponentTextByTextId(e, o) {
    if (e && e.IsValid()) {
      e.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o) ?? "");
    }
  }
  static SetI18nBillboardComponentSpriteById(e, o) {
    var o = this.GetI18nPathAtCurrentLanguage(o);
    if (o) {
      o = ResourceSystem_1.ResourceSystem.Load(o, UE.Texture2D, "Ui.PlotUi");
      e.SetSprite(o);
    }
  }
}
exports.I18nUtils = I18nUtils;
//# sourceMappingURL=I18nUtils.js.map