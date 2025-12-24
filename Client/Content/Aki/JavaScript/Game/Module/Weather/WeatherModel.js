"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ObservatoryAll_1 = require("../../../Core/Define/ConfigQuery/ObservatoryAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ObservatoryModule_1 = require("./ObservatoryModule");
const WeatherActor_1 = require("./WeatherActor");
class WeatherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Oto = 0;
    this._uf = new Set();
    this.BTf = undefined;
    this.rHf = undefined;
    this.rKf = undefined;
    this.LastSwitchTime = 0;
    this.TimeSwitchConfirmNeedShow = true;
    this.ywf = undefined;
    this.oHf = undefined;
  }
  get CurrentWeatherId() {
    return this.Oto;
  }
  GetCurrentWeatherType() {
    if (this.Oto === 0) {
      return 0;
    } else {
      return ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherType(this.Oto);
    }
  }
  SetCurrentWeatherId(e) {
    this.Oto = e;
  }
  static GetWorldWeatherActor() {
    return this.$ko;
  }
  get kTf() {
    if (this.BTf === undefined) {
      this.BTf = new Set();
      for (const e of LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeatherCentralClicked) ?? []) {
        this.BTf.add(e);
      }
    }
    return this.BTf;
  }
  GetSwitchConfigIdByWeatherId(e) {
    if (this.rHf === undefined) {
      this.rHf = new Map();
      for (const t of ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfigAll()) {
        t.Weather.forEach(e => {
          this.rHf.set(e, t.Id);
        });
      }
    }
    return this.rHf.get(e) ?? 0;
  }
  GetCurrentWeatherSwitchConfigId() {
    var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    if (this.IsInValidArea(e)) {
      return this.GetSwitchConfigIdByWeatherId(this.CurrentWeatherId);
    } else {
      return 0;
    }
  }
  IsInValidArea(e) {
    if (this.rKf === undefined) {
      this.rKf = new Set();
      for (const t of ObservatoryAll_1.configObservatoryAll.GetConfigList()) {
        this.rKf.add(t.AreaId);
      }
    }
    return this.rKf.has(e);
  }
  IsWeatherBanArea(e, t) {
    e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(e);
    return !!e && e.BanAreaList.includes(t);
  }
  IsCurrentTimeInValidTime(e) {
    var t = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour;
    var [e, r] = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(e).ValidTime;
    if (e <= r) {
      return e <= t && t <= r;
    } else {
      return e <= t || t <= r;
    }
  }
  GetAccelerateWeatherTime(e) {
    if (this.IsCurrentTimeInValidTime(e)) {
      return 0;
    }
    var t = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour;
    var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(e).ValidTime[0];
    let r = e - t;
    if (r < 0) {
      r += CommonDefine_1.HOUR_PER_DAY;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Weather", 90, "当前小时:" + t + " 目标小时:" + e + " 相差小时数:" + r);
    }
    return r * CommonDefine_1.SECOND_PER_HOUR;
  }
  SetUnlockedWeatherSwitchConfigIdList(e) {
    this._uf.clear();
    for (const t of e) {
      this._uf.add(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
  AddUnlockedWeatherSwitchConfigId(e) {
    this._uf.add(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
  IsWeatherSwitchConfigUnlocked(e) {
    return this._uf.has(e);
  }
  HasAnyNewWeather() {
    var e = this._uf?.size ?? 0;
    return this.kTf.size < e;
  }
  IsWeatherClicked(e) {
    return this.kTf.has(e);
  }
  RecordWeatherClicked(e) {
    this.kTf.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeatherCentralClicked, [...this.kTf.values()]);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
  RecordSwitchTime() {
    this.LastSwitchTime = Time_1.Time.WorldTime;
  }
  GetRemainCoolDownTime() {
    var e = (Time_1.Time.WorldTime - this.LastSwitchTime) * CommonDefine_1.SECOND_PER_MILLIONSECOND;
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("WeatherControlCoolDown");
    return Math.ceil(t - e);
  }
  CanSwitchWeather() {
    return this.GetRemainCoolDownTime() <= 0;
  }
  get ObservatoryModule() {
    if (this.ywf === undefined) {
      this.ywf = new ObservatoryModule_1.ObservatoryModule();
    }
    return this.ywf;
  }
  get TargetWeatherSwitchConfigId() {
    var e;
    if (this.oHf !== undefined) {
      e = this.oHf;
      this.oHf = undefined;
      return e;
    }
  }
  SetTargetWeatherSwitchConfigId(e) {
    this.oHf = e;
  }
}
(exports.WeatherModel = WeatherModel).$ko = new WeatherActor_1.WeatherActor();
//# sourceMappingURL=WeatherModel.js.map