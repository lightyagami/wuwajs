"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteLongPressContext = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteLongPressContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.InitProgress = 0;
    this.MaxProgress = 0;
    this.TargetProgress = 0;
    this.IncreaseSpeed = 0;
    this.DecreaseSpeed = 0;
    this.CurrentProgress = 0;
    this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.VXu = false;
    this.Type = 2;
  }
  OnSetConfig(t) {
    t = t.BaseConfig.LongPressConfig;
    this.InitProgress = t.InitProgress;
    this.MaxProgress = t.MaxProgress;
    this.TargetProgress = t.TargetProgress;
    this.IncreaseSpeed = t.IncreaseSpeed * TimeUtil_1.TimeUtil.Millisecond;
    this.DecreaseSpeed = t.DecreaseSpeed * TimeUtil_1.TimeUtil.Millisecond;
    this.CurrentProgress = this.InitProgress;
  }
  OnResponse() {
    if (this.Config) {
      if (this.IsPending() || this.IsPendingSuccess()) {
        if (this.IsPending()) {
          this.VXu = true;
          ControllerHolder_1.ControllerHolder.CommonQteController.PlayExtraEffect(this.HandleId);
          this.AudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventResponse, this.UiActor);
        }
        this.CheckQteConditionAndDoSuccess();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte无法接收响应", ["HandleId", this.HandleId], ["QteId", this.QteId], ["State", this.State]);
      }
    }
  }
  OnResponseEnd() {
    this.VXu = false;
    ControllerHolder_1.ControllerHolder.CommonQteController.StopExtraEffect(this.HandleId);
    if (this.AudioHandle) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.AudioHandle);
      this.AudioHandle = 0;
    }
  }
  OnUpdateTime(t) {
    var i;
    if (this.Config) {
      this.PassTime += t;
      i = this.CurrentProgress;
      if (this.VXu) {
        this.CurrentProgress = Math.min(this.MaxProgress, this.CurrentProgress + this.IncreaseSpeed * t);
      } else {
        this.CurrentProgress = Math.max(0, this.CurrentProgress - this.DecreaseSpeed * t);
      }
      t = i !== this.CurrentProgress;
      if (!this.CheckQteConditionAndDoSuccess()) {
        if (!this.IsPermanent && this.PassTime > this.Duration) {
          this.QteFail();
        }
        if (this.IsPending() && t) {
          AudioSystem_1.AudioSystem.SetRtpcValue(QteDefine_1.QTE_PROGRESS_RTPC, this.GetProgress(), {
            Actor: this.UiActor
          });
          if (this.CurrentProgress > i) {
            if (this.RegressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
              ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.RegressAudioHandle);
              this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
            }
            if (this.ProgressAudioHandle === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && this.Config.AudioConfig.AudioEventProgress) {
              this.ProgressAudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventProgress, this.UiActor);
              ControllerHolder_1.ControllerHolder.CommonQteController.SeekAudio((this.CurrentProgress - this.InitProgress) / this.IncreaseSpeed, this.Config.AudioConfig.AudioEventProgress, this.UiActor, this.ProgressAudioHandle);
            }
          } else if (this.CurrentProgress < i && (this.ProgressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && (ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.ProgressAudioHandle), this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE), this.RegressAudioHandle === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) && this.Config.AudioConfig.AudioEventRegress) {
            this.RegressAudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventRegress, this.UiActor);
            ControllerHolder_1.ControllerHolder.CommonQteController.SeekAudio((this.TargetProgress - this.CurrentProgress) / this.DecreaseSpeed, this.Config.AudioConfig.AudioEventRegress, this.UiActor, this.RegressAudioHandle);
          }
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", ["QteId", this.QteId]);
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte();
    }
  }
  OnQteFail() {
    if (this.ProgressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.ProgressAudioHandle);
      this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
    if (this.RegressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.RegressAudioHandle);
      this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
  }
  OnQteSuccess() {
    if (this.ProgressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.ProgressAudioHandle);
      this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
    if (this.RegressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.RegressAudioHandle);
      this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
  }
  OnGetAction() {
    var t;
    if (this.Config && (t = this.Config.BaseConfig.LongPressConfig.UIConfig.Action) > 0 && t < QteDefine_1.qteInputActions.length) {
      return QteDefine_1.qteInputActions[t];
    } else {
      return undefined;
    }
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.LongPressConfig;
    }
  }
  CheckQteConditionMatch() {
    return this.CurrentProgress >= this.TargetProgress;
  }
  GetProgress() {
    return this.CurrentProgress * 0.01;
  }
  IsAttachToActor() {
    return !!this.Config?.BaseConfig.LongPressConfig.IsAttachToActor;
  }
  GetAttachConfig() {
    return this.Config?.BaseConfig.LongPressConfig.AttachConfig;
  }
}
exports.CommonQteLongPressContext = CommonQteLongPressContext;
//# sourceMappingURL=CommonQteLongPressContext.js.map