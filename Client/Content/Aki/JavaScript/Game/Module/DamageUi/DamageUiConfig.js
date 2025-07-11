"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageUiConfig = undefined;
const DamageTextAll_1 = require("../../../Core/Define/ConfigQuery/DamageTextAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DamageUiConfig extends ConfigBase_1.ConfigBase {
  GetAllDamageTextConfig() {
    return DamageTextAll_1.configDamageTextAll.GetConfigList();
  }
}
exports.DamageUiConfig = DamageUiConfig;
//# sourceMappingURL=DamageUiConfig.js.map