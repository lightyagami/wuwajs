"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSettingsConfig = undefined;
const DeviceRenderFeatureByDeviceId_1 = require("../../Core/Define/ConfigQuery/DeviceRenderFeatureByDeviceId");
const ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class GameSettingsConfig extends ConfigBase_1.ConfigBase {
  GetDeviceRenderFeatureConfigListByDeviceId(e) {
    return DeviceRenderFeatureByDeviceId_1.configDeviceRenderFeatureByDeviceId.GetConfigList(e);
  }
}
exports.GameSettingsConfig = GameSettingsConfig;
//# sourceMappingURL=GameSettingsConfig.js.map