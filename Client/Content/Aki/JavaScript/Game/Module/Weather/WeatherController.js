"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, WeatherController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, WeatherController.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, WeatherController.UTf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, WeatherController.nTo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, WeatherController.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, WeatherController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, WeatherController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, WeatherController.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, WeatherController.UTf);
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
    Net_1.Net.Register(27691, WeatherController.Qko);
    Net_1.Net.Register(15238, e => {
      WeatherController.xTf(e._1f);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27691);
    Net_1.Net.UnRegister(15238);
  }
  static jko() {
    WeatherModel_1.WeatherModel.GetWorldWeatherActor().Destroy();
  }
  static RequestChangeWeather(e) {
    var t = new Protocol_1.Aki.Protocol.Ods();
    t.pjn = e;
    Net_1.Net.Call(27563, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27735);
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
  static TryOpenWeatherCentralMainView(t) {
    if (ControllerHolder_1.ControllerHolder.TimeOfDayController.CanOpenView("TimeOfDayView")) {
      ControllerHolder_1.ControllerHolder.WeatherController.RequestWeatherControlInfoAsync().then(e => {
        if (e) {
          UiManager_1.UiManager.OpenView("WeatherCentralMainView", t);
        }
      });
    }
  }
  static async RequestWeatherControlInfoAsync() {
    var e;
    var t = new Protocol_1.Aki.Protocol.a1f();
    var t = await Net_1.Net.CallAsync(26951, t);
    return t !== undefined && !(t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_WeatherCtlAreaDateLocked ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeatherControl_DateOccupied"), 1) : t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_WeatherCtlAreaWeatherLocked ? (e = MathUtils_1.MathUtils.LongToBigInt(t.w5n), e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e), e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId), e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeatherControl_Occupied", e), 1) : t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28804, undefined, true, false), 1) : (ModelManager_1.ModelManager.WeatherModel?.SetUnlockedWeatherSwitchConfigIdList(t.l1f), 0));
  }
  static async RequestWeatherControlInfoWithoutCheckAsync() {
    var e = new Protocol_1.Aki.Protocol.XNf();
    var e = await Net_1.Net.CallAsync(20383, e);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Weather", 90, "天气控制器请求初始数据失败！！！");
      }
      return false;
    } else {
      ModelManager_1.ModelManager.WeatherModel?.SetUnlockedWeatherSwitchConfigIdList(e.l1f);
      return true;
    }
  }
  static async RequestSwitchWeather(e) {
    var t = new Protocol_1.Aki.Protocol.n1f();
    t._1f = e;
    var e = await Net_1.Net.CallAsync(21668, t);
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20219);
    }
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
};
WeatherController.RQe = (e, t) => {
  if (t && e === 10133) {
    UiManager_1.UiManager.OpenView("WeatherUnlockTips");
    ControllerHolder_1.ControllerHolder.WeatherController.RequestWeatherControlInfoWithoutCheckAsync();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
};
WeatherController.UTf = (e, t) => {
  if (t && e === 10133) {
    ControllerHolder_1.ControllerHolder.WeatherController.RequestWeatherControlInfoWithoutCheckAsync();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
};
WeatherController.xTf = e => {
  ModelManager_1.ModelManager.WeatherModel.AddUnlockedWeatherSwitchConfigId(e);
};
WeatherController.FWe = () => {
  var e = ModelManager_1.ModelManager.WeatherModel.TargetWeatherSwitchConfigId;
  if (e !== undefined) {
    _a.TryOpenWeatherCentralMainView(e);
  }
}; //# sourceMappingURL=WeatherController.js.map