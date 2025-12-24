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
    this.duf = 0;
    this.muf = undefined;
    this.cuf = e => {
      if (e <= 0) {
        this.Svt();
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "WeatherControl_Cooldown", e);
      }
    };
    this.p5t = () => {
      this.muf?.();
    };
    this.Y8d = () => {
      var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.duf);
      SkipTaskManager_1.SkipTaskManager.Run(7, e.QuestId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIArtText], [2, UE.UIArtText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[3, this.p5t], [6, this.Y8d]];
  }
  SetClickConfirmCallback(e) {
    this.muf = e;
  }
  RefreshByConfigId(e) {
    this.duf = e;
    this.u3e();
    this.Svt();
    this.beu();
  }
  beu() {
    var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.duf);
    if (e && e.UnlockCondition !== 0) {
      e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(e.UnlockCondition)?.HintText ?? "";
      this.GetText(5)?.ShowTextNew(e);
    }
  }
  Svt() {
    var e;
    var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.duf);
    this.GetItem(4)?.SetUIActive(!t);
    var i = this.GetButton(3);
    i?.RootUIComp.SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.WeatherModel.GetCurrentWeatherSwitchConfigId() === this.duf;
      e = ModelManager_1.ModelManager.WeatherModel.GetRemainCoolDownTime();
      i?.SetSelfInteractive(!t && e <= 0);
      if (e > 0) {
        this.cuf(e);
      } else {
        this.GetText(8)?.ShowTextNew("WeatherControl_Confirm");
      }
    }
  }
  u3e() {
    var e = ModelManager_1.ModelManager.WeatherModel.IsCurrentTimeInValidTime(this.duf);
    var t = this.GetArtText(1);
    var i = this.GetArtText(2);
    if (e) {
      i?.SetText(this.fuf());
    } else {
      t?.SetText(this.fuf());
      i?.SetText(this.guf());
    }
    t?.SetUIActive(!e);
    this.GetItem(7)?.SetUIActive(!e);
  }
  fuf() {
    return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
  }
  guf() {
    return ("0" + this.Cuf(this.duf)).slice(-2) + ":00";
  }
  Cuf(e) {
    return ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(e).ValidTime[0];
  }
}
exports.WeatherCentralBottomItem = WeatherCentralBottomItem;
//# sourceMappingURL=WeatherCentralBottomItem.js.map