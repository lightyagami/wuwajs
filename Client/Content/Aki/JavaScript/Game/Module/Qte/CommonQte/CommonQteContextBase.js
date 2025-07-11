"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteContextBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
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
    this.IsPermanent = false;
    this.SuccessCallback = undefined;
    this.FailCallback = undefined;
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
    return this.HandleId === ModelManager_1.ModelManager.CommonQteModel?.GetQteHandleId();
  }
  Response() {
    this.OnResponse();
  }
  OnResponse() {}
  QtePendingSuccess() {
    if (this.State !== 1) {
      this.State = 1;
      this.OnQtePendingSuccess();
    }
  }
  OnQtePendingSuccess() {}
  QteSuccess() {
    if (this.State !== 2) {
      this.State = 2;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte触发成功", ["HandleId", this.HandleId], ["QteId", this.QteId]);
      }
      this.OnQteSuccess();
    }
  }
  OnQteSuccess() {}
  QteFail() {
    if (this.State !== 3) {
      this.State = 3;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte触发失败", ["HandleId", this.HandleId], ["Id", this.QteId]);
      }
      this.OnQteFail();
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
    this.OnClear();
    this.SuccessCallback = undefined;
    this.FailCallback = undefined;
  }
  OnClear() {}
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
  GetUiConfig() {
    return this.OnGetUiConfig();
  }
  OnGetUiConfig() {}
}
exports.CommonQteContextBase = CommonQteContextBase;
//# sourceMappingURL=CommonQteContextBase.js.map