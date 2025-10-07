"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteHandleBase = exports.PERCENT = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const EVENT_SUCCESS = "plot_seq_qte_success";
const EVENT_FAIL = "plot_seq_qte_timeout";
exports.PERCENT = 0.01;
const BLEND_OUT_TIME = 0;
const COMPLETE_SPEED = 0.001;
class QteSpineInfoProxy {
  constructor() {
    this.EndSpine = undefined;
    this.ProgressSpine = undefined;
    this.StartLoopSpines = undefined;
    this.WaitEndSpineFinish = false;
  }
}
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
    this.SpineInfo = undefined;
    this.CacheSpineProgress = 0;
    this.View = undefined;
    this.IsForceStop = false;
    this.HasPlayProgressSpine = false;
    this.HasPlayStartSpine = false;
    this.EndSpineCheckList = new Set();
    this.ProgressSpineCheckList = new Set();
    this.OnQteSucceed = t => {
      AudioSystem_1.AudioSystem.PostEvent(EVENT_SUCCESS);
      this.OptionIndex = 0;
      this.OnCommonQteFinished();
    };
    this.OnQteFailed = t => {
      this.OptionIndex = 1;
      this.QteManager.FinishSequenceAnim(this.Context.QteId);
      AudioSystem_1.AudioSystem.PostEvent(EVENT_FAIL);
      this.OnCommonQteFinished();
    };
    this.OnSpineFinishedCallback = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotQte] Spine结束回调", ["name", t], ["EndSpineCheckList", this.EndSpineCheckList], ["ProgressSpineCheckList", this.ProgressSpineCheckList]);
      }
      if (this.ProgressSpineCheckList.delete(t) && this.ProgressSpineCheckList.size === 0) {
        this.PlayEndSpine();
      }
      if (this.EndSpineCheckList.delete(t)) {
        this.CheckFinish();
      }
    };
    i.SuccessCallback = this.OnQteSucceed;
    i.FailCallback = this.OnQteFailed;
  }
  OnBegin() {
    var t = this.Context.Config?.BaseConfig.TimeDilation ?? 1;
    this.QteManager.SetPlayRate(t);
    this.View = UiManager_1.UiManager.GetViewByName("PlotSubtitleView");
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FiniteSpineEnd, this.OnSpineFinishedCallback);
  }
  OnFinish() {
    this.EndSpineCheckList.clear();
    this.ProgressSpineCheckList.clear();
    this.View = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FiniteSpineEnd, this.OnSpineFinishedCallback);
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
  OnSequenceAnimFinished() {}
  OnTick(t) {
    if (this.Context?.IsPending()) {
      this.OnReceiveTick(t);
    }
  }
  OnReceiveTick(t) {
    this.UpdateSpine(this.GetProgress());
  }
  OnCommonQteFinished() {
    AudioSystem_1.AudioSystem.SetRtpcValue("plot_seq_qte_time_scale", 1);
    this.QteManager.ResetPlayRate();
    this.FinishQteSpine();
    this.CheckFinish();
  }
  GetProgress() {
    return this.Context.GetProgress();
  }
  GetCompletingProgress(t) {
    this.CacheSpineProgress += t * COMPLETE_SPEED;
    return this.CacheSpineProgress;
  }
  UpdateSpine(t) {
    if (this.SpineInfo) {
      if ((t = MathUtils_1.MathUtils.Clamp(t, 0, 1)) <= 0) {
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
            this.View?.PlaySonUiSpine(t.Name, t.NeedLoop, true, BLEND_OUT_TIME);
          });
          this.HasPlayProgressSpine = true;
        }
        this.CacheSpineProgress = t;
        this.View.UpdateSpineForQte(t);
      }
    }
  }
  FinishQteSpine() {
    if (this.SpineInfo) {
      if (this.IsForceStop) {
        this.SpineInfo.ProgressSpine?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
        this.SpineInfo.StartLoopSpines?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
        this.SpineInfo.EndSpine?.forEach(t => {
          this.View?.CloseSpineAnimation(t.Name, 0);
        });
      } else if (this.Context.IsFail() || this.CacheSpineProgress >= 1) {
        this.PlayEndSpine();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotQte] 进度未满，补播推进Spine", ["CacheSpineProgress", this.CacheSpineProgress]);
        }
        this.SpineInfo.ProgressSpine?.forEach(t => {
          if (t.Name) {
            this.ProgressSpineCheckList.add(t.Name);
            this.View?.RestoreFreezeSpine(t.Name);
          }
        });
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
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Plot", 26, "[PlotQte] 播放结束Spine，等待回调", ["EndSpineCheckList", this.EndSpineCheckList]);
    }
  }
  CheckFinish() {
    if (this.IsSequenceQteFinished()) {
      this.QteManager.OnSequenceQteFinished(this.Context.QteId);
    }
  }
  IsSequenceQteFinished() {
    return !!this.IsForceStop || !!this.Context.IsFail() || this.EndSpineCheckList.size === 0 && this.ProgressSpineCheckList.size === 0 && !this.Context.IsPending();
  }
  SetQteSpineInfo(i) {
    if (i) {
      this.SpineInfo = new QteSpineInfoProxy();
      this.SpineInfo.StartLoopSpines = [];
      for (let t = 0; t < i.StartLoopSpines.Num(); t++) {
        var s = i.StartLoopSpines.Get(t);
        var e = new SpineDataProxy();
        e.Name = s.Name;
        e.NeedLoop = s.NeedLoop;
        this.SpineInfo.StartLoopSpines.push(e);
      }
      this.SpineInfo.ProgressSpine = [];
      for (let t = 0; t < i.ProgressSpine.Num(); t++) {
        var h = i.ProgressSpine.Get(t);
        var o = new SpineDataProxy();
        o.Name = h.Name;
        o.NeedLoop = h.NeedLoop;
        this.SpineInfo.ProgressSpine.push(o);
      }
      this.SpineInfo.EndSpine = [];
      for (let t = 0; t < i.EndSpine.Num(); t++) {
        var n = i.EndSpine.Get(t);
        var r = new SpineDataProxy();
        r.Name = n.Name;
        r.NeedLoop = n.NeedLoop;
        this.SpineInfo.EndSpine.push(r);
      }
      this.SpineInfo.WaitEndSpineFinish = i.WaitEndSpineFinish;
    }
  }
}
exports.SequenceQteHandleBase = SequenceQteHandleBase;
//# sourceMappingURL=SequenceQteHandleBase.js.map