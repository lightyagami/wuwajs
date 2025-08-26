"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SequenceQteContinuousClick_1 = require("./SequenceQteContinuousClick");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
const SequenceQteLongPress_1 = require("./SequenceQteLongPress");
const SequenceQteSelectOption_1 = require("./SequenceQteSelectOption");
const PERCENT = 0.01;
const QTE_REASON = "QTE";
class SequenceQteManager {
  constructor() {
    this.aZc = new Map();
    this.hZc = 2;
    this.QteManager = undefined;
    this.PendingOptionResult = new Map();
    this.Xad = 0;
    this.Jad = new Queue_1.Queue();
    this.J_ = e => {
      if (this.aZc.size > 0) {
        for (var [, t] of this.aZc) {
          t.OnReceiveTick(e);
        }
      }
      while (!this.Jad.Empty) {
        var o = this.Jad.Pop();
        this.kxe(o);
      }
    };
  }
  Init() {
    this.Xad = ControllerHolder_1.ControllerHolder.PlotController.AddAfterTick(this.J_);
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.MovieSceneDialogueSubsystem.StaticClass());
    this.QteManager = e.GetQteManager();
    if (!ObjectUtils_1.ObjectUtils.IsValid(this.QteManager)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("QteManager异常");
      this.QteManager = undefined;
    }
  }
  Clear() {
    if (this.aZc.size > 0) {
      for (var [e, t] of this.aZc) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 强制清理", ["QteId", e]);
        }
        t.ForceStopQte();
      }
    }
    this.aZc.clear();
    this.PendingOptionResult.clear();
    ControllerHolder_1.ControllerHolder.PlotController.RemoveAfterTick(this.Xad);
    this.QteManager = undefined;
  }
  HandleSequenceQte(e, t, o, i, n, a) {
    if (this.aZc.size > 0) {
      for (const [, s] of this.aZc) {
        s.ForceStopQte();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] sequence qte 重叠");
        }
      }
      this.aZc.clear();
    }
    let l = undefined;
    let r = undefined;
    if (o) {
      l = new UE.FrameTime(n.FrameNumber, n.SubFrame);
      --(r = new UE.FrameTime(a.FrameNumber, a.SubFrame)).FrameNumber.Value;
    }
    const s = this.CreateQte(e, t, o, l, r, i);
    if (s) {
      this.aZc.set(e, s);
      s.OnBeginQte();
      if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
        if (s.IsProgressQte) {
          ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PauseOnNextFrame();
        } else {
          ControllerHolder_1.ControllerHolder.SequenceController.PauseSequence(QTE_REASON);
        }
      }
      this.hZc = 2;
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 开始", ["QteId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 失败", ["QteId", e]);
    }
  }
  HandleSequenceQteAnimFinish(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Qte 动画结束回调", ["QteId", e]);
    }
    var t = this.aZc.get(e);
    if (t) {
      t.OnSequenceQteStop();
      this.Jad.Push(e);
    }
  }
  HandleCommonQteFinished(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Qte 结束回调");
    }
    var t = this.aZc.get(e);
    if (t) {
      if (t.SubtitleId !== -1) {
        this.PendingOptionResult.set(t.SubtitleId, t.OptionIndex);
      }
      this.Jad.Push(e);
    }
  }
  kxe(e) {
    var t = this.aZc.get(e);
    if (t && t.CheckQteFinish()) {
      if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
        if (t.IsProgressQte) {
          (t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer)?.CleanPauseOnFrame();
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
          t?.Play();
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
        } else {
          this.FinishQte(e);
          ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence(QTE_REASON);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 完成", ["QteId", e]);
      }
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
      this.aZc.delete(e);
    }
  }
  ForwardQte(e, t, o) {
    this.QteManager?.UpdateQte(e, true, t * PERCENT);
    if (this.hZc !== 0 && (this.hZc = 0, o) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 推进", ["QteId", e]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer.PlayTo(new UE.MovieSceneSequencePlaybackParams(o, 0, "", 0, 0));
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
    }
  }
  BackwardQte(e, t, o) {
    if (this.aZc.get(e) && (this.QteManager?.UpdateQte(e, false, t * PERCENT), this.hZc !== 1) && (this.hZc = 1, o) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 回退", ["QteId", e]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PlayTo(new UE.MovieSceneSequencePlaybackParams(o, 0, "", 0, 0));
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
    }
  }
  PauseQte(e) {
    e = this.aZc.get(e);
    if (e && this.hZc !== 2 && (this.hZc = 2, e.IsProgressQte) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PauseOnNextFrame();
    }
  }
  FinishQte(e) {
    if (this.aZc.get(e)) {
      this.QteManager?.FinishQte(e);
    }
  }
  SetPlayRate(e) {
    if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.SetPlayRate(e);
    }
  }
  ResetPlayRate() {
    if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.SetPlayRate(1);
    }
  }
  CreateQte(t, o, i, n, a, e) {
    t = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(t, undefined, undefined, 2, {
      AttachTarget: e
    });
    if (t) {
      let e = undefined;
      (e = new (t.Type === 2 ? SequenceQteLongPress_1.SequenceQteLongPress : t.Type === 1 ? SequenceQteContinuousClick_1.SequenceQteContinuousClick : t.Type === 4 ? SequenceQteSelectOption_1.SequenceQteSelectOption : SequenceQteHandleBase_1.SequenceQteHandleBase)(this, t)).SubtitleId = o;
      e.IsProgressQte = i;
      e.SequenceQteStartRange = n;
      e.SequenceQteEndRange = a;
      return e;
    }
  }
}
exports.SequenceQteManager = SequenceQteManager;
//# sourceMappingURL=SequenceQteManager.js.map