"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WeatherModel_1 = require("./WeatherModel");
const CHANGE_WEATHER_SMOOTH_TIME = 10;
const CHANGE_WEATHER_SMOOTH_TIME_QUICK = 1;
const CHECKGAP = 300;
class WeatherController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    this.P3e();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    this.jko();
    this.R6t();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, WeatherController.nTo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, WeatherController.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, WeatherController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, WeatherController.nTo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, WeatherController.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, WeatherController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  static P3e() {
    WeatherController.Wko = TimerSystem_1.TimerSystem.Forever(WeatherController.Kko, CHECKGAP);
  }
  static R6t() {
    if (WeatherController.Wko !== undefined) {
      TimerSystem_1.TimerSystem.Remove(WeatherController.Wko);
      WeatherController.Wko = undefined;
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(27996, WeatherController.Qko);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27996);
  }
  static jko() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }
  static RequestChangeWeather(e) {
    var t = new Protocol_1.Aki.Protocol.Ods();
    t.pjn = e;
    Net_1.Net.Call(20802, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26386);
      }
    });
  }
  static ChangeCurrentWeather(e, t) {
    if (ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId !== e) {
      ModelManager_1.ModelManager.WeatherModel.SetCurrentWeatherId(e);
      WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e, t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeatherChange);
  }
  static TestChangeWeather(e) {
    ModelManager_1.ModelManager.WeatherModel.SetCurrentWeatherId(e);
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(e, CHANGE_WEATHER_SMOOTH_TIME);
  }
  static StopWeather() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }
  static BanWeather() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().BanWeather();
  }
}
exports.WeatherController = WeatherController;
(_a = WeatherController).Wko = undefined;
WeatherController.Kko = () => {
  WeatherModel_1.WeatherModel.GetWorldWeatherActor().SetActorState(!GlobalData_1.GlobalData.IsUiSceneOpen);
};
WeatherController.nTo = () => {};
WeatherController.SYi = () => {
  WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
};
WeatherController.nye = () => {
  _a.Xko();
};
WeatherController.Ilt = () => {
  _a.Xko();
};
WeatherController.Xko = () => {
  if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId !== 0) {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().ChangeWeather(ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId, 0);
  }
};
WeatherController.Qko = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Weather", 27, "OnWeatherNotify", ["WeatherNotify", e]);
  }
  if (e.kDs) {
    WeatherController.ChangeCurrentWeather(e.pjn, CHANGE_WEATHER_SMOOTH_TIME_QUICK);
  } else {
    WeatherController.ChangeCurrentWeather(e.pjn, CHANGE_WEATHER_SMOOTH_TIME);
  }
}; //# sourceMappingURL=WeatherController.js.map