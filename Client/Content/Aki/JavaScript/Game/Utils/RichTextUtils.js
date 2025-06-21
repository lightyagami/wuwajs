"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RichTextUtils = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../Manager/ModelManager");
class RichTextUtils {
  static Vih(t) {
    t = t.split(" ");
    const r = {};
    return t.forEach(t => {
      var [t, e] = t.split("=");
      r[t] = e
    }), r
  }
  static Initialize() {
    UE.UIText.SetTsGameRichTextDelegate((0, puerts_1.toManualReleaseDelegate)(RichTextUtils.hVa))
  }
  static Destroy() {
    UE.UIText.SetTsGameRichTextDelegate(void 0), (0, puerts_1.releaseManualReleaseDelegate)(RichTextUtils.hVa)
  }
}(exports.RichTextUtils = RichTextUtils).lVa = () => ModelManager_1.ModelManager.PlayerInfoModel?.GetAccountName() ?? "", RichTextUtils._Va = () => {
  var t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
  return 1 === t ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_He_Text") : 0 === t ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_She_Text") : ""
}, RichTextUtils.uVa = t => {
  var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
  return 1 === e ? t.Get(0) : 0 === e ? t.Get(1) : ""
}, RichTextUtils.Hih = t => {
  t = t.Get(0), t = RichTextUtils.Vih(t);
  return Info_1.Info.IsInTouch() ? StringUtils_1.StringUtils.IsBlank(t.Touch) ? "TouchParamError" : t.Touch : Info_1.Info.IsInGamepad() ? StringUtils_1.StringUtils.IsBlank(t.Gamepad) ? "GamepadParamError" : t.Gamepad : StringUtils_1.StringUtils.IsBlank(t.PC) ? "PCParamError" : t.PC
}, RichTextUtils.jih = t => {
  var e;
  return t.IsValidIndex(1) ? (e = t.Get(0), t = Number(t.Get(1)), e = RichTextUtils.Vih(e), 1 < t ? e.P : e.S) : "ParamError"
}, RichTextUtils.$b1 = t => {
  t = t.Get(0), t = RichTextUtils.Vih(t);
  if ("Global" === t.VarType) {
    t = ModelManager_1.ModelManager.WorldModel?.GetWorldStateGeneric(t.Key);
    if (t) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
  }
  return ""
}, RichTextUtils.cVa = {
  PlayerName: RichTextUtils.lVa,
  TA: RichTextUtils._Va,
  SexShowName: RichTextUtils.uVa,
  Ipt: RichTextUtils.Hih,
  Sap: RichTextUtils.jih,
  Var: RichTextUtils.$b1
}, RichTextUtils.hVa = (t, e) => {
  var r = RichTextUtils.cVa[t];
  return r ? r(e) : (Log_1.Log.CheckError() && Log_1.Log.Error("TextUtil", 10, "找不到对应的富文本方法", ["RichType", t]), "NoFunc")
};
//# sourceMappingURL=RichTextUtils.js.map