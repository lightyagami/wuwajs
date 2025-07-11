"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiTextTranslationUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../Common/Log");
const ConfigDefine_1 = require("../Define/ConfigDefine");
const MultiTextLang_1 = require("../Define/ConfigQuery/MultiTextLang");
const PrefabRichTextDataById_1 = require("../Define/ConfigQuery/PrefabRichTextDataById");
const PrefabTextItemByItemId_1 = require("../Define/ConfigQuery/PrefabTextItemByItemId");
const Macro_1 = require("../Preprocessor/Macro");
class UiTextTranslationUtils {
  static Kz(e) {
    if (e.overflowType === 1) {
      e.bBestFit = true;
    }
  }
  static Xlc(e, t) {
    var i = PrefabRichTextDataById_1.configPrefabRichTextDataById.GetConfig(e);
    if (i) {
      if (i.IsIncludeGameText) {
        t.SetGameRichText(true);
        t.SetRichText(true);
      } else if (i.IsIncludeRichText) {
        t.SetRichText(true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TextLanguageSearch", 10, "查询富文本信息异常", ["文本id", e]);
    }
  }
  static Initialize() {
    UE.UIText.SetTextTranslateDelegate((0, puerts_1.toManualReleaseDelegate)(UiTextTranslationUtils.TranslateText));
    UE.UIText.SetLocalTextDelegate((0, puerts_1.toManualReleaseDelegate)(UiTextTranslationUtils.iIr));
    UE.UIText.SetLocalTextNewDelegate((0, puerts_1.toManualReleaseDelegate)(UiTextTranslationUtils.Ylc));
  }
  static Destroy() {
    UE.UIText.SetTextTranslateDelegate(undefined);
    UE.UIText.SetLocalTextDelegate(undefined);
    UE.UIText.SetLocalTextNewDelegate(undefined);
    (0, puerts_1.releaseManualReleaseDelegate)(UiTextTranslationUtils.TranslateText);
    (0, puerts_1.releaseManualReleaseDelegate)(UiTextTranslationUtils.iIr);
    (0, puerts_1.releaseManualReleaseDelegate)(UiTextTranslationUtils.Ylc);
  }
}
exports.UiTextTranslationUtils = UiTextTranslationUtils;
(_a = UiTextTranslationUtils).AkiFontData = undefined;
UiTextTranslationUtils.TranslateText = t => {
  if (t.TranslateId) {
    let e = undefined;
    if (e = t.TranslateId !== 0 ? PrefabTextItemByItemId_1.configPrefabTextItemByItemId.GetConfig(BigInt(t.TranslateId)) : e) {
      UiTextTranslationUtils.Kz(t);
      t.ShowTextNew(e.Text);
    }
  } else {
    t.text = "";
  }
};
UiTextTranslationUtils.iIr = (e, t, i) => {
  let a = undefined;
  a = (0, ConfigDefine_1.getLangInterface)(e)?.GetLocalText(t);
  if (i) {
    if (a === undefined && (a = i.GetText(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("TextLanguageSearch", 10, "[GetLocalText]配置表文本获取失败，文本控件显示自身文本", ["控件Id", i.TranslateId], ["控件自身文本", a]);
    }
    if (a !== i.GetText()) {
      UiTextTranslationUtils.Kz(i);
    }
  } else if (a === undefined && Log_1.Log.CheckError()) {
    Log_1.Log.Error("TextLanguageSearch", 10, "[GetLocalText]格式化字符串传入的表名与文本id无效", ["表名", e], ["文本id", t]);
  }
  return a;
};
UiTextTranslationUtils.TextShowTranslateId = false;
UiTextTranslationUtils.Ylc = (e, t, i) => {
  if (_a.TextShowTranslateId) {
    return t.TranslateId.toString();
  }
  _a.Xlc(e, t);
  let a = undefined;
  a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  if (i) {
    if (a === undefined && (a = t.GetText(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("TextLanguageSearch", 10, "[GetLocalTextNew]预制体固定文本多语言切换失败，该文本控件Id还没有收集到，将显示预制体上的文本", ["控件Id", t.TranslateId], ["控件自身文本", a]);
    }
    if (a !== t.GetText()) {
      UiTextTranslationUtils.Kz(t);
    }
  } else if (a === undefined && Log_1.Log.CheckError()) {
    Log_1.Log.Error("TextLanguageSearch", 10, "[GetLocalTextNew]格式化字符串传入的表名与文本id无效", ["文本id", e]);
  }
  return a;
};
UiTextTranslationUtils.GmReplaceText = e => {
  if (_a.AkiFontData) {
    e.SetFont(_a.AkiFontData);
  }
}; //# sourceMappingURL=UiTextTranslationUtils.js.map