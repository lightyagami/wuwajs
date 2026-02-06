"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherCentralBottomItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const SkipTaskManager_1 = require("../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../Util/LguiUtil");
class WeatherCentralBottomItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.udf = 0;
    this.cdf = undefined;
    this._df = e => {
      if (e <= 0) {
        this.Svt();
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "WeatherControl_Cooldown", e);
      }
    };
    this.p5t = () => {
      this.cdf?.();
    };
    this.Y8d = () => {
      var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.udf);
      SkipTaskManager_1.SkipTaskManager.Run(7, e.QuestId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIArtText], [2, UE.UIArtText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[3, this.p5t], [6, this.Y8d]];
  }
  SetClickConfirmCallback(e) {
    this.cdf = e;
  }
  RefreshByConfigId(e) {
    this.udf = e;
    this.u3e();
    this.Svt();
    this.beu();
  }
  beu() {
    var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.udf);
    if (e && e.UnlockCondition !== 0) {
      e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(e.UnlockCondition)?.HintText ?? "";
      this.GetText(5)?.ShowTextNew(e);
    }
  }
  Svt() {
    var e;
    var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.udf);
    this.GetItem(4)?.SetUIActive(!t);
    var i = this.GetButton(3);
    i?.RootUIComp.SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.WeatherModel.GetCurrentWeatherSwitchConfigId() === this.udf;
      e = ModelManager_1.ModelManager.WeatherModel.GetRemainCoolDownTime();
      i?.SetSelfInteractive(!t && e <= 0);
      if (e > 0) {
        this._df(e);
      } else {
        this.GetText(8)?.ShowTextNew("WeatherControl_Confirm");
      }
    }
  }
  u3e() {
    var e = ModelManager_1.ModelManager.WeatherModel.IsCurrentTimeInValidTime(this.udf);
    var t = this.GetArtText(1);
    var i = this.GetArtText(2);
    if (e) {
      i?.SetText(this.ddf());
    } else {
      t?.SetText(this.ddf());
      i?.SetText(this.mdf());
    }
    t?.SetUIActive(!e);
    this.GetItem(7)?.SetUIActive(!e);
  }
  ddf() {
    return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
  }
  mdf() {
    return ("0" + this.fdf(this.udf)).slice(-2) + ":00";
  }
  fdf(e) {
    return ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(e).ValidTime[0];
  }
}
exports.WeatherCentralBottomItem = WeatherCentralBottomItem;
//# sourceMappingURL=WeatherCentralBottomItem.js.map