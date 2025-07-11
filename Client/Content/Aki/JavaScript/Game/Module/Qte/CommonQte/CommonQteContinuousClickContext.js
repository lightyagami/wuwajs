"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteContinuousClickContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteContinuousClickContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.PassTime = 0;
    this.CurrentEnergyPercent = 0;
    this.TargetEnergyPercent = -1;
    this.DeltaEnergyPercentPerResponse = 0;
    this.DeltaEnergyPercentPerMs = 0;
    this.Type = 1;
  }
  OnSetConfig(t) {
    t = t.BaseConfig.ContinuousClickConfig;
    this.CurrentEnergyPercent = t.InitialEnergyPercent;
    this.TargetEnergyPercent = t.TargetEnergyPercent;
    this.DeltaEnergyPercentPerMs = t.DeltaEnergyPercentPerSecond * TimeUtil_1.TimeUtil.Millisecond;
    this.DeltaEnergyPercentPerResponse = t.DeltaEnergyPercentPerClick;
  }
  OnResponse() {
    if (this.Config) {
      if (this.IsPending() || this.IsPendingSuccess()) {
        if (this.IsPending()) {
          this.CurrentEnergyPercent = MathUtils_1.MathUtils.Clamp(this.CurrentEnergyPercent + this.DeltaEnergyPercentPerResponse, 0, 100);
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
  OnQtePendingSuccess() {
    ControllerHolder_1.ControllerHolder.CommonQteController.WaitQteEnd(this.HandleId);
  }
  nS1() {
    var t = this.DeltaEnergyPercentPerResponse > 0 && this.CurrentEnergyPercent >= this.TargetEnergyPercent;
    var i = this.DeltaEnergyPercentPerResponse < 0 && this.CurrentEnergyPercent <= this.TargetEnergyPercent;
    return t || i;
  }
  OnUpdateTime(t) {
    if (this.Config) {
      this.PassTime += t;
      if (this.IsPending()) {
        this.CurrentEnergyPercent = MathUtils_1.MathUtils.Clamp(this.CurrentEnergyPercent + this.DeltaEnergyPercentPerMs * t, 0, 100);
      }
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
    if (this.Config && (t = this.Config.BaseConfig.ContinuousClickConfig.UIConfig.Action) > 0 && t < QteDefine_1.qteInputActions.length) {
      return QteDefine_1.qteInputActions[t];
    } else {
      return undefined;
    }
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.ContinuousClickConfig;
    }
  }
}
exports.CommonQteContinuousClickContext = CommonQteContinuousClickContext;
//# sourceMappingURL=CommonQteContinuousClickContext.js.map