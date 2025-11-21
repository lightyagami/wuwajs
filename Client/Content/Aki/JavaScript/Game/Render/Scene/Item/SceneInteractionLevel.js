"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneInteractionLevel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SceneInteractionLevel {
  constructor() {
    this.LevelStreamingDynamic = undefined;
    this.LevelName = "";
    this.Location = undefined;
    this.Rotation = undefined;
    this.PbDataId = 0;
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
  Init(t, e, i, s, h, o, r, n, a = false, c = 0) {
    this.LevelStreamingDynamic = t;
    this.LevelName = e;
    this.Location = i;
    this.Rotation = s;
    this.HandleId = h;
    this.CurrentState = o;
    this.HasTempState = false;
    this.t_r = a;
    this.PbDataId = c;
    this.LevelStreamingDynamic.bInitiallyLoaded = true;
    this.LevelStreamingDynamic.bInitiallyVisible = true;
    this.LevelStreamingDynamic.SetShouldBeLoaded(true);
    this.LevelStreamingDynamic.SetShouldBeVisible(n);
    this.LoadingLevelComplete = false;
    this.IsDestroyed = false;
    this.OnLevelStreamingShowCallback = r;
    if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.Init]", ["HandleId", h], ["LevelName", e], ["IsInitShow", a], ["afterLoadVisible", n]);
    }
    this.LevelStreamingDynamic.OnLevelShown.Add(() => {
      this.i_r("Init");
    });
  }
  ToggleLevelVisible(t, e, i = undefined, s = "") {
    if (this.LevelStreamingDynamic?.IsValid()) {
      var h = this.GetAllActorsInLevel();
      if (h && !t && e) {
        for (let t = 0, e = h.Num(); t < e; t++) {
          var o = h.Get(t);
          if (o instanceof UE.Actor) {
            o.SetActorHiddenInGame(true);
          }
        }
      }
      this.LevelStreamingDynamic.SetShouldBeVisible(t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.ToggleLevelVisible]", ["HandleId", this.HandleId], ["LevelName", this.LevelName], ["Visible", t], ["NeedHidden", e], ["Reason", s]);
      }
      if (t) {
        this.OnLevelStreamingShowCallback = i;
        this.LevelStreamingDynamic.OnLevelShown.Clear();
        this.LevelStreamingDynamic.OnLevelShown.Add(() => {
          this.i_r(s);
        });
      } else {
        this.InteractionActor?.TryStopCurrentState();
        this.InteractionActor?.Clear();
        this.OnLevelStreamingHideCallback = i;
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
    this.OnLevelStreamingHideCallback = undefined;
  }
  Update(t) {
    if (!!this.Active && !this.IsDestroyed) {
      if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
        this.InteractionActor.Update(t);
      }
    }
  }
  SwitchToState(t, e, i, s) {
    if (this.Active) {
      if (this.InteractionActor) {
        return this.o_r(t, e, i, s);
      }
      this.HasTempState = true;
      this.TempTargetState = t;
      this.TempNeedTransition = e;
      this.TempForce = i;
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
    var e;
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid()) {
      e = undefined;
      if (!(e = this.InteractionActor.GetActorByKey(t))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderScene", 11, "获取actor失败 level:" + this.LevelName + " 不存在key=" + t + " 的Actor");
        }
      }
      return e;
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
  o_r(t, e, i, s) {
    return !!this.InteractionActor?.IsValid() && (i || this.CurrentState !== t ? (this.CurrentState = t, this.InteractionActor.SetState(t, e, s), true) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 13, "切换状态失败，无法切换到当前状态", ["LevelName", this.LevelName]), false));
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
  Dkd(t) {
    var i = ConfigManager_1.ConfigManager.RenderModuleConfig.LevelCustomPrimitiveData?.get(this.PbDataId);
    if (i && i.CustomPrimitiveDataIndex0.length > 0) {
      var s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelActors(t);
      for (let e = 0, t = s.Num(); e < t; ++e) {
        var h = s.Get(e);
        if (h.IsValid()) {
          var o = h.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
          for (let t = 0; t < o.Num(); t++) {
            var r = o.Get(e);
            if (r.IsValid()) {
              switch (i.CustomPrimitiveDataIndex0.length) {
                case CommonDefine_1.ONE:
                  r.SetCustomPrimitiveDataFloat(CommonDefine_1.ZERO, i.CustomPrimitiveDataIndex0[CommonDefine_1.ZERO]);
                  break;
                case CommonDefine_1.TWO:
                  r.SetCustomPrimitiveDataVector2(CommonDefine_1.ZERO, new UE.Vector2D(i.CustomPrimitiveDataIndex0[CommonDefine_1.ZERO], i.CustomPrimitiveDataIndex0[CommonDefine_1.ONE]));
                  break;
                case CommonDefine_1.THREE:
                  r.SetCustomPrimitiveDataVector3(CommonDefine_1.ZERO, new UE.Vector(i.CustomPrimitiveDataIndex0[CommonDefine_1.ZERO], i.CustomPrimitiveDataIndex0[CommonDefine_1.ONE], i.CustomPrimitiveDataIndex0[CommonDefine_1.TWO]));
                  break;
                case CommonDefine_1.FOUR:
                  r.SetCustomPrimitiveDataVector4(CommonDefine_1.ZERO, new UE.Vector4(i.CustomPrimitiveDataIndex0[CommonDefine_1.ZERO], i.CustomPrimitiveDataIndex0[CommonDefine_1.ONE], i.CustomPrimitiveDataIndex0[CommonDefine_1.TWO], i.CustomPrimitiveDataIndex0[CommonDefine_1.THREE]));
                  break;
                default:
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Interaction", 72, "[SceneInteractionLevel.OnLevelShow] CustomPrimitiveData太长", ["CustomPrimitiveData0", i.CustomPrimitiveDataIndex0]);
                  }
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Interaction", 72, "[SceneInteractionLevel.OnLevelShow] Comp无效", ["LevelName", this.LevelName]);
            }
          }
        }
      }
    }
  }
  i_r(t) {
    var e;
    var i;
    if (this.LevelStreamingDynamic) {
      this.LoadingLevelComplete = true;
      e = this.LevelStreamingDynamic.GetLoadedLevel();
      i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneInteractionLevelActor(e);
      this.InteractionActor = i;
      if (this.InteractionActor?.IsValid()) {
        this.InteractionActor.Init(this.PbDataId, this.HandleId, this.LevelName, () => {
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
        this.Dkd(e);
        if (SceneInteractionLevel.Xt1 && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 72, "[SceneInteractionLevel.OnLevelShow]", ["HandleId", this.HandleId], ["Reason", t], ["LastWorldOrigin", this.LevelStreamingDynamic?.LoadedLevel?.LastWorldOrigin], ["LevelName", this.LevelName]);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderScene", 11, "找不到关卡蓝图,查看prefab是否按照规范进行制作", ["LevelName", this.LevelName]);
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
  SetCollisionActorsOwner(e) {
    if (this.InteractionActor?.IsValid()) {
      if (this.InteractionActor.CollisionActors) {
        var i = this.InteractionActor.CollisionActors.Num();
        for (let t = 0; t < i; t++) {
          var s = this.InteractionActor.CollisionActors.Get(t);
          if (ObjectUtils_1.ObjectUtils.IsValid(s)) {
            s.SetOwner(e);
          }
        }
      }
      if (this.InteractionActor.PartCollisionActorsAndCorrespondingTags) {
        var h = this.InteractionActor.PartCollisionActorsAndCorrespondingTags.Num();
        for (let t = 0; t < h; t++) {
          var o = this.InteractionActor.PartCollisionActorsAndCorrespondingTags.GetKey(t);
          if (ObjectUtils_1.ObjectUtils.IsValid(o)) {
            o.SetOwner(e);
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
  GetPartCollisionActor(t) {
    if (this.InteractionActor?.IsValid() && this.InteractionActor.PartCollisionActorsAndCorrespondingTags) {
      var e = this.InteractionActor.PartCollisionActorsAndCorrespondingTags.Num();
      if (!(e <= t)) {
        return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.GetKey(t);
      }
    }
  }
  GetInteractionEffectHookActors() {
    if (this.InteractionActor.InteractionEffectHookActors) {
      return this.InteractionActor.InteractionEffectHookActors;
    }
  }
  PlayExtraEffect(t, e) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayExtraEffectOnTagsChange(t, e);
    }
  }
  PlayKuroSkeletalMeshDestruction(t, e) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayKuroSkeletalMeshDestruction(t, e);
    }
  }
  StopExtraEffect(t) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.StopExtraEffectOnTagsChange(t);
    }
  }
  UpdateHitInfo(t, e) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.UpdateHitInfo(t.ToUeVector(), e);
    }
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetActiveTagSequencePlaybackProgress(t);
    }
  }
  SetActiveTagSequencePlaybackProgress(t, e) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.SetActiveTagSequencePlaybackProgress(t, e);
    }
  }
  GetActiveTagSequenceDurationTime(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetActiveTagSequenceDurationTime(t);
    }
  }
  SetActiveTagSequenceDurationTime(t, e) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.SetActiveTagSequenceDurationTime(t, e);
    }
  }
  PauseActiveTagSequence(t) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PauseActiveTagSequence(t);
    }
  }
  ResumeActiveTagSequence(t, e = false) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.ResumeActiveTagSequence(t, e);
    }
  }
  GetIsActiveTagSequencePlayReverseFromConfig(t) {
    if (this.InteractionActor?.IsValid()) {
      return this.InteractionActor.GetIsActiveTagSequencePlayReverseFromConfig(t);
    }
  }
  PlayActiveTagSequenceTo(t, e, i = false) {
    if (this.InteractionActor?.IsValid()) {
      this.InteractionActor.PlayActiveTagSequenceTo(t, e, i);
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