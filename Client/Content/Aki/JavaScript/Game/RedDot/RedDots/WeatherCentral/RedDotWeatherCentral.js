"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotWeatherCentral = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotWeatherCentral extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionMap";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.WeatherModel.HasAnyNewWeather();
  }
}
exports.RedDotWeatherCentral = RedDotWeatherCentral;
//# sourceMappingURL=RedDotWeatherCentral.js.map