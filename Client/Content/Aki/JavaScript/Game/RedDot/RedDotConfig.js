"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotConfig = undefined;
const RedDotByRelativeName_1 = require("../../Core/Define/ConfigQuery/RedDotByRelativeName");
const ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class RedDotConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  GetRelativeNameMap() {
    var e = new Map();
    for (const o of RedDotByRelativeName_1.configRedDotByRelativeName.GetConfigList()) {
      e.set(o.Name, o.RelativeName);
    }
    return e;
  }
}
exports.RedDotConfig = RedDotConfig;
//# sourceMappingURL=RedDotConfig.js.map