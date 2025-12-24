"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherModuleConfig = undefined;
const WeatherById_1 = require("../../../Core/Define/ConfigQuery/WeatherById");
const WeatherSwitchAll_1 = require("../../../Core/Define/ConfigQuery/WeatherSwitchAll");
const WeatherSwitchById_1 = require("../../../Core/Define/ConfigQuery/WeatherSwitchById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeatherModuleConfig extends ConfigBase_1.ConfigBase {
  GetWeatherConfig(e) {
    e = WeatherById_1.configWeatherById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetWeatherType(e) {
    e = WeatherById_1.configWeatherById.GetConfig(e);
    if (e) {
      return e.WeatherType;
    } else {
      return 0;
    }
  }
  GetWeatherSwitchConfig(e) {
    e = WeatherSwitchById_1.configWeatherSwitchById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetWeatherSwitchConfigAll() {
    return WeatherSwitchAll_1.configWeatherSwitchAll.GetConfigList();
  }
}
exports.WeatherModuleConfig = WeatherModuleConfig;
//# sourceMappingURL=WeatherModuleConfig.js.map