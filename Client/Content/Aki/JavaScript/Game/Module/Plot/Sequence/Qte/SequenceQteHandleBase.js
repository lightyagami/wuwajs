"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteHandleBase = exports.QteSpineInfoProxy = exports.PERCENT = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const EVENT_SUCCESS = "plot_seq_qte_success";
const EVENT_FAIL = "plot_seq_qte_timeout";
exports.PERCENT = 0.01;
const BLEND_OUT_TIME = 0.5;
class QteSpineInfoProxy {
  constructor() {
    this.EndSpine = undefined;
    this.ProgressSpine = undefined;
    this.StartLoopSpines = undefined;
    this.NiagaraParamNames = undefined;
    this.WaitEndSpineFinish = false;
  }
  static CreateQteSpineInfo(s) {
    if (s) {
      let i = false;
      var h = new QteSpineInfoProxy();
      h.StartLoopSpines = [];
      for (let t = 0; t < s.StartLoopSpines.Num(); t++) {
        var e = s.StartLoopSpines.Get(t);
        var o = new SpineDataProxy();
        o.Name = e.Name;
        o.NeedLoop = e.NeedLoop;
        h.StartLoopSpines.push(o);
        i = true;
      }
      h.ProgressSpine = [];
      for (let t = 0; t < s.ProgressSpine.Num(); t++) {
        var r = s.ProgressSpine.Get(t);
        var n = new SpineDataProxy();
        n.Name = r.Name;
        n.NeedLoop = r.NeedLoop;
        h.ProgressSpine.push(n);
        i = true;
      }
      h.EndSpine = [];
      for (let t = 0; t < s.EndSpine.Num(); t++) {
        var a = s.EndSpine.Get(t);
        var _ = new SpineDataProxy();
        _.Name = a.Name;
        _.NeedLoop = a.NeedLoop;
        h.EndSpine.push(_);
        i = true;
      }
      h.WaitEndSpineFinish = s.WaitEndSpineFinish;
      h.NiagaraParamNames = [];
      for (let t = 0; t < s.NiagaraParamNames.Num(); t++) {
        var l = s.NiagaraParamNames.Get(t);
        h.NiagaraParamNames.push(l);
        i = true;
      }
      if (i) {
        return h;
      } else {
        return undefined;
      }
    }
  }
}
exports.QteSpineInfoProxy = QteSpineInfoProxy;
class SpineDataProxy {
  constructor() {
    this.Name = undefined;
    this.NeedLoop = undefined;
  }
}
class SequenceQteHandleBase {
  constructor(t, i) {
    this.QteManager = t;
    this.Context = i;
    this.SubtitleId = -1;
    this.OptionIndex = -1;
    this.IsProgressQte = false;
    this.SequenceQteStartRange = undefined;
    this.SequenceQteEndRange = undefined;
    this.IsUpdateWithProgress = false;
    this.MarkSequenceQtePending = false;
    this.IsForceStop = false;
    this.UpdateInterval = 0;
    this.Progress = 0;
    this.CacheProgress = 0;
    this.LastProgress = 0;
    this.ProgressLerpSpeed = -1;
    this.TickInterval = 0;
    this.TickCheckTime = 0;
    this.HasFinished = false;
    this.HasCommonQteFinished = false;
    this.NeedTick = false;
    this.SectionLength = 0;
    this.SpineInfo = undefined;
    this.CacheSpineProgress = 0;
    this.View = undefined;
    this.HasPlayProgressSpine = false;
    this.HasPlayStartSpine = false;
    this.EndSpineCheckList = new Set();
    this.OnQteSucceed = t => {
      AudioSystem_1.AudioSystem.PostEvent(EVENT_SUCCESS);
      this.OptionIndex = 0;
      this.OnCommonQteFinished();
    };
    this.OnQteFailed = t => {
      this.OptionIndex = 1;
      this.QteManager.FinishSequenceAnim(this.Context.QteId);
      if (this.SpineInfo) {
        this.SpineInfo.ProgressSpine?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
        this.SpineInfo.StartLoopSpines?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
        this.SpineInfo.EndSpine?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
      }
      AudioSystem_1.AudioSystem.PostEvent(EVENT_FAIL);
      this.OnCommonQteFinished();
    };
    this.OnSpineFinishedCallback = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotQte] Spine结束回调", ["name", t], ["EndSpineCheckList", this.EndSpineCheckList]);
      }
      if (this.EndSpineCheckList.delete(t) && this.EndSpineCheckList.size === 0) {
        this.CheckFinish();
      }
    };
    i.SuccessCallback = this.OnQteSucceed;
    i.FailCallback = this.OnQteFailed;
  }
  OnSequenceAnimFinished() {
    this.MarkSequenceQtePending = false;
    this.CheckFinish();
  }
  OnBegin() {
    var t = this.Context.Config?.BaseConfig.TimeDilation ?? 1;
    this.QteManager.SetPlayRate(t);
    if (this.SpineInfo) {
      this.View = UiManager_1.UiManager.GetViewByName("PlotSubtitleView");
      this.View?.RegisterCallback(this.OnSpineFinishedCallback);
    }
    this.ProgressLerpSpeed = -1;
    this.NeedTick = true;
    if (this.IsProgressQte) {
      this.SectionLength = this.SequenceQteEndRange.FrameNumber.Value - this.SequenceQteStartRange.FrameNumber.Value;
    }
  }
  OnFinish() {
    this.EndSpineCheckList.clear();
    this.QteManager.ResetPlayRate();
    if (this.SpineInfo) {
      this.View?.RegisterCallback(undefined);
      this.View = undefined;
    }
  }
  ForceStopSequenceQte() {
    if (this.Context.IsActive()) {
      this.Context.SuccessCallback = undefined;
      this.Context.FailCallback = undefined;
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.Context.HandleId);
    }
    this.IsForceStop = true;
    this.OnQteFailed(this.Context);
  }
  OnReceiveTick(t) {
    this.Progress = MathUtils_1.MathUtils.Clamp(this.Context.GetProgress(), 0, 1);
  }
  OnTick(i) {
    if (this.NeedTick) {
      let t = i;
      if (this.TickInterval > 0) {
        this.TickCheckTime += i;
        if (this.TickCheckTime < this.TickInterval) {
          return;
        }
        t = this.TickCheckTime;
        this.TickCheckTime = 0;
      }
      this.LastProgress = this.CacheProgress;
      this.OnReceiveTick(t);
      if (this.ProgressLerpSpeed > 0) {
        this.CacheProgress = MathUtils_1.MathUtils.InterpConstantTo(this.CacheProgress, this.Progress, t, this.ProgressLerpSpeed);
      } else {
        this.CacheProgress = this.Progress;
      }
      this.UpdateSequenceQte(t);
      this.UpdateSpine();
      if (this.HasCommonQteFinished && this.CheckProgressFinish()) {
        this.NeedTick = false;
        this.PlayEndSpine();
        this.CheckFinish();
      }
    }
  }
  UpdateSequenceQte(t) {
    if (this.CacheProgress > this.LastProgress) {
      this.QteManager.ForwardSequenceAnim(this.Context.QteId, this.CacheProgress, this.SequenceQteEndRange);
    } else if (this.CacheProgress < this.LastProgress) {
      this.MarkSequenceQtePending = true;
      this.QteManager.BackwardSequenceAnim(this.Context.QteId, this.CacheProgress, this.SequenceQteStartRange);
    }
    if (this.IsUpdateWithProgress && this.IsProgressQte) {
      if (!(t <= 0)) {
        t = Math.abs(this.CacheProgress - this.LastProgress) * this.SectionLength / ModelManager_1.ModelManager.SequenceModel.CurFrameRate * CommonDefine_1.MILLIONSECOND_PER_SECOND / t;
        this.QteManager.SetPlayRate(t);
      }
    }
  }
  OnCommonQteFinished() {
    this.HasCommonQteFinished = true;
    AudioSystem_1.AudioSystem.SetRtpcValue("plot_seq_qte_time_scale", 1);
    this.QteManager.ResetPlayRate();
    this.CheckFinish();
  }
  UpdateSpine() {
    if (this.SpineInfo) {
      if (this.CacheProgress <= 0) {
        if (this.HasPlayProgressSpine) {
          this.SpineInfo.ProgressSpine?.forEach(t => {
            this.View?.CloseSpineAnimation(t.Name, 0);
          });
          this.HasPlayProgressSpine = false;
        }
        if (!this.HasPlayStartSpine) {
          this.SpineInfo.StartLoopSpines?.forEach(t => {
            this.View?.PlaySonUiSpine(t.Name, t.NeedLoop, false, 0);
          });
          this.HasPlayStartSpine = true;
        }
      } else {
        if (this.HasPlayStartSpine) {
          this.SpineInfo.StartLoopSpines?.forEach(t => {
            this.View?.CloseSpineAnimation(t.Name, BLEND_OUT_TIME);
          });
          this.HasPlayStartSpine = false;
        }
        if (!this.HasPlayProgressSpine) {
          this.SpineInfo.ProgressSpine?.forEach(t => {
            if (t.Name) {
              this.View?.PlaySonUiSpine(t.Name, t.NeedLoop, true, BLEND_OUT_TIME);
            }
          });
          this.HasPlayProgressSpine = true;
        }
        this.View.UpdateSpineForQte(this.CacheProgress);
        this.View.ManualUpdateNiagara(this.SpineInfo.NiagaraParamNames, this.CacheProgress);
      }
    }
  }
  PlayEndSpine() {
    if (this.SpineInfo && (this.HasPlayProgressSpine && (this.SpineInfo.ProgressSpine?.forEach(t => {
      this.View?.CloseSpineAnimation(t.Name, 0);
    }), this.HasPlayProgressSpine = false), this.HasPlayStartSpine && (this.SpineInfo.StartLoopSpines?.forEach(t => {
      this.View?.CloseSpineAnimation(t.Name, 0);
    }), this.HasPlayStartSpine = false), this.SpineInfo.EndSpine && this.SpineInfo.EndSpine?.forEach(t => {
      if (this.SpineInfo.WaitEndSpineFinish && !t.NeedLoop && t.Name) {
        this.EndSpineCheckList.add(t.Name);
      }
      this.View?.PlaySonUiSpine(t.Name, t.NeedLoop, false, 0);
    }), this.EndSpineCheckList.size > 0) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[PlotQte] 播放结束Spine，等待回调", ["EndSpineCheckList", this.EndSpineCheckList]);
    }
  }
  CheckFinish() {
    if (!this.HasFinished) {
      if (this.IsSequenceQteFinished()) {
        this.HasFinished = true;
        this.QteManager.OnSequenceQteFinished(this.Context.QteId);
      }
    }
  }
  IsSequenceQteFinished() {
    return !!this.IsForceStop || !!this.Context.IsFail() || !this.MarkSequenceQtePending && !!this.CheckProgressFinish() && this.EndSpineCheckList.size === 0 && !this.Context.IsPending();
  }
  CheckProgressFinish() {
    return MathUtils_1.MathUtils.IsNearlyEqual(this.CacheProgress, this.Progress);
  }
}
exports.SequenceQteHandleBase = SequenceQteHandleBase;
//# sourceMappingURL=SequenceQteHandleBase.js.map