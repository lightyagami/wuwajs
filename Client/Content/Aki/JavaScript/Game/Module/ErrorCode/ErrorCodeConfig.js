"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCodeConfig = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class ErrorCodeConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Q5t = 1;
  }
  SetForceShowDebugErrorType(r) {
    this.Q5t = r;
  }
  GetConfigByCode(r) {
    var e = ErrorCodeById_1.configErrorCodeById.GetConfig(r);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ErrorCode", 8, "没有错误码配置", ["code", r]);
      }
    }
    return e;
  }
  GetTextByErrorId(r) {
    r = this.GetConfigByCode(r);
    if (r) {
      if (StringUtils_1.StringUtils.IsEmpty(r.Text)) {
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnknownErrorCodeText");
      } else {
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Text) ?? "";
      }
    } else {
      return "";
    }
  }
  GetTextKeyByErrorId(r) {
    r = this.GetConfigByCode(r);
    if (r) {
      if (StringUtils_1.StringUtils.IsEmpty(r.Text)) {
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("UnknownErrorCodeText");
      } else {
        return r.Text;
      }
    } else {
      return "";
    }
  }
  IsTipsOnly(r) {
    return this.GetConfigByCode(r)?.IsTip ?? false;
  }
}
exports.ErrorCodeConfig = ErrorCodeConfig;
//# sourceMappingURL=ErrorCodeConfig.js.map