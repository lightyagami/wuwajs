"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompLevelSequenceController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Queue_1 = require("../../../../Core/Container/Queue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const GlobalData_1 = require("../../../GlobalData");
const SimpleLevelSequenceActor_1 = require("../../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RefCompControllerBase_1 = require("./RefCompControllerBase");
const RefCompDefine_1 = require("./RefCompDefine");
class ResourceLoadCallbackHandle {
  constructor(e, t) {
    this.Path = e;
    this.Callback = t;
    this.ResourceSystemId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Asset = undefined;
    this.LoadAsyncFinished = false;
  }
}
class RefCompLevelSequenceController extends RefCompControllerBase_1.RefCompControllerBase {
  constructor() {
    super(...arguments);
    this.Type = 0;
    this.aRl = undefined;
    this.SimpleSequenceActor = undefined;
    this.NextSequenceJumpToEnd = true;
    this.O2_ = undefined;
  }
  OnStart() {
    this.aRl = this.Entity.GetComponent(175);
  }
  OnEnd() {
    while (this.O2_ && !this.O2_.Empty) {
      var e = this.O2_.Pop();
      if (e && !e.LoadAsyncFinished && e.ResourceSystemId !== ResourceSystem_1.ResourceSystem.InvalidId) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] OnEnd时清理仍在等待的资源加载", ["PbDataId", this.PbDataId], ["ResourceId", e.ResourceSystemId], ["ResourcePath", e.Path]);
        }
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e.ResourceSystemId);
      }
    }
    if (this.SimpleSequenceActor) {
      this.SimpleSequenceActor.Clear();
    }
  }
  OnActorRemove() {
    this.NextSequenceJumpToEnd = true;
    this.SimpleSequenceActor?.Clear();
    this.SimpleSequenceActor = undefined;
  }
  HandleSequence(t) {
    if (!t.LevelSequencePath || t.LevelSequencePath === "None") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 7, "LevelSequence");
      }
    }
    const o = this.NextSequenceJumpToEnd;
    let e = undefined;
    let i = undefined;
    let s = undefined;
    i = t.Intro ? t.Intro?.Type === 0 ? (e = t.Intro, new RefCompDefine_1.TransitStruct(0, e.Duration && e.Duration > 0 ? e.Duration : 0, 0, 0, true)) : (e = t.Intro, new RefCompDefine_1.TransitStruct(1, e.Duration && e.Duration > 0 ? e.Duration : 0, e.FadeIn && e.FadeIn.Duration > 0 ? e.FadeIn.Duration : 1, e.FadeOut && e.FadeOut.Duration > 0 ? e.FadeOut.Duration : 1, true, e.Mask)) : new RefCompDefine_1.TransitStruct(0, 0, 0, 0, false);
    s = t.Outro ? t.Outro?.Type === 0 ? (e = t.Outro, new RefCompDefine_1.TransitStruct(0, e.Duration && e.Duration > 0 ? e.Duration : 0, 0, 0, true)) : (e = t.Outro, new RefCompDefine_1.TransitStruct(1, e.Duration && e.Duration > 0 ? e.Duration : 0, e.FadeIn && e.FadeIn.Duration > 0 ? e.FadeIn.Duration : 1, e.FadeOut && e.FadeOut.Duration > 0 ? e.FadeOut.Duration : 1, true, e.Mask)) : new RefCompDefine_1.TransitStruct(0, 0, 0, 0, false);
    const n = new RefCompDefine_1.PlayRateStruct(Math.abs(t.Rate ?? 1), 0, t.RateEase?.Duration);
    switch (t.RateEase?.Type) {
      case IAction_1.EEaseType.Transient:
        n.EaseType = 0;
        n.EaseDuration = 0;
        break;
      case IAction_1.EEaseType.InOutCubic:
        n.EaseType = 3;
        n.EaseExponent = 3;
        break;
      case IAction_1.EEaseType.OutQuart:
        n.EaseType = 2;
        n.EaseExponent = 4;
        break;
      case IAction_1.EEaseType.OutSine:
        n.EaseType = 5;
        break;
      default:
        IAction_1.EEaseType.Linear;
        n.EaseType = 0;
    }
    this.G2_(t.LevelSequencePath, UE.LevelSequence, e => {
      if (e?.IsValid()) {
        if (this.SimpleSequenceActor) {
          this.SimpleSequenceActor.SetSequenceData(e);
        } else {
          this.SimpleSequenceActor = new SimpleLevelSequenceActor_1.default(e);
        }
        this.SimpleSequenceActor.UpdateSettings(t.KeepUI);
        if (t.IsEnableCenterOffset) {
          this.SimpleSequenceActor.SetOriginTransform();
        }
        if (t.Mark && t.Mark.length > 0) {
          this.aRl?.OnSequencePlayToMark(t.Mark, this.SimpleSequenceActor.GetCurrentFrame(), o);
          this.SimpleSequenceActor.AddOnPauseCallback(this.aRl?.OnSequencePaused);
        }
        RefCompLevelSequenceController.MJ.Start();
        if (RefCompDefine_1.PrePhysicsSequenceConfig.Check(t.LevelSequencePath)) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 0");
        }
        switch (t.PlayMode) {
          case "shortestPath":
            this.SimpleSequenceActor.PlayToMarkByCheckWay(t.Mark, i, s, n, o);
            break;
          case "instant":
            this.SimpleSequenceActor.PlayToMark(t.Mark, i, s, n, true);
            break;
          case "loop":
            if (t.LoopRange) {
              this.SimpleSequenceActor.PlayLoopBetweenMarks(t.LoopRange, (t.Rate ?? 1) < 0, i, s, n, o);
            } else {
              this.SimpleSequenceActor.PlayLoop((t.Rate ?? 1) < 0, -1, i, s, n);
            }
            break;
          default:
            this.SimpleSequenceActor.PlayToMark(t.Mark, i, s, n, o);
        }
        if (RefCompDefine_1.PrePhysicsSequenceConfig.Check(t.LevelSequencePath)) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Animation.ForbiddenEvaluateTwice 1");
        }
        RefCompLevelSequenceController.MJ.Stop();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
      }
    });
  }
  G2_(e, t, o, i = 100) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：开始加载", ["PbDataId", this.PbDataId], ["Path", e]);
    }
    this.O2_ ||= new Queue_1.Queue();
    const s = new ResourceLoadCallbackHandle(e, o);
    this.O2_.Push(s);
    s.ResourceSystemId = ResourceSystem_1.ResourceSystem.LoadAsync(e, t, e => {
      this.F2_(s, e);
    }, i);
    return s.ResourceSystemId;
  }
  F2_(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：加载完成", ["PbDataId", this.PbDataId], ["Path", e.Path]);
    }
    e.Asset = t;
    e.LoadAsyncFinished = true;
    while (this.O2_ && !this.O2_.Empty && this.O2_.Front?.LoadAsyncFinished) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：执行回调", ["PbDataId", this.PbDataId], ["Path", e.Path]);
      }
      const o = this.O2_.Pop();
      if (RefCompDefine_1.PrePhysicsSequenceConfig.Check(o?.Path)) {
        ControllerHolder_1.ControllerHolder.PlotController.NextAfterTick(() => {
          o?.Callback?.(o.Asset, o.Path);
        });
      } else {
        o?.Callback?.(o.Asset, o.Path);
      }
    }
  }
  ForceSwitchSceneCamera(e) {
    if (this.SimpleSequenceActor) {
      return this.SimpleSequenceActor.ForceSwitchSceneCamera(e);
    } else {
      if (e && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，SimpleSequenceActor为空");
      }
      return false;
    }
  }
  OnChangeTimeDilation(e) {
    this.SimpleSequenceActor?.SetTimeDilation(e);
  }
  IsPlaying() {
    return this.SimpleSequenceActor?.IsPlaying() ?? false;
  }
  IsPlayToMarkFinished(e) {
    return !!this.SimpleSequenceActor && (e = this.SimpleSequenceActor.GetMarkValue(e)) !== undefined && !this.IsPlaying() && this.SimpleSequenceActor.GetCurrentFrame() === e;
  }
}
(exports.RefCompLevelSequenceController = RefCompLevelSequenceController).MJ = Stats_1.Stat.Create("RefCompLevelSequenceController");
//# sourceMappingURL=RefCompLevelSequenceController.js.map