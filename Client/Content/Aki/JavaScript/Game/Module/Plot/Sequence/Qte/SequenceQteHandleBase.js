"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteHandleBase = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const EVENT_SUCCESS = "plot_seq_qte_success";
const EVENT_FAIL = "plot_seq_qte_timeout";
class SequenceQteHandleBase {
  constructor(t, e) {
    this.QteManager = t;
    this.Context = e;
    this.SubtitleId = -1;
    this.OptionIndex = -1;
    this.IsProgressQte = false;
    this.SequenceQteStartRange = undefined;
    this.SequenceQteEndRange = undefined;
    this.OnQteSucceed = t => {
      AudioSystem_1.AudioSystem.PostEvent(EVENT_SUCCESS);
      this.OptionIndex = 0;
      this.OnFinishQte();
    };
    this.OnQteFailed = t => {
      this.OptionIndex = 1;
      this.QteManager.FinishQte(this.Context.QteId);
      AudioSystem_1.AudioSystem.PostEvent(EVENT_FAIL);
      this.OnFinishQte();
    };
    e.SuccessCallback = this.OnQteSucceed;
    e.FailCallback = this.OnQteFailed;
  }
  OnBeginQte() {
    var t = this.Context.Config?.BaseConfig.TimeDilation ?? 1;
    this.QteManager.SetPlayRate(t);
  }
  OnSequenceQteStop() {}
  OnReceiveTick(t) {}
  ForceStopQte() {
    if (this.Context.IsActive()) {
      this.Context.SuccessCallback = undefined;
      this.Context.FailCallback = undefined;
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.Context.HandleId);
    }
    this.OnQteFailed(this.Context);
  }
  OnFinishQte() {
    AudioSystem_1.AudioSystem.SetRtpcValue("plot_seq_qte_time_scale", 1);
    this.QteManager.ResetPlayRate();
    this.QteManager.HandleCommonQteFinished(this.Context.QteId);
  }
  CheckQteFinish() {
    return this.Context.IsSuccess() || this.Context.IsFail();
  }
}
exports.SequenceQteHandleBase = SequenceQteHandleBase;
//# sourceMappingURL=SequenceQteHandleBase.js.map