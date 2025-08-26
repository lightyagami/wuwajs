"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteContinuousClickContext = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteContinuousClickContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
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
          ControllerHolder_1.ControllerHolder.CommonQteController.PlayExtraEffect(this.HandleId);
          ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventResponse, this.UiActor);
          AudioSystem_1.AudioSystem.SetRtpcValue(QteDefine_1.QTE_PROGRESS_RTPC, this.GetProgress(), {
            Actor: this.UiActor
          });
        }
        this.CheckQteConditionAndDoSuccess();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte无法接收响应", ["HandleId", this.HandleId], ["QteId", this.QteId], ["State", this.State]);
      }
    }
  }
  OnQtePendingSuccess() {
    ControllerHolder_1.ControllerHolder.CommonQteController.WaitQteEnd(this.HandleId);
  }
  CheckQteConditionMatch() {
    var t = this.DeltaEnergyPercentPerResponse > 0 && this.CurrentEnergyPercent >= this.TargetEnergyPercent;
    var e = this.DeltaEnergyPercentPerResponse < 0 && this.CurrentEnergyPercent <= this.TargetEnergyPercent;
    return t || e;
  }
  OnUpdateTime(t) {
    var e;
    if (this.Config) {
      this.PassTime += t;
      e = this.CurrentEnergyPercent;
      if (this.IsPending()) {
        this.CurrentEnergyPercent = MathUtils_1.MathUtils.Clamp(this.CurrentEnergyPercent + this.DeltaEnergyPercentPerMs * t, 0, 100);
      }
      t = e !== this.CurrentEnergyPercent;
      if (!this.CheckQteConditionAndDoSuccess()) {
        if (!this.IsPermanent && this.PassTime > this.Duration) {
          this.QteFail();
        }
        if (this.IsPending() && t) {
          AudioSystem_1.AudioSystem.SetRtpcValue(QteDefine_1.QTE_PROGRESS_RTPC, this.GetProgress(), {
            Actor: this.UiActor
          });
        }
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
  IsAttachToActor() {
    return !!this.Config?.BaseConfig.ContinuousClickConfig.IsAttachToActor;
  }
  GetAttachConfig() {
    return this.Config?.BaseConfig.ContinuousClickConfig.AttachConfig;
  }
  GetProgress() {
    if (this.TargetEnergyPercent > 0) {
      return this.CurrentEnergyPercent / this.TargetEnergyPercent;
    } else {
      return 0;
    }
  }
}
exports.CommonQteContinuousClickContext = CommonQteContinuousClickContext;
//# sourceMappingURL=CommonQteContinuousClickContext.js.map