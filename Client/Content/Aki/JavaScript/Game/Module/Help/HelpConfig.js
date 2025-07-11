"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpConfig = undefined;
const HelpTextByGroupId_1 = require("../../../Core/Define/ConfigQuery/HelpTextByGroupId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class HelpConfig extends ConfigBase_1.ConfigBase {
  GetHelpContentInfoByGroupId(e) {
    return HelpTextByGroupId_1.configHelpTextByGroupId.GetConfigList(e);
  }
  IsGroupIdValid(e) {
    e = HelpTextByGroupId_1.configHelpTextByGroupId.GetConfigList(e);
    return e !== undefined && e.length > 0;
  }
}
exports.HelpConfig = HelpConfig;
//# sourceMappingURL=HelpConfig.js.map