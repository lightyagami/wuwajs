"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyConfig = undefined;
const OpenAndCloseViewHotKeyAll_1 = require("../../../Core/Define/ConfigQuery/OpenAndCloseViewHotKeyAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ViewHotKeyConfig extends ConfigBase_1.ConfigBase {
  GetAllOpenAndCloseViewHotKeyConfig() {
    return OpenAndCloseViewHotKeyAll_1.configOpenAndCloseViewHotKeyAll.GetConfigList();
  }
}
exports.ViewHotKeyConfig = ViewHotKeyConfig;
//# sourceMappingURL=ViewHotKeyConfig.js.map