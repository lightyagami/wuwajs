"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorCheckWeather = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckWeather extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments);
    this.dIe = () => {
      var e = this.CheckCondition(1);
      this.NotifyEventBasedCondition(e);
    };
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeatherChange, this.dIe);
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeatherChange, this.dIe);
  }
  CheckCondition(e) {
    var t;
    var r = this.Params;
    return !!r && !!(t = ModelManager_1.ModelManager.WeatherModel) && (t = t.CurrentWeatherId, t = r.WeatherId === t, r.Compare === "Eq" ? t : !t);
  }
}
exports.LevelAiDecoratorCheckWeather = LevelAiDecoratorCheckWeather;
//# sourceMappingURL=LevelAiDecoratorCheckWeather.js.map