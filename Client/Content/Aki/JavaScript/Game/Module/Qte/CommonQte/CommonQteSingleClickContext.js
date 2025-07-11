"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteSingleClickContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteSingleClickContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.PassTime = 0;
    this.ResponseCount = 0;
    this.TargetCount = -1;
    this.Type = 0;
  }
  OnSetConfig(t) {
    this.TargetCount = 1;
  }
  OnResponse() {
    if (this.Config) {
      if (this.IsPending() || this.IsPendingSuccess()) {
        if (this.IsPending()) {
          this.ResponseCount += 1;
        }
        if (this.nS1()) {
          if (this.PassTime < this.LeastDuration) {
            this.QtePendingSuccess();
          } else {
            this.QteSuccess();
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte无法接收响应", ["HandleId", this.HandleId], ["QteId", this.QteId], ["State", this.State]);
      }
    }
  }
  OnQteSuccess() {
    if (this.SuccessCallback) {
      this.SuccessCallback(this);
    }
    this.SuccessCallback = undefined;
    ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.HandleId);
  }
  OnQteFail() {
    if (this.FailCallback) {
      this.FailCallback(this);
    }
    this.FailCallback = undefined;
    ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.HandleId);
  }
  OnUpdateTime(t) {
    if (this.Config) {
      this.PassTime += t;
      if (this.nS1()) {
        if (this.PassTime < this.LeastDuration) {
          this.QtePendingSuccess();
        } else {
          this.QteSuccess();
        }
      } else if (!this.IsPermanent && this.PassTime > this.Duration) {
        this.QteFail();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", ["QteId", this.QteId]);
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte();
    }
  }
  OnGetAction() {
    var t;
    if (this.Config && (t = this.Config.BaseConfig.SingleClickConfig.UIConfig.Action) > 0 && t < QteDefine_1.qteInputActions.length) {
      return QteDefine_1.qteInputActions[t];
    } else {
      return undefined;
    }
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.SingleClickConfig;
    }
  }
  nS1() {
    return this.ResponseCount >= this.TargetCount;
  }
  GetRemainingTime() {
    return Math.max(0, this.Duration - this.PassTime);
  }
}
exports.CommonQteSingleClickContext = CommonQteSingleClickContext;
//# sourceMappingURL=CommonQteSingleClickContext.js.map