"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteDragContext = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const QteDefine_1 = require("../QteDefine");
const CommonQteContextBase_1 = require("./CommonQteContextBase");
const DEGREE_90_RAD = Math.PI * 0.5;
const DEGREE_270_RAD = Math.PI * -0.5;
class CommonQteDragContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super();
    this.s7 = 0;
    this.wco = 0;
    this.fgt = 0;
    this.UZu = 0;
    this.WKd = 0;
    this.IsPreSuccess = false;
    this.LerpSpeedInProgress = -1;
    this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    this.Type = 3;
  }
  OnSetConfig(t) {
    var i = t.BaseConfig.DragConfig;
    this.fgt = i.Direction * MathUtils_1.MathUtils.DegToRad;
    this.UZu = i.ToleranceAngle * MathUtils_1.MathUtils.DegToRad + MathUtils_1.MathUtils.SmallNumber;
    let e = 0;
    if (t.BaseConfig.DragConfig.ViewType === 5) {
      e = i.DragLength;
    } else if (t.BaseConfig.DragConfig.ViewType === 2 || t.BaseConfig.DragConfig.ViewType === 3) {
      e = i.SlideLength;
    }
    if (e > 0 && i.LerpSpeed > 0) {
      this.LerpSpeedInProgress = i.LerpSpeed / e / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    } else {
      this.LerpSpeedInProgress = -1;
    }
  }
  OnGetAction() {
    var t;
    if (this.Config && (t = this.Config.BaseConfig.DragConfig.UIConfig.Action) > 0 && t < QteDefine_1.qteInputActions.length) {
      return QteDefine_1.qteInputActions[t];
    } else {
      return undefined;
    }
  }
  OnGetUiConfig() {
    if (this.Config) {
      return this.Config.BaseConfig.DragConfig;
    }
  }
  OnResponse() {
    if (this.Config && this.IsPending()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PlayExtraEffect(this.HandleId);
      if (this.AudioHandle) {
        ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.AudioHandle);
        this.AudioHandle = 0;
      }
      this.AudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventResponse, this.UiActor);
    }
  }
  OnResponseEnd() {
    if (this.Config && (ControllerHolder_1.ControllerHolder.CommonQteController.StopExtraEffect(this.HandleId), this.AudioHandle && (ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.AudioHandle), this.AudioHandle = 0), this.IsPending())) {
      this.AudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventResponseEnd, this.UiActor);
    }
  }
  OnUpdateTime(t) {
    if (this.Config) {
      this.PassTime += t;
      t = this.GetProgress();
      if (this.IsPending()) {
        AudioSystem_1.AudioSystem.SetRtpcValue(QteDefine_1.QTE_PROGRESS_RTPC, this.GetProgress(), {
          Actor: this.UiActor
        });
        if (t > this.WKd) {
          if (this.RegressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
            ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.RegressAudioHandle);
            this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
          }
          if (this.ProgressAudioHandle === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && this.Config.AudioConfig.AudioEventProgress) {
            this.ProgressAudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventProgress, this.UiActor);
            ControllerHolder_1.ControllerHolder.CommonQteController.SeekAudio(t, this.Config.AudioConfig.AudioEventProgress, this.UiActor, this.ProgressAudioHandle);
          }
        } else if (t < this.WKd && (this.ProgressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && (ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.ProgressAudioHandle), this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE), this.RegressAudioHandle === AudioSystem_1.INVALID_AUDIO_EVENT_VALUE && this.Config.AudioConfig.AudioEventRegress && (this.RegressAudioHandle = ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventRegress, this.UiActor), ControllerHolder_1.ControllerHolder.CommonQteController.SeekAudio(t, this.Config.AudioConfig.AudioEventRegress, this.UiActor, this.RegressAudioHandle)), t === 0)) {
          ControllerHolder_1.ControllerHolder.CommonQteController.PlayQteAudio(this.Config.AudioConfig.AudioEventReset, this.UiActor);
        }
      }
      this.WKd = t;
      if (!this.IsPermanent && this.PassTime > this.Duration) {
        this.QteFail();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", ["QteId", this.QteId]);
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte();
    }
  }
  CheckQteConditionMatch() {
    return this.IsPreSuccess || this.CheckDragComplete(this.s7, this.wco);
  }
  OnQteSuccess() {
    this.StopQteAudio();
  }
  OnQteFail() {
    this.StopQteAudio();
  }
  StopQteAudio() {
    if (this.ProgressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.ProgressAudioHandle, this.Config.AudioConfig.AudioEventProgressFadeOutTime);
      this.ProgressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
    if (this.RegressAudioHandle !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQteAudio(this.RegressAudioHandle, this.Config.AudioConfig.AudioEventRegressFadeOutTime);
      this.RegressAudioHandle = AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
  }
  CheckDragComplete(t, i) {
    var e = this.Config?.BaseConfig.DragConfig;
    if (e) {
      if (e.ViewType === 0) {
        if (t >= e.SlideLength && Math.abs(i - this.fgt) <= this.UZu) {
          return true;
        }
      } else if (e.ViewType === 2) {
        if (t >= e.SlideLength && Math.abs(i - DEGREE_90_RAD) <= this.UZu) {
          return true;
        }
      } else if (e.ViewType === 3) {
        if (t >= e.SlideLength && Math.abs(i - DEGREE_270_RAD) <= this.UZu) {
          return true;
        }
      } else if (e.ViewType === 4) {
        if (Math.abs(i - DEGREE_90_RAD) <= this.UZu) {
          return true;
        }
      } else if (e.ViewType === 5 && t >= 1) {
        return true;
      }
    }
    return false;
  }
  GetProgress() {
    var t = this.Config?.BaseConfig.DragConfig;
    if (t) {
      if (t.ViewType === 2 || t.ViewType === 3) {
        return this.s7 / t.SlideLength;
      } else if (t.ViewType === 4) {
        return this.wco / DEGREE_90_RAD;
      } else if (t.ViewType === 5) {
        return this.s7;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  SetDraggingInfo(t, i) {
    this.s7 = t;
    this.wco = i;
    this.CheckQteConditionAndDoSuccess();
  }
  IsAttachToActor() {
    return !!this.Config?.BaseConfig.DragConfig.IsAttachToActor;
  }
  GetAttachConfig() {
    return this.Config?.BaseConfig.DragConfig.AttachConfig;
  }
}
exports.CommonQteDragContext = CommonQteDragContext;
//# sourceMappingURL=CommonQteDragContext.js.map