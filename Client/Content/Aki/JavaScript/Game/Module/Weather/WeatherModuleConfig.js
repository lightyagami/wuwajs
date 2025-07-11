"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherModuleConfig = undefined;
const WeatherById_1 = require("../../../Core/Define/ConfigQuery/WeatherById");
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
}
exports.WeatherModuleConfig = WeatherModuleConfig;
//# sourceMappingURL=WeatherModuleConfig.js.map