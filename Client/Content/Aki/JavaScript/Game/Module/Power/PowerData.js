"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverPowerData = exports.PowerData = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const PowerController_1 = require("./PowerController");
const TRYREQUESTGAP = 1;
class PowerData {
  constructor() {
    this.ItemId = 0;
    this.CurrentPower = 0;
    this.FinishUpdateTime = 0;
    this.NeedUpdateFlag = false;
    this.CurrentRecoverMode = 0;
    this.NextRecoverTime = 0;
    this.ResetTime = 0;
    this.CurrentRequestNewPowerTime = 0;
    this.LastTickCountDown = -1;
  }
  Phrase(e, t, r) {
    this.ItemId = e;
    this.Moo(t);
    e = r;
    t = (this.GetPowerLimit() - t) * this.GetPowerIncreaseTimeSpan();
    this.FinishUpdateTime = e + t;
    this.NextRecoverTime = r + this.GetPowerIncreaseTimeSpan();
  }
  CheckPowerUpdate() {
    if (this.NeedUpdateFlag && this.GetIfCanRequestNewPower()) {
      this.OnCheckPowerUpdate();
    }
  }
  GetIfCanRequestNewPower() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return this.NextRecoverTime > 0 && e >= this.NextRecoverTime && ControllerHolder_1.ControllerHolder.PowerController.GetIfCanRequestNewPower() && e - this.CurrentRequestNewPowerTime > TRYREQUESTGAP;
  }
  RequestNewPowerDataAndCacheRequestTime() {
    PowerController_1.PowerController.SendUpdatePowerRequest([this.ItemId]);
    this.CurrentRequestNewPowerTime = TimeUtil_1.TimeUtil.GetServerTime();
  }
  OnCheckPowerUpdate() {
    this.RequestNewPowerDataAndCacheRequestTime();
  }
  GetPowerRecoveryMode() {
    if (this.NeedUpdateFlag) {
      return 0;
    } else {
      return 2;
    }
  }
  Moo(e) {
    this.CurrentPower = e;
    if (this.CheckPowerIfMax()) {
      this.NeedUpdateFlag = false;
    } else {
      this.NeedUpdateFlag = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPowerChanged);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPowerChangedWithId, this.ItemId);
  }
  GetCurrentPower() {
    return this.CurrentPower;
  }
  CheckPowerIfMax() {
    return this.CurrentPower >= this.GetPowerLimit();
  }
  GetResetTime() {
    return this.ResetTime;
  }
  GetNeedUpdateFlag() {
    return this.NeedUpdateFlag;
  }
  GetPowerCurrencyShowTextId() {
    return "Text_ItemShow_Text";
  }
  IfNeedShowMax() {
    return false;
  }
  GetPowerLimit() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit();
  }
  GetPowerIncreaseTimeSpan() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetPowerIncreaseSpan();
  }
  GetNextTimerRecoverText() {
    var e = this.NextRecoverTime - TimeUtil_1.TimeUtil.GetServerTime();
    var t = (e = e < 0 ? 0 : e) / TimeUtil_1.TimeUtil.Minute;
    var e = e % TimeUtil_1.TimeUtil.Minute;
    var t = Math.trunc(t);
    var e = Math.trunc(e);
    return t.toString().padStart(2, "0") + ":" + e.toString().padStart(2, "0");
  }
  GetFullRecoverText() {
    var e = this.FinishUpdateTime - TimeUtil_1.TimeUtil.GetServerTime();
    var t = (e = e < 0 ? 0 : e) / TimeUtil_1.TimeUtil.Hour;
    var r = e % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute;
    var e = e % TimeUtil_1.TimeUtil.Minute;
    var t = Math.trunc(t);
    var r = Math.trunc(r);
    var e = Math.trunc(e);
    return `${t.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}:${e.toString().padStart(2, "0")}`;
  }
}
class OverPowerData extends (exports.PowerData = PowerData) {
  GetIfCanRequestNewPower() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var t = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power);
    return this.NextRecoverTime > 0 && e >= this.NextRecoverTime && ControllerHolder_1.ControllerHolder.PowerController.GetIfCanRequestNewPower() && e - this.CurrentRequestNewPowerTime > TRYREQUESTGAP && ModelManager_1.ModelManager.FunctionModel.IsOpen(10066) && t.CheckPowerIfMax();
  }
  GetPowerRecoveryMode() {
    if (this.CheckPowerIfMax()) {
      return 2;
    } else if (ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power).CheckPowerIfMax()) {
      return 0;
    } else {
      return 1;
    }
  }
  GetPowerCurrencyShowTextId() {
    return "PowerNumTips";
  }
  GetPowerLimit() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetOverPowerLimit();
  }
  GetPowerIncreaseTimeSpan() {
    return ConfigManager_1.ConfigManager.PowerConfig.GetOverPowerRecoverTimeSpan();
  }
  IfNeedShowMax() {
    return true;
  }
}
exports.OverPowerData = OverPowerData;
//# sourceMappingURL=PowerData.js.map