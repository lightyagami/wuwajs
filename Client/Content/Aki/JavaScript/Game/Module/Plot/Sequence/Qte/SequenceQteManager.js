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
const SequenceQteDrag_1 = require("./SequenceQteDrag");
const SequenceQteGroup_1 = require("./SequenceQteGroup");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
const SequenceQteLongPress_1 = require("./SequenceQteLongPress");
const SequenceQteSelectOption_1 = require("./SequenceQteSelectOption");
const QTE_REASON = "QTE";
class SequenceQteManager {
  constructor() {
    this.utd = new Map();
    this.ctd = 2;
    this.QteManager = undefined;
    this.PendingOptionResult = new Map();
    this.Ocd = 0;
    this.Fcd = new Queue_1.Queue();
    this.J_ = e => {
      if (this.utd.size > 0) {
        for (var [, t] of this.utd) {
          t.OnTick(e);
        }
      }
      while (!this.Fcd.Empty) {
        var o = this.Fcd.Pop();
        this.IWd(o);
      }
    };
  }
  Init() {
    this.Ocd = ControllerHolder_1.ControllerHolder.PlotController.AddAfterTick(this.J_);
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.MovieSceneDialogueSubsystem.StaticClass());
    this.QteManager = e.GetQteManager();
    if (!ObjectUtils_1.ObjectUtils.IsValid(this.QteManager)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("QteManager异常");
      this.QteManager = undefined;
    }
  }
  Clear() {
    if (this.utd.size > 0) {
      for (var [e, t] of this.utd) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 强制清理", ["QteId", e]);
        }
        t.ForceStopSequenceQte();
      }
    }
    this.utd.clear();
    this.PendingOptionResult.clear();
    ControllerHolder_1.ControllerHolder.PlotController.RemoveAfterTick(this.Ocd);
    this.QteManager = undefined;
  }
  StartSequenceQte(e) {
    if (this.utd.size > 0) {
      for (const [, i] of this.utd) {
        i.ForceStopSequenceQte();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] sequence qte 重叠");
        }
      }
      this.utd.clear();
    }
    var t = !e.IsTriggerType;
    let o = undefined;
    let n = undefined;
    if (t) {
      o = new UE.FrameTime(e.StartFrame.FrameNumber, e.StartFrame.SubFrame);
      --(n = new UE.FrameTime(e.EndFrame.FrameNumber, e.EndFrame.SubFrame)).FrameNumber.Value;
    }
    const i = this.CreateQte(e.QteId, e.SubtitleId, t, e.IsGroupQte, o, n, e.AttachActor, e.SpineInfo, e.SubQteParams);
    if (i) {
      this.utd.set(e.QteId, i);
      i.OnBegin();
      if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
        if (i.IsProgressQte) {
          ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PauseOnNextFrame();
        } else {
          ControllerHolder_1.ControllerHolder.SequenceController.PauseSequence(QTE_REASON);
        }
      }
      this.ctd = 2;
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 开始", ["QteId", e.QteId]);
      }
    } else {
      this.QteManager?.FinishQte(e.QteId);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 失败", ["QteId", e.QteId]);
      }
    }
  }
  OnSequenceAnimFinished(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Qte 动画结束回调", ["QteId", e]);
    }
    e = this.utd.get(e);
    if (e) {
      e.OnSequenceAnimFinished();
    }
  }
  OnSequenceQteFinished(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Qte 结束回调");
    }
    var t = this.utd.get(e);
    if (t) {
      if (t.SubtitleId !== -1) {
        this.PendingOptionResult.set(t.SubtitleId, t.OptionIndex);
      }
      this.Fcd.Push(e);
    }
  }
  IWd(e) {
    var t;
    var o = this.utd.get(e);
    if (o) {
      if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
        if (o.IsProgressQte) {
          (t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer)?.CleanPauseOnFrame();
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
          t?.Play();
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
        } else {
          this.FinishSequenceAnim(e);
          ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence(QTE_REASON);
        }
      }
      o.OnFinish();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 完成", ["QteId", e]);
      }
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
      this.utd.delete(e);
    }
  }
  ForwardSequenceAnim(e, t, o) {
    this.QteManager?.UpdateQte(e, true, t);
    if (this.ctd !== 0 && (this.ctd = 0, o) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 推进", ["QteId", e]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer.PlayTo(new UE.MovieSceneSequencePlaybackParams(o, 0, "", 0, 0));
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
    }
  }
  BackwardSequenceAnim(e, t, o) {
    if (this.utd.get(e) && (this.QteManager?.UpdateQte(e, false, t), this.ctd !== 1) && (this.ctd = 1, o) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowSequence][PlotQte] Sequence Qte 回退", ["QteId", e]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PlayTo(new UE.MovieSceneSequencePlaybackParams(o, 0, "", 0, 0));
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
    }
  }
  PauseSequenceAnim(e) {
    e = this.utd.get(e);
    if (e && this.ctd !== 2 && (this.ctd = 2, e.IsProgressQte) && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.SequencePlayer?.PauseOnNextFrame();
    }
  }
  FinishSequenceAnim(e) {
    if (this.utd.get(e)) {
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
  CreateQte(e, t, o, n, i, a, r, l, s) {
    let u = undefined;
    if (u = n ? ControllerHolder_1.ControllerHolder.CommonQteController.StartQteGroup(e, undefined, undefined, 2, {
      AttachTarget: r
    }) : ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(e, undefined, undefined, 2, {
      AttachTarget: r
    })) {
      let e = undefined;
      if (u.Type === 2) {
        e = new SequenceQteLongPress_1.SequenceQteLongPress(this, u);
      } else if (u.Type === 1) {
        e = new SequenceQteContinuousClick_1.SequenceQteContinuousClick(this, u);
      } else if (u.Type === 4) {
        e = new SequenceQteSelectOption_1.SequenceQteSelectOption(this, u);
      } else if (u.Type === 5) {
        (e = new SequenceQteGroup_1.SequenceQteGroup(this, u)).SetSubQteParams(s);
      } else {
        e = new (u.Type === 3 ? SequenceQteDrag_1.SequenceQteDrag : SequenceQteHandleBase_1.SequenceQteHandleBase)(this, u);
      }
      e.SubtitleId = t;
      e.IsProgressQte = o;
      e.SequenceQteStartRange = i;
      e.SequenceQteEndRange = a;
      e.SpineInfo = SequenceQteHandleBase_1.QteSpineInfoProxy.CreateQteSpineInfo(l);
      return e;
    }
  }
}
exports.SequenceQteManager = SequenceQteManager;
//# sourceMappingURL=SequenceQteManager.js.map