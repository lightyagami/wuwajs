"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GenderTextByMaleText_1 = require("../../../Core/Define/ConfigQuery/GenderTextByMaleText");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TextById_1 = require("../../../Core/Define/ConfigQuery/TextById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class TextConfig extends ConfigBase_1.ConfigBase {
  GetTextById(e) {
    e = this.GetTextContentIdById(e);
    if (e) {
      return this.GetMultiTextByKey(e);
    }
  }
  GetTextContentIdById(e) {
    var t = TextById_1.configTextById.GetConfig(e)?.TextContent ?? undefined;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TextUtil", 16, "Text表查找不到Id = ", ["id", e]);
      }
    }
    return t;
  }
  GetGenderTextById(e, t) {
    var r = GenderTextByMaleText_1.configGenderTextByMaleText.GetConfig(e);
    if (r) {
      if (t) {
        return r.MaleText;
      } else {
        return r.FemaleText;
      }
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TextUtil", 35, "GenderText表查找不到Id = ", ["id", e]);
    }
  }
  GetMultiTextByKey(e, t) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? t;
  }
  GetMultiText(e, ...t) {
    e = this.GetMultiTextByKey(e);
    if (e) {
      return StringUtils_1.StringUtils.Format(e, ...t);
    } else {
      return "";
    }
  }
}
exports.TextConfig = TextConfig;
//# sourceMappingURL=TextConfig.js.map