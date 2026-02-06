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
    this.hdf = new Set();
    this.YPf = undefined;
    this.ftg = undefined;
    this.Zag = undefined;
    this.LastSwitchTime = 0;
    this.TimeSwitchConfirmNeedShow = true;
    this.gUf = undefined;
    this.gtg = undefined;
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
  get zPf() {
    if (this.YPf === undefined) {
      this.YPf = new Set();
      for (const e of LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeatherCentralClicked) ?? []) {
        this.YPf.add(e);
      }
    }
    return this.YPf;
  }
  GetSwitchConfigIdByWeatherId(e) {
    if (this.ftg === undefined) {
      this.ftg = new Map();
      for (const t of ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfigAll()) {
        t.Weather.forEach(e => {
          this.ftg.set(e, t.Id);
        });
      }
    }
    return this.ftg.get(e) ?? 0;
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
    if (this.Zag === undefined) {
      this.Zag = new Set();
      for (const t of ObservatoryAll_1.configObservatoryAll.GetConfigList()) {
        this.Zag.add(t.AreaId);
      }
    }
    return this.Zag.has(e);
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
    this.hdf.clear();
    for (const t of e) {
      this.hdf.add(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
  AddUnlockedWeatherSwitchConfigId(e) {
    this.hdf.add(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate);
  }
  IsWeatherSwitchConfigUnlocked(e) {
    return this.hdf.has(e);
  }
  HasAnyNewWeather() {
    var e = this.hdf?.size ?? 0;
    return this.zPf.size < e;
  }
  IsWeatherClicked(e) {
    return this.zPf.has(e);
  }
  RecordWeatherClicked(e) {
    this.zPf.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.WeatherCentralClicked, [...this.zPf.values()]);
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
    if (this.gUf === undefined) {
      this.gUf = new ObservatoryModule_1.ObservatoryModule();
    }
    return this.gUf;
  }
  get TargetWeatherSwitchConfigId() {
    var e;
    if (this.gtg !== undefined) {
      e = this.gtg;
      this.gtg = undefined;
      return e;
    }
  }
  SetTargetWeatherSwitchConfigId(e) {
    this.gtg = e;
  }
}
(exports.WeatherModel = WeatherModel).$ko = new WeatherActor_1.WeatherActor();
//# sourceMappingURL=WeatherModel.js.map