"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTextUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const ModelManager_1 = require("../Manager/ModelManager");
class RichTextUtils {
  static Vih(t) {
    var e = {};
    for (RichTextUtils.GDu.lastIndex = 0; (r = RichTextUtils.GDu.exec(t)) !== null;) {
      var i = r[1];
      var r = r[2];
      e[i] = r;
    }
    return e;
  }
  static Initialize() {
    UE.UIText.SetTsGameRichTextDelegate((0, puerts_1.toManualReleaseDelegate)(RichTextUtils.hVa));
  }
  static Destroy() {
    UE.UIText.SetTsGameRichTextDelegate(undefined);
    (0, puerts_1.releaseManualReleaseDelegate)(RichTextUtils.hVa);
  }
}
(exports.RichTextUtils = RichTextUtils).GDu = /([^\s=]+)=([^=]*?)(?=\s+[^\s=]+=|\s*$)/g;
RichTextUtils.lVa = () => ModelManager_1.ModelManager.PlayerInfoModel?.GetAccountName() ?? "";
RichTextUtils._Va = () => {
  var t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
  if (t === 1) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_He_Text");
  } else if (t === 0) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_She_Text");
  } else {
    return "";
  }
};
RichTextUtils.uVa = t => {
  var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
  if (e === 1) {
    return t.Get(0);
  } else if (e === 0) {
    return t.Get(1);
  } else {
    return "";
  }
};
RichTextUtils.Hih = t => {
  t = t.Get(0);
  t = RichTextUtils.Vih(t);
  if (Info_1.Info.IsInTouch()) {
    if (StringUtils_1.StringUtils.IsBlank(t.Touch)) {
      return "TouchParamError";
    } else {
      return t.Touch;
    }
  } else if (Info_1.Info.IsInGamepad()) {
    if (StringUtils_1.StringUtils.IsBlank(t.Gamepad)) {
      return "GamepadParamError";
    } else {
      return t.Gamepad;
    }
  } else if (StringUtils_1.StringUtils.IsBlank(t.PC)) {
    return "PCParamError";
  } else {
    return t.PC;
  }
};
RichTextUtils.jih = t => {
  var e;
  if (t.IsValidIndex(1)) {
    e = t.Get(0);
    t = Number(t.Get(1));
    if ((e = RichTextUtils.Vih(e)).T && t > 2) {
      return e.T;
    } else if (t > 1) {
      return e.P;
    } else {
      return e.S;
    }
  } else {
    return "ParamError";
  }
};
RichTextUtils.CR1 = t => {
  t = t.Get(0);
  t = RichTextUtils.Vih(t);
  if (t.VarType === "Global") {
    t = ModelManager_1.ModelManager.WorldModel?.GetWorldStateGeneric(t.Key);
    if (t) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    }
  }
  return "";
};
RichTextUtils.cVa = {
  PlayerName: RichTextUtils.lVa,
  TA: RichTextUtils._Va,
  SexShowName: RichTextUtils.uVa,
  Ipt: RichTextUtils.Hih,
  Sap: RichTextUtils.jih,
  Var: RichTextUtils.CR1
};
RichTextUtils.hVa = (t, e) => {
  var i = RichTextUtils.cVa[t];
  if (i) {
    return i(e);
  } else {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TextUtil", 10, "找不到对应的富文本方法", ["RichType", t]);
    }
    return "NoFunc";
  }
}; //# sourceMappingURL=RichTextUtils.js.map