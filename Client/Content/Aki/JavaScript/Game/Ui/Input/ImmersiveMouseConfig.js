"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmersiveMouseConfig = undefined;
const ImmersiveMouseAll_1 = require("../../../Core/Define/ConfigQuery/ImmersiveMouseAll");
const ImmersiveMouseByViewName_1 = require("../../../Core/Define/ConfigQuery/ImmersiveMouseByViewName");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ImmersiveMouseConfig extends ConfigBase_1.ConfigBase {
  GetAllImmersiveMouseViewConfig() {
    return ImmersiveMouseAll_1.configImmersiveMouseAll.GetConfigList();
  }
  GetImmersiveMouseViewConfigByViewName(e) {
    return ImmersiveMouseByViewName_1.configImmersiveMouseByViewName.GetConfig(e);
  }
}
exports.ImmersiveMouseConfig = ImmersiveMouseConfig;
//# sourceMappingURL=ImmersiveMouseConfig.js.map