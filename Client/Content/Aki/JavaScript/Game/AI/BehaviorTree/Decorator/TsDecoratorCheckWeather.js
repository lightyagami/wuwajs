"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorCheckWeather extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckWeatherState = 0;
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var s = ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType();
    let t = false;
    if (s !== undefined) {
      switch (s) {
        case 1:
          t = this.CheckWeatherState === 0;
          break;
        case 2:
          t = this.CheckWeatherState === 3;
          break;
        case 3:
          t = this.CheckWeatherState === 1;
          break;
        case 4:
          t = this.CheckWeatherState === 2;
          break;
        case 5:
          t = this.CheckWeatherState === 4;
      }
    }
    return t;
  }
}
exports.default = TsDecoratorCheckWeather;
//# sourceMappingURL=TsDecoratorCheckWeather.js.map