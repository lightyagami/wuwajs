"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const DAY_MINITE_START = 360;
const DAY_MINITE_END = 1080;
class TsDecoratorCheckDayWeather extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckDayState = 0;
    this.CheckWeatherState = 0;
    this.ConditionType = 0;
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var t = ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType();
    let o = false;
    o = this.CheckDayState === 0 ? ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(DAY_MINITE_START, DAY_MINITE_END) : !ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(DAY_MINITE_START, DAY_MINITE_END);
    let s = false;
    if (t !== undefined) {
      switch (t) {
        case 1:
          s = this.CheckWeatherState === 0;
          break;
        case 2:
          s = this.CheckWeatherState === 3;
          break;
        case 3:
          s = this.CheckWeatherState === 1;
          break;
        case 4:
          s = this.CheckWeatherState === 2;
          break;
        case 5:
          s = this.CheckWeatherState === 4;
      }
    }
    if (this.ConditionType === 0) {
      return o && s;
    } else {
      return o || s;
    }
  }
}
exports.default = TsDecoratorCheckDayWeather;
//# sourceMappingURL=TsDecoratorCheckDayWeather.js.map