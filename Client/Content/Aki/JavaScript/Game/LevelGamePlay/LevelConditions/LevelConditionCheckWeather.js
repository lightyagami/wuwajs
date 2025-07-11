"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckWeather = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckWeather extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var a;
    return !!e && (e = e, !!(a = ModelManager_1.ModelManager.WeatherModel)) && (a = a.CurrentWeatherId, a = e.WeatherId === a, e.Compare === "Eq" ? a : !a);
  }
}
exports.LevelConditionCheckWeather = LevelConditionCheckWeather;
//# sourceMappingURL=LevelConditionCheckWeather.js.map