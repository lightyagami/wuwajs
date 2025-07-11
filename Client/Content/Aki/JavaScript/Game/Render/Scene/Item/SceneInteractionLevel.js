"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneInteractionLevel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SceneInteractionLevel {
  constructor() {
    this.LevelStreamingDynamic = undefined;
    this.LevelName = "";
    this.Location = undefined;
    this.Rotation = undefined;
    this.HandleId = 0;
    this.CurrentState = undefined;
    this.LoadingLevelComplete = false;
    this.InteractionActor = undefined;
    this.HasTempState = false;
    this.TempTargetState = undefined;
    this.TempNeedTransition = false;
    this.IsDestroyed = false;
    this.Active = true;
    this.TempForce = false;
    this.OnLevelStreamingShowCallback = undefined;
    this.OnLevelStreamingHideCallback = undefined;
    this.t_r = false;
  }
  Init(t, i, e, s, h, r, o, n, a = false) {
    this.LevelStreamingDynamic = t;
    this.LevelName = i;
    this.Location = e;
    this.Rotation = s;
    this.HandleId = h;
    this.CurrentState = r;
    this.HasTempState = false;
    this.t_r = a;
    this.LevelStreamingDynamic.bInitiallyLoaded = true;
    this.LevelStreamingDynamic.bInitiallyVisible = true;
    this.LevelStreamingDynamic.SetShouldBeLoaded(true);
    this.LevelStreamingDynamic.SetShouldBeVisible(n);
    this.LoadingLevelComplete = false;
    this.IsDestroyed = false;
    this.OnLevelStreamingShowCallback = o;
    if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.Init]", ["HandleId", h], ["LevelName", i], ["IsInitShow", a], ["afterLoadVisible", n]);
    }
    this.LevelStreamingDynamic.OnLevelShown.Add(() => {
      this.i_r("Init");
    });
  }
  ToggleLevelVisible(t, i, e = undefined, s = "") {
    if (this.LevelStreamingDynamic?.IsValid()) {
      var h = this.GetAllActorsInLevel();
      if (h && !t && i) {
        for (let t = 0, i = h.Num(); t < i; t++) {
          var r = h.Get(t);
          if (r instanceof UE.Actor) {
            r.SetActorHiddenInGame(true);
          }
        }
      }
      this.LevelStreamingDynamic.SetShouldBeVisible(t);
      if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.ToggleLevelVisible]", ["HandleId", this.HandleId], ["LevelName", this.LevelName], ["Visible", t], ["NeedHidden", i], ["Reason", s]);
      }
      if (t) {
        this.OnLevelStreamingShowCallback = e;
        this.LevelStreamingDynamic.OnLevelShown.Clear();
        this.LevelStreamingDynamic.OnLevelShown.Add(() => {
          this.i_r(s);
        });
      } else {
        this.InteractionActor?.TryStopCurrentState();
        this.OnLevelStreamingHideCallback = e;
        this.LevelStreamingDynamic.OnLevelHidden.Clear();
        this.LevelStreamingDynamic.OnLevelHidden.Add(() => {
          this.q4a(s);
        });
      }
    }
  }
  get MainActor() {
    return this.InteractionActor;
  }
  GetAllActorsInLevel() {
    var t;
    if (this.LevelStreamingDynamic) {
      if (t = this.LevelStreamingDynamic.GetLoadedLevel()) {
        return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelActors(t);
      } else {
        return undefined;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderScene", 11, "错误，流送关卡为空!!!!!!!!!!!!!");
    }
  }
  IsStreamingComplete() {
    return this.LoadingLevelComplete;
  }
  IsInfoDestroyed() {
    return this.IsDestroyed;
  }
  Destroy() {
    this.IsDestroyed = true;
    this.SetCollisionActorsOwner(undefined);
    if (this.InteractionActor) {
      this.InteractionActor.Clear();
    }
    if (this.LevelStreamingDynamic) {
      this.LevelStreamingDynamic.OnLevelShown.Clear();
      this.LevelStreamingDynamic.SetShouldBeLoaded(false);
    }
    this.LevelStreamingDynamic = undefined;
    this.InteractionActor = undefined;
    this.OnLevelStreamingShowCallback = undefined;
  }
  Update(t) {
    if (!!this.Active && !this.IsDestroyed) {
      if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
        this.InteractionActor.Update(t);
      }
    }
  }
  SwitchToState(t, i, e, s) {
    if (this.Active) {
      if (this.InteractionActor) {
        return this.o_r(t, i, e, s);
      }
      this.HasTempState = true;
      this.TempTargetState = t;
      this.TempNeedTransition = i;
      this.TempForce = e;
    } else {
      this.CurrentState = t;
    }
    return true;
  }
  GetAllActor() {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetAllActor();
    }
  }
  GetActorByKey(t) {
    var i;
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
      i = undefined;
      if (!(i = this.InteractionActor.GetActorByKey(t))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderScene", 11, "获取actor失败 level:" + this.LevelName + " 不存在key=" + t + " 的Actor");
        }
      }
      return i;
    }
  }
  GetActorOriginalRelTransform(t) {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetActorOriginalRelTransform(t);
    }
  }
  GetRefActorsByTag(t) {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetRefActorsByTag(t);
    }
  }
  o_r(t, i, e, s) {
    return !!this.InteractionActor?.IsValid() && (e || this.CurrentState !== t ? (this.CurrentState = t, this.InteractionActor.SetState(t, i, s), true) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 13, "切换状态失败，无法切换到当前状态", ["LevelName", this.LevelName]), false));
  }
  GetCurrentState() {
    if (this.InteractionActor) {
      return this.InteractionActor.GetCurrentState();
    } else {
      return 21;
    }
  }
  ChangePlayDirection(t) {
    if (this.InteractionActor) {
      this.InteractionActor.ChangeDirection(t);
    }
  }
  PlaySceneEffect(t) {
    if (this.InteractionActor) {
      this.InteractionActor.PlayIndependentEffect(t);
    }
  }
  EndSceneEffect(t) {
    if (this.InteractionActor) {
      this.InteractionActor.EndIndependentEffect(t);
    }
  }
  PlaySceneEndEffect(t) {
    if (this.InteractionActor) {
      this.InteractionActor.PlayIndependentEndEffect(t);
    }
  }
  i_r(t) {
    var i;
    if (this.LevelStreamingDynamic) {
      this.LoadingLevelComplete = true;
      i = this.LevelStreamingDynamic.GetLoadedLevel();
      i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneInteractionLevelActor(i);
      this.InteractionActor = i;
      if (this.InteractionActor?.IsValid()) {
        this.InteractionActor.Init(this.HandleId, this.LevelName, () => {
          this.o_r(this.CurrentState, false, true, !this.t_r);
          if (this.OnLevelStreamingShowCallback) {
            this.OnLevelStreamingShowCallback();
          }
          this.OnLevelStreamingShowCallback = undefined;
          if (this.HasTempState) {
            this.o_r(this.TempTargetState, this.TempNeedTransition, this.TempForce, !this.t_r);
            this.HasTempState = false;
          }
          this.LevelStreamingDynamic?.OnLevelShown.Clear();
        });
        if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.OnLevelShow]", ["HandleId", this.HandleId], ["Reason", t], ["LastWorldOrigin", this.LevelStreamingDynamic?.LoadedLevel?.LastWorldOrigin], ["LevelName", this.LevelName]);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderScene", 11, "找不到关卡蓝图,查看prefab是否按照规范进行制作");
        }
        this.LevelStreamingDynamic.OnLevelShown.Clear();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderScene", 11, "错误，流送关卡为空!!!!!!!!!!!!!", ["this.LevelName", this.LevelName]);
    }
  }
  q4a(t) {
    if (this.OnLevelStreamingHideCallback) {
      this.OnLevelStreamingHideCallback();
    }
    this.OnLevelStreamingHideCallback = undefined;
    this.LevelStreamingDynamic?.OnLevelHidden.Clear();
    if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.OnLevelHide]", ["HandleId", this.HandleId], ["Reason", t], ["LastWorldOrigin", this.LevelStreamingDynamic?.LoadedLevel?.LastWorldOrigin], ["LevelName", this.LevelName]);
    }
  }
  GetAttachActor() {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetAttachParentActor();
    }
  }
  AttachToActor(t) {
    if (this.InteractionActor?.IsValid() && this.InteractionActor.RootComponent?.IsValid()) {
      if (this.InteractionActor.RootComponent.Mobility === 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderScene", 39, "Prefab根场景组件的移动性为Static, 将被强行设置为Movable, 后续请检查Prefab并修改", ["LevelName", this.LevelName]);
        }
        this.InteractionActor.RootComponent.SetMobility(2);
      }
      t = ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(this.InteractionActor, t, 2, "AttachToActor", undefined, 1, 1, 1, true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderScene", 39, "测试AttachToActor", ["ret", t]);
      }
      this.InteractionActor.D_K2_SetActorRelativeLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, false);
      this.InteractionActor.K2_SetActorRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    }
  }
  SetCollisionActorsOwner(i) {
    if (this.InteractionActor?.IsValid()) {
      if (this.InteractionActor.CollisionActors) {
        var e = this.InteractionActor.CollisionActors.Num();
        for (let t = 0; t < e; t++) {
          var s = this.InteractionActor.CollisionActors.Get(t);
          if (ObjectUtils_1.ObjectUtils.IsValid(s)) {
            s.SetOwner(i);
          }
        }
      }
      if (this.InteractionActor.PartCollisionActorsAndCorrespondingTags) {
        var h = this.InteractionActor.PartCollisionActorsAndCorrespondingTags.Num();
        for (let t = 0; t < h; t++) {
          var r = this.InteractionActor.PartCollisionActorsAndCorrespondingTags.GetKey(t);
          if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
            r.SetOwner(i);
          }
        }
      }
    }
  }
  GetMainCollisionActor() {
    if (this.InteractionActor?.IsValid() && this.InteractionActor.CollisionActors && this.InteractionActor.CollisionActors?.Num() > 0) {
      return this.InteractionActor.CollisionActors.Get(0);
    } else {
      return undefined;
    }
  }
  GetPartCollisionActorTag(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Get(t);
    }
  }
  GetPartCollisionActorsNum() {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Num();
    }
  }
  GetInteractionEffectHookActors() {
    if (this.InteractionActor.InteractionEffectHookActors) {
      return this.InteractionActor.InteractionEffectHookActors;
    }
  }
  PlayExtraEffect(t, i) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayExtraEffectOnTagsChange(t, i);
    }
  }
  PlayKuroSkeletalMeshDestruction(t, i) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayKuroSkeletalMeshDestruction(t, i);
    }
  }
  StopExtraEffect(t) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.StopExtraEffectOnTagsChange(t);
    }
  }
  UpdateHitInfo(t, i) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.UpdateHitInfo(t.ToUeVector(), i);
    }
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetActiveTagSequencePlaybackProgress(t);
    }
  }
  SetActiveTagSequencePlaybackProgress(t, i) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.SetActiveTagSequencePlaybackProgress(t, i);
    }
  }
  GetActiveTagSequenceDurationTime(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetActiveTagSequenceDurationTime(t);
    }
  }
  SetActiveTagSequenceDurationTime(t, i) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.SetActiveTagSequenceDurationTime(t, i);
    }
  }
  PauseActiveTagSequence(t) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PauseActiveTagSequence(t);
    }
  }
  ResumeActiveTagSequence(t, i = false) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.ResumeActiveTagSequence(t, i);
    }
  }
  GetIsActiveTagSequencePlayReverseFromConfig(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetIsActiveTagSequencePlayReverseFromConfig(t);
    }
  }
  PlayActiveTagSequenceTo(t, i, e = false) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayActiveTagSequenceTo(t, i, e);
    }
  }
  GetReceivingDecalsActors() {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.ReceivingDecalsActors;
    }
  }
  Disable() {
    this.Active = false;
    if (this.InteractionActor) {
      this.InteractionActor.Active = false;
    }
  }
  Enable() {
    this.Active = true;
    if (this.InteractionActor) {
      this.InteractionActor.Active = true;
    }
  }
}
(exports.SceneInteractionLevel = SceneInteractionLevel).Xt1 = false;
//# sourceMappingURL=SceneInteractionLevel.js.map