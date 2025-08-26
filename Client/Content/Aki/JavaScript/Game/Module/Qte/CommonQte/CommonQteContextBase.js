"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteContextBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class CommonQteContextBase {
  constructor() {
    this.Type = undefined;
    this.HandleId = -1;
    this.QteId = 0;
    this.Source = undefined;
    this.State = 0;
    this.Config = undefined;
    this.Duration = 0;
    this.LeastDuration = 0;
    this.PassTime = 0;
    this.IsPermanent = false;
    this.SuccessCallback = undefined;
    this.FailCallback = undefined;
    this.ExtraParams = undefined;
    this.Resource = undefined;
    this.UiActor = undefined;
    this.AudioHandle = 0;
    this.GroupHandleId = -1;
    this.QteGroupId = 0;
    this.GroupConfig = undefined;
    this.GroupContext = undefined;
    this.CheckSuccessTime = 0;
  }
  IsPending() {
    return this.State === 0;
  }
  IsPendingSuccess() {
    return this.State === 1;
  }
  IsSuccess() {
    return this.State === 2;
  }
  IsFail() {
    return this.State === 3;
  }
  IsInvalid() {
    return this.State === 4;
  }
  IsActive() {
    var t = ModelManager_1.ModelManager.CommonQteModel?.GetQteHandleId();
    return this.HandleId === t || this.GroupHandleId === t;
  }
  Response() {
    this.OnResponse();
  }
  OnResponse() {}
  ResponseEnd() {
    this.OnResponseEnd();
  }
  OnResponseEnd() {}
  QtePendingSuccess() {
    if (this.State !== 1) {
      this.State = 1;
      this.OnQtePendingSuccess();
    }
  }
  OnQtePendingSuccess() {}
  QteSuccess() {
    if (this.State !== 2 && (this.State = 2, Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte触发成功", ["HandleId", this.HandleId], ["QteId", this.QteId]), this.OnQteSuccess(), this.SuccessCallback && this.SuccessCallback(this), this.SuccessCallback = undefined, this.GroupHandleId === -1)) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.HandleId);
    }
  }
  OnQteSuccess() {}
  SetQteSuccess() {
    if (this.PassTime < this.LeastDuration) {
      this.QtePendingSuccess();
    } else {
      this.QteSuccess();
    }
  }
  QteFail() {
    if (this.State !== 3 && (this.State = 3, Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte触发失败", ["HandleId", this.HandleId], ["Id", this.QteId]), this.OnQteFail(), this.FailCallback && this.FailCallback(this), this.FailCallback = undefined, this.GroupHandleId === -1)) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.HandleId);
    }
  }
  OnQteFail() {}
  UpdateTime(t) {
    this.OnUpdateTime(t);
  }
  OnUpdateTime(t) {}
  Clear() {
    if (this.IsPending()) {
      this.State = 4;
    }
    this.OnResponseEnd();
    this.OnClear();
    this.SuccessCallback = undefined;
    this.FailCallback = undefined;
    this.Resource = undefined;
    this.UiActor = undefined;
  }
  OnClear() {}
  GetConfig() {
    return this.Config;
  }
  GetAction() {
    return this.OnGetAction();
  }
  OnGetAction() {}
  SetConfig(t) {
    if ((this.Config = t).BaseConfig.Duration < 0) {
      this.IsPermanent = true;
    } else {
      this.Duration = t.BaseConfig.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    this.LeastDuration = t.BaseConfig.LeastDuration * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.OnSetConfig(t);
  }
  OnSetConfig(t) {}
  SetGroupConfig(t) {
    if ((this.GroupConfig = t).Duration < 0) {
      this.IsPermanent = true;
    } else {
      this.IsPermanent = false;
      this.Duration = t.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    this.LeastDuration = t.LeastDuration * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.OnSetGroupConfig(t);
  }
  OnSetGroupConfig(t) {}
  GetUiConfig() {
    return this.OnGetUiConfig();
  }
  OnGetUiConfig() {}
  CheckQteConditionAndDoSuccess() {
    return !!this.CheckQteConditionMatch() && (this.GroupContext ? (this.CheckSuccessTime = Date.now(), this.GroupContext?.CheckQteConditionAndDoSuccess()) : this.SetQteSuccess(), true);
  }
  CheckQteConditionMatch() {
    return false;
  }
  CheckQteSuccessInTime(t) {
    return this.CheckSuccessTime !== 0 && Date.now() - this.CheckSuccessTime < t;
  }
  GetRemainingTime() {
    return Math.max(0, this.Duration - this.PassTime);
  }
  GetRemainingTimeProgress() {
    if (this.Duration <= 0) {
      return 1;
    } else {
      return this.GetRemainingTime() / this.Duration;
    }
  }
  GetProgress() {
    return 0;
  }
  IsAttachToActor() {
    return false;
  }
  GetAttachConfig() {}
  GetAttachTarget() {
    return this.ExtraParams?.AttachTarget;
  }
}
exports.CommonQteContextBase = CommonQteContextBase;
//# sourceMappingURL=CommonQteContextBase.js.map