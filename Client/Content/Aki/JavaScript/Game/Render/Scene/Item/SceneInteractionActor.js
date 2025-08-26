"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MechanismDefine_1 = require("../../../Module/MechanismTimeline/MechanismDefine");
const MechanismUtils_1 = require("../../../Module/MechanismTimeline/MechanismUtils");
const AttachToActorController_1 = require("../../../World/Controller/AttachToActorController");
const ItemMaterialManager_1 = require("./MaterialController/ItemMaterialManager");
const MAX_PHYSICS_SIMULATION_TIME = 5000;
class SequenceDirectorConfig {
  constructor(t, i = t.IsLoop, e = t.PlayRate, s = t.Reverse) {
    this.UeConfig = t;
    this.IsLoopOverride = i;
    this.PlayRateOverride = e;
    this.ReverseOverride = s;
  }
  get IsLoop() {
    return this.IsLoopOverride;
  }
  get PlayRate() {
    return this.PlayRateOverride;
  }
  get Reverse() {
    return this.ReverseOverride;
  }
  get Sequence() {
    return this.UeConfig.Sequence;
  }
}
class SkeletalMontageConfig {
  constructor(t, i = 0, e = false, s = 3) {
    this.UeConfig = t;
    this.PendingFrameCount = i;
    this.PendingCompHiddenInGame = e;
    this.PendingCompVisibilityBasedAnimTickOption = s;
  }
  IsPendingApplyProps() {
    return this.PendingFrameCount > 0;
  }
}
class EffectInfo {
  constructor(t, i) {
    this.Effect = t;
    this.IsInheritTimeDilation = i;
    this.EffectId = 0;
    this.IsPlaying = false;
  }
}
class SceneInteractionActor extends UE.KuroSceneInteractionActor {
  constructor() {
    super(...arguments);
    this.LevelName = "";
    this.HandleId = 0;
    this.PbDataId = 0;
    this.OnInitCallback = undefined;
    this.States = undefined;
    this.Effects = undefined;
    this.EffectsInheritTimeDilation = undefined;
    this.EndEffects = undefined;
    this.ReferenceActors = undefined;
    this.TagsAndCorrespondingEffects = undefined;
    this.CollisionActors = undefined;
    this.PartCollisionActorsAndCorrespondingTags = undefined;
    this.InteractionEffectHookActors = undefined;
    this.CharacterForOrgan = undefined;
    this.ActorsForProjection = undefined;
    this.MaterialForProjection = undefined;
    this.ReceivingDecalsActors = undefined;
    this.StaticMeshList = undefined;
    this.Active = true;
    this.IsClear = false;
    this.ActiveSequencePlayer = undefined;
    this.ActiveSequenceDirectorMap = undefined;
    this.DirectorConfigMap = undefined;
    this.ActiveEffectInfoMap = undefined;
    this.CurrentStateKey = undefined;
    this.CurrentState = undefined;
    this.TransitionState = undefined;
    this.TransitionStateKey = undefined;
    this.NextState = undefined;
    this.NextStateKey = undefined;
    this.InTransition = false;
    this.InWaitingForPlayableFinished = false;
    this.TransitionStateJumpToEnd = false;
    this.IsUseTransitionTime = false;
    this.SwitchingStateRemainTime = 0;
    this.IsPlayBack = false;
    this.KuroSceneInteractionActorSystem = undefined;
    this.ProjectionRootActor = undefined;
    this.IsProjecting = false;
    this.CharRenderingComponent = undefined;
    this.CharRenderingKey = 0;
    this.HitLocation = undefined;
    this.HitDirection = new UE.Vector(0, 0, 1);
    this.SkeletalMeshActors = undefined;
    this.AllSkeletalMeshActors = undefined;
    this.CharRenderingComponents = undefined;
    this.CrossStateEffectActors = undefined;
    this.InteractionMaterialController = undefined;
    this.ActorsOriginalRelTransform = undefined;
    this.BasePlatformInternal = undefined;
    this.RevertMaterialComponentsMaps = undefined;
    this.CurrentStateAkEventHandle = undefined;
    this.PlayingTagAkEventHandle = undefined;
    this.GlobalGi = undefined;
    this.SkeletalMontageConfigMap = undefined;
    this.SkeletalMeshDestructibleActorsInternal = undefined;
    this.SkeletalMeshDestructibleActorsList = undefined;
    this.SkeletalMeshDestructibleCellListMap = undefined;
    this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.InvalidId;
    this.SkeletalDestructibleTickIdList = undefined;
    this.DebugTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingStateEffects = [];
    this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingTagEffects = new Map();
    this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingCrossStateEffects = new Map();
    this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.OverrideEffectActor = undefined;
    this.OverrideEffectParmaFunc = undefined;
    this.IsAbpAnimPlayEnd = false;
    this.TagCharDaHandleList = undefined;
    this.OnEffectFinishCallback = undefined;
    this.OnEffectPlayingCallback = undefined;
    this.需要过渡状态 = true;
    this.跳过表现过程 = false;
    this.模拟状态 = 0;
    this.模拟Tag = undefined;
  }
  Constructor() {
    this.PbDataId = 0;
    this.OnInitCallback = undefined;
    this.Active = true;
    this.IsClear = false;
    this.ActiveSequencePlayer = undefined;
    this.ActiveSequenceDirectorMap = undefined;
    this.DirectorConfigMap = undefined;
    this.ActiveEffectInfoMap = undefined;
    this.CurrentStateKey = undefined;
    this.CurrentState = undefined;
    this.TransitionState = undefined;
    this.TransitionStateKey = undefined;
    this.NextState = undefined;
    this.NextStateKey = undefined;
    this.InTransition = false;
    this.InWaitingForPlayableFinished = false;
    this.TransitionStateJumpToEnd = false;
    this.IsUseTransitionTime = false;
    this.SwitchingStateRemainTime = 0;
    this.IsPlayBack = false;
    this.KuroSceneInteractionActorSystem = undefined;
    this.ProjectionRootActor = undefined;
    this.IsProjecting = false;
    this.CharRenderingComponent = undefined;
    this.CharRenderingKey = 0;
    this.HitLocation = undefined;
    this.HitDirection = new UE.Vector(0, 0, 1);
    this.CharRenderingComponents = undefined;
    this.CrossStateEffectActors = undefined;
    this.ActorsOriginalRelTransform = undefined;
    this.GlobalGi = undefined;
    this.SkeletalMontageConfigMap = undefined;
    this.SkeletalMeshDestructibleActorsInternal = undefined;
    this.SkeletalMeshDestructibleActorsList = undefined;
    this.SkeletalMeshDestructibleCellListMap = undefined;
    this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.InvalidId;
    this.SkeletalDestructibleTickIdList = undefined;
    this.DebugTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingStateEffects = [];
    this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingTagEffects = new Map();
    this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.PendingCrossStateEffects = new Map();
    this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    this.IsAbpAnimPlayEnd = false;
    this.TagCharDaHandleList = undefined;
    this.OnEffectFinishCallback = undefined;
  }
  get SkeletalMeshDestructibleActors() {
    this.SkeletalMeshDestructibleActorsInternal ||= new Set();
    return this.SkeletalMeshDestructibleActorsInternal;
  }
  get BasePlatform() {
    if (!this.BasePlatformInternal) {
      var i = this.GetAttachParentActor();
      if (!i) {
        return;
      }
      this.BasePlatformInternal = ActorSystem_1.ActorSystem.Get(UE.BP_BasePlatform_C.StaticClass(), this.D_GetTransform(), i);
      AttachToActorController_1.AttachToActorController.AttachToActor(this.BasePlatformInternal, i, 1, "SceneInteractionActor.BasePlatform", undefined, 2, 2, 2, false, true);
      let t = undefined;
      t = (t = this.CollisionActors && this.CollisionActors.Num() > 0 ? this.CollisionActors?.Get(0) : t) || i;
      i = (0, puerts_1.$ref)(undefined);
      t.D_GetActorBounds(true, undefined, i, true);
      i = (0, puerts_1.$unref)(i);
      i = Math.max(i.X, i.Y, i.Z);
      this.BasePlatformInternal.LeaveSphereRadius = i += 50;
      this.BasePlatformInternal.LeaveSphereCenter = new UE.Vector(0, 0, 0);
    }
    return this.BasePlatformInternal;
  }
  ReceiveBeginPlay() {
    var t;
    this.PlayingTagAkEventHandle = new Map();
    if (Info_1.Info.IsPlayInEditor && (t = this.GetLevel()?.OwningWorld, UE.KismetSystemLibrary.GetPathName(t?.CurrentLevel).includes("/Game/Aki/Scene/InteractionLevel/Prefab"))) {
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_GlobalGI_C", () => {
        this.GlobalGi = ActorSystem_1.ActorSystem.Get(UE.BP_GlobalGI_C.StaticClass(), this.D_GetTransform());
        this.GlobalGi.夜晚();
      });
      Info_1.Info.SetInCg(true);
      this.Init(0, -1, this.GetName(), undefined);
      this.DebugTickId = TickSystem_1.TickSystem.Add(t => {
        this.Update(t / 1000);
      }, "Game", 0, true).Id;
    }
  }
  ReceiveEndPlay() {
    if (this.BasePlatformInternal) {
      ActorSystem_1.ActorSystem.Put("SceneInteractionActor.ReceiveEndPlay1", this.BasePlatformInternal);
    }
    if (this.GlobalGi) {
      ActorSystem_1.ActorSystem.Put("SceneInteractionActor.ReceiveEndPlay2", this.GlobalGi);
    }
    if (this.CurrentStateAkEventHandle) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.CurrentStateAkEventHandle, 0);
    }
    if (this.PlayingTagAkEventHandle !== undefined && this.PlayingTagAkEventHandle.size > 0) {
      for (const t of this.PlayingTagAkEventHandle.values()) {
        AudioSystem_1.AudioSystem.ExecuteAction(t, 0);
      }
      this.PlayingTagAkEventHandle.clear();
    }
    this.RemoveDebugTicker();
  }
  RemoveDebugTicker() {
    if (this.DebugTickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.DebugTickId);
      this.DebugTickId = TickSystem_1.TickSystem.InvalidId;
    }
  }
  AddNewState() {
    this.States.Add(this.States.Num(), undefined);
  }
  AddNewEffect() {
    this.Effects.Add(this.Effects.Num(), undefined);
  }
  AddNewEndEffect() {
    this.EndEffects.Add(this.EndEffects.Num(), undefined);
  }
  ChangeDirection(t) {
    if (t && !this.IsPlayBack || !t && this.IsPlayBack) {
      if (this.ActiveSequencePlayer) {
        this.ActiveSequencePlayer.ChangePlaybackDirection();
      }
      if (this.CurrentState.AnimMontage.Montage && this.CurrentState.AnimMontage.SkeletalMesh) {
        this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(-this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.GetPlayRate());
      }
      this.IsPlayBack = !this.IsPlayBack;
    }
  }
  PlayStateBpMaterialRuntimeParUpdate(t) {
    if (t.BP_MaterialRuntimeParUpdate !== undefined) {
      t.BP_MaterialRuntimeParUpdate.IsPlay = true;
      t.BP_MaterialRuntimeParUpdate.Set_Initialize();
    }
  }
  PlayIndependentEffect(t) {
    var i = this.Effects.Get(t);
    if (i && (i.Effect && this.PlayEffect(i.Effect, "[SceneInteractionActor.PlayIndependentEffect]"), i.Material)) {
      for (let t = 0; t < i.Material.Actors.Num(); t++) {
        if (i.Material.Actors.Get(t) && i.Material.Data) {
          i.Material.TailIndex = ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(i.Material.Actors.Get(t), i.Material.Data);
        }
      }
    }
  }
  EndIndependentEffect(t) {
    var i = this.Effects.Get(t);
    if (i && (i.Effect && this.StopEffect(i.Effect, "[SceneInteractionActor.EndIndependentEffect]", false), ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)) {
      for (let t = 0; t < i.Material.Actors.Num(); t++) {
        var e = i.Material.TailIndex - t;
        ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
      }
    }
  }
  PlayIndependentEndEffect(t) {
    t = this.EndEffects.Get(t);
    if (t) {
      this.PlayEffect(t, "[SceneInteractionActor.PlayIndependentEndEffect]");
    }
  }
  Update(t) {
    if (t > 0 && this.SkeletalMontageConfigMap) {
      for (var [i, e] of this.SkeletalMontageConfigMap) {
        if (e.IsPendingApplyProps()) {
          --e.PendingFrameCount;
          if (!(e.PendingFrameCount > 0)) {
            if (i.SkeletalMeshComponent) {
              i.SkeletalMeshComponent.SetHiddenInGame(e.PendingCompHiddenInGame);
              i.SkeletalMeshComponent.VisibilityBasedAnimTickOption = e.PendingCompVisibilityBasedAnimTickOption;
            }
          }
        }
      }
    }
    if ((!!this.InTransition || !!this.InWaitingForPlayableFinished) && !this.CheckPlaying(t, this.CurrentState)) {
      this.DoSwitchState(false);
    }
  }
  SetTimeDilation(t) {
    if (this.CustomTimeDilation !== t) {
      this.CustomTimeDilation = t;
      this.UpdateTimeDilation();
    }
  }
  UpdateTimeDilation() {
    if (this.CurrentState) {
      var t;
      var i;
      var e = this.CustomTimeDilation;
      var s = this.CurrentState.AnimMontage;
      if (s && s.SkeletalMesh) {
        if ((t = s.SkeletalMesh.SkeletalMeshComponent).GetAnimationMode() === 0) {
          if (i = t.GetAnimInstance()) {
            if (i) {
              i.SetPlayRate(this.CustomTimeDilation);
            } else {
              t.SetPlayRate(s.PlayRate * e);
            }
          }
        } else {
          t.SetPlayRate(s.PlayRate * e);
        }
      }
      if (this.ActiveSequenceDirectorMap && this.DirectorConfigMap) {
        for (const o of this.ActiveSequenceDirectorMap.values()) {
          var h = o.SequencePlayer;
          var r = this.DirectorConfigMap.get(o);
          if (h?.IsValid() && r) {
            h.SetPlayRate(r.PlayRate * e);
          }
        }
      }
      if (this.ActiveEffectInfoMap?.size) {
        for (const a of this.ActiveEffectInfoMap.values()) {
          if (a.IsInheritTimeDilation && EffectSystem_1.EffectSystem.IsValid(a.EffectId)) {
            EffectSystem_1.EffectSystem.SetTimeScale(a.EffectId, e);
          }
        }
      }
    }
  }
  Init(t, i, e, s) {
    this.PbDataId = t;
    this.HandleId = i;
    this.LevelName = e;
    this.OnInitCallback = s;
    this.CurrentStateKey = 21;
    this.NextState = undefined;
    this.CurrentState = undefined;
    this.InTransition = false;
    this.IsPlayBack = false;
    this.Active = true;
    this.IsClear = false;
    if (this.CharacterForOrgan?.IsValid()) {
      this.CharRenderingComponent = this.CharacterForOrgan.D_AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, this.D_GetTransform(), false);
      this.CharRenderingComponent.Init(this.CharacterForOrgan.RenderType);
      this.CharRenderingKey = 0;
    }
    this.CharRenderingComponents = new Map();
    if (this.SkeletalMeshActors) {
      for (let t = 0; t < this.SkeletalMeshActors.Num(); t++) {
        var h = this.SkeletalMeshActors.Get(t);
        var r = h.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        this.CharRenderingComponents.set(r, t);
        r.Init(2);
        if (h.SkeletalMeshComponent) {
          r.AddComponentByCase(0, h.SkeletalMeshComponent);
        }
      }
    }
    this.OnEffectFinishCallback = t => {
      this.ActiveEffectInfoMap?.delete(t);
    };
    this.OnEffectPlayingCallback = t => {
      t = this.ActiveEffectInfoMap?.get(t);
      if (t) {
        t.IsPlaying = true;
      }
      if (this.CheckAllEffectPlaying()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.HandleId);
      }
    };
    if (this.States) {
      for (let t = 0; t < this.States.Num(); t++) {
        if (this.States.IsValidIndex(t)) {
          var o = this.States.GetKey(t);
          var a = this.States.Get(o);
          if (a && a.CrossStateEffects) {
            for (let t = 0; t < a.CrossStateEffects.Num(); t++) {
              var n = a.CrossStateEffects.Get(t);
              if (n && n.Effect) {
                this.CrossStateEffectActors ||= new Set();
                this.CrossStateEffectActors.add(n.Effect);
              }
            }
          }
        }
      }
    }
    if (this.ReferenceActors?.Num()) {
      this.ActorsOriginalRelTransform = new Map();
      for (let t = 0; t < this.ReferenceActors.Num(); ++t) {
        var c;
        var f = this.ReferenceActors.GetKey(t);
        var f = this.ReferenceActors.Get(f);
        if (f) {
          c = f.D_GetTransform().GetRelativeTransform(this.D_GetTransform());
          this.ActorsOriginalRelTransform.set(f, c);
        }
      }
    }
    this.RevertMaterialComponentsMaps = new Map();
    if (this.States) {
      for (let t = 0, i = this.States.Num(); t < i; ++t) {
        var l = this.States.GetKey(t);
        var l = this.States.Get(l);
        var v = new Array();
        v.push(l.SkeletalMeshDestructible.PlayDestructionAllImmediately);
        v.push(l.SkeletalMeshDestructible.CanPlayDestructionWhenHit);
        for (const u of v) {
          for (let t = 0, i = u.Num(); t < i; ++t) {
            var S = u.Get(t);
            if (S?.IsValid()) {
              this.SkeletalMeshDestructibleActors.add(S);
            }
          }
        }
      }
    }
    if (this.TagsAndCorrespondingEffects) {
      for (let t = 0, i = this.TagsAndCorrespondingEffects.Num(); t < i; ++t) {
        var d = this.TagsAndCorrespondingEffects.GetKey(t);
        var _ = this.TagsAndCorrespondingEffects.Get(d);
        for (let t = 0, i = _.SkeletalMeshDestructibleActors.Num(); t < i; ++t) {
          var m = _.SkeletalMeshDestructibleActors.Get(t);
          if (m?.IsValid()) {
            this.SkeletalMeshDestructibleActors.add(m);
          }
        }
      }
    }
    if (this.SkeletalMeshDestructibleActors && this.SkeletalMeshDestructibleActors.size > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 57, "开始异步显示SceneInteractionActor", ["LevelName", this.LevelName]);
      }
      for (const y of this.SkeletalMeshDestructibleActors) {
        for (let t = 0, i = y.StaticMeshChunkList.Num(); t < i; ++t) {
          var g = y.StaticMeshChunkList.Get(t);
          if (g?.IsValid()) {
            g.K2_DestroyComponent(g);
          }
        }
        y.StaticMeshChunkList.Empty();
      }
      this.SkeletalMeshDestructibleActorsList = [];
      this.SkeletalMeshDestructibleCellListMap = new Map();
      this.RemoveStaticMeshDestructibleTicker();
      this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.Add(t => {
        this.SkeletalMeshDestructibleTick(t);
      }, "SkeletalMeshDestructibleTick", 0, true).Id;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 57, "正常显示SceneInteractionActor", ["LevelName", this.LevelName]);
      }
      this.OnInitCallback?.();
    }
    if (!ModelManager_1.ModelManager.LevelPrefabConfigModel?.IsCloseUroPrefab(this.LevelName)) {
      this.ApplyAnimOptimizationParams();
    }
  }
  SkeletalMeshDestructibleTick(t) {
    SceneInteractionActor.DestructibleInitStat.Start();
    for (const s of this.SkeletalMeshDestructibleActors.values()) {
      var i = s.KuroDestructibleAsset?.PieceInfos;
      if (i) {
        let t = 0;
        if (!((t = this.SkeletalMeshDestructibleCellListMap.has(s) ? this.SkeletalMeshDestructibleCellListMap.get(s) : t) >= i.Num())) {
          var i = i.Get(t);
          SceneInteractionActor.TempTransform.SetIdentity();
          SceneInteractionActor.TempTransform.SetTranslation(i.InitialTransform.GetTranslation());
          var e = s.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, SceneInteractionActor.TempTransform, false);
          if (!e?.IsValid()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Interaction", 72, "StaticMeshComponent AddComponentByClass 返回无效值", ["LevelName", this.LevelName], ["Location", this.K2_GetActorLocation()], ["D_Location", this.D_K2_GetActorLocation()], ["World", this.GetWorld()], ["WorldIsTearingDown", UE.KuroStaticLibrary.IsWorldTearingDown(this.GetWorld())]);
            }
            break;
          }
          e.SetVisibility(false);
          if (s.KuroDestructibleDestructionAsset?.IsValid()) {
            e.SetCollisionProfileName(s.KuroDestructibleDestructionAsset.CollisionProfileName.Name);
          }
          e.SetCollisionEnabled(2);
          e.SetStaticMesh(i.StaticMesh);
          s.StaticMeshChunkList.Add(e);
          this.SkeletalMeshDestructibleCellListMap.set(s, ++t);
          break;
        }
        if (!this.SkeletalMeshDestructibleActorsList.includes(s)) {
          s.OnDestructibleInit();
          this.SkeletalMeshDestructibleActorsList.push(s);
        }
      } else {
        s.OnDestructibleInit();
        this.SkeletalMeshDestructibleActorsList.push(s);
      }
    }
    if (this.SkeletalMeshDestructibleActorsList.length >= this.SkeletalMeshDestructibleActors.size) {
      this.RemoveStaticMeshDestructibleTicker();
      TimerSystem_1.TimerSystem.Next(() => {
        if (this.IsValid() && this.Active && !this.IsClear) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 57, "正常结束异步显示SceneInteractionActor", ["LevelName", this.LevelName]);
          }
          this.OnInitCallback?.();
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 57, "中断结束异步显示SceneInteractionActor", ["LevelName", this.LevelName], ["this.IsValid()", this.IsValid()], ["this.Active", this.Active], ["this.IsClear", this.IsClear]);
        }
      });
    }
    SceneInteractionActor.DestructibleInitStat.Stop();
  }
  Clear() {
    this.IsClear = true;
    this.SkeletalMeshDestructibleActorsInternal = undefined;
    this.SkeletalMeshDestructibleActorsList = undefined;
    this.SkeletalMeshDestructibleCellListMap = undefined;
    this.RemoveStaticMeshDestructibleTicker();
    this.RemoveSkeletalDestructibleTicker();
    if (this.ActiveSequenceDirectorMap !== undefined) {
      for (var [t] of this.ActiveSequenceDirectorMap) {
        this.StopSequence(t);
      }
    }
  }
  GetActorByKey(t) {
    if (this.ReferenceActors) {
      return this.ReferenceActors.Get(t);
    }
  }
  GetRefActorsByTag(t) {
    if (this.TagsAndCorrespondingEffects) {
      return this.TagsAndCorrespondingEffects.Get(t)?.Actors;
    }
  }
  GetAllActor() {
    if (this.ReferenceActors) {
      return this.ReferenceActors;
    }
  }
  GetActorOriginalRelTransform(t) {
    if (this.ActorsOriginalRelTransform && t?.IsValid()) {
      return this.ActorsOriginalRelTransform.get(t);
    }
  }
  GetCurrentState() {
    return this.CurrentStateKey;
  }
  PlayEffect(i, e) {
    if (i?.IsValid()) {
      var s = this.EffectsInheritTimeDilation?.Contains(i) ?? false;
      i.Play(e);
      var e = (0, puerts_1.$ref)(undefined);
      i.GetHandle(e);
      var e = (0, puerts_1.$unref)(e);
      if (EffectSystem_1.EffectSystem.IsValid(e)) {
        if (this.ActiveEffectInfoMap === undefined) {
          this.ActiveEffectInfoMap = new Map();
        }
        let t = this.ActiveEffectInfoMap.get(e);
        if (!t) {
          (t = new EffectInfo(i, s)).EffectId = e;
          this.ActiveEffectInfoMap.set(e, t);
        }
        if (EffectSystem_1.EffectSystem.IsPlaying(e)) {
          t.IsPlaying = true;
        } else {
          t.IsPlaying = false;
          EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(e, this.OnEffectPlayingCallback);
        }
        if (t.IsInheritTimeDilation) {
          EffectSystem_1.EffectSystem.SetTimeScale(e, this.CustomTimeDilation);
        }
        EffectSystem_1.EffectSystem.AddFinishCallback(e, this.OnEffectFinishCallback);
        if (this.OverrideEffectParmaFunc && i === this.OverrideEffectActor) {
          this.OverrideEffectParmaFunc();
        }
      }
    }
  }
  CheckAllEffectPlaying() {
    if (!this.ActiveEffectInfoMap) {
      return false;
    }
    for (const t of this.ActiveEffectInfoMap.values()) {
      if (!t.IsPlaying) {
        return false;
      }
    }
    return true;
  }
  StopEffect(t, i, e) {
    if (t?.IsValid()) {
      t.Stop(i, e);
    }
  }
  PlaySequence(i, t, e, s) {
    if (this.Active) {
      if (this.DirectorConfigMap === undefined) {
        this.DirectorConfigMap = new Map();
      }
      this.DirectorConfigMap.set(i, new SequenceDirectorConfig(t));
      i.SetActorTickEnabled(true);
      var h = i?.GetComponentByClass(UE.AkComponent.StaticClass());
      if (h?.IsValid()) {
        h.SetComponentTickEnabled(true);
      }
      this.GetKuroSceneInteractionActorSystem().SetSequenceWithTargetLevelActor(i, t.Sequence, this);
      for (let t = 0; t < e.Num(); t++) {
        var r = e.Get(t);
        if (r) {
          this.GetKuroSceneInteractionActorSystem().BindActorToLevelSequenceActor(r, i, UE.KismetSystemLibrary.GetDisplayName(r));
        }
      }
      if (i.SequencePlayer) {
        ModelManager_1.ModelManager.MechanismTimelineModel.RegisterSequenceContext(i.SequencePlayer, new MechanismDefine_1.MechanismEventLevelPrefabContext(this.PbDataId, this.HandleId));
        this.IsPlayBack = false;
        if (t.IsLoop) {
          if (t.Reverse) {
            i.SequencePlayer.PlayReverseLooping();
          } else {
            i.SequencePlayer.PlayLooping();
          }
        } else if (t.Reverse) {
          i.SequencePlayer.PlayReverse();
        } else {
          i.SequencePlayer.Play();
        }
        if (s) {
          h = (t.Reverse ? i.SequencePlayer.GetStartTime() : i.SequencePlayer.GetEndTime()).Time;
          s = new UE.MovieSceneSequencePlaybackParams(h, 0, "", 0, 0);
          i.SequencePlayer.SetPlaybackPosition(s);
        }
        i.SequencePlayer.SetPlayRate(t.PlayRate * this.CustomTimeDilation);
      }
    }
  }
  StopSequence(t) {
    var t = this.GetDirectorBySequence(t);
    if (t && (t.SequencePlayer.Stop(), t.SetActorTickEnabled(false), (t = t?.GetComponentByClass(UE.AkComponent.StaticClass()))?.IsValid())) {
      t.SetComponentTickEnabled(false);
    }
  }
  PlayKuroSkeletalMeshDestruction(t, i) {
    if (this.CurrentState?.SkeletalMeshDestructible.CanPlayDestructionWhenHit && t.IsA(UE.KuroDestructibleActor.StaticClass()) && this.CurrentState.SkeletalMeshDestructible.CanPlayDestructionWhenHit.FindIndex(t) !== -1) {
      this.PlaySkeletalMeshDestruction(t, i);
    }
  }
  PlaySkeletalMeshDestruction(i, t) {
    if (i?.IsValid()) {
      if (t) {
        i.SetActorHiddenInGame(true);
        i.SetActorEnableCollision(false);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneGameplay", 57, "[SceneInteractionActor]PlaySkeletalMeshDestruction", ["DestructActor:", i.GetName()], ["Location:", i.K2_GetActorLocation()]);
        }
        var e = i.StaticMeshChunkList.Num();
        for (let t = 0; t < e; ++t) {
          var s = i.StaticMeshChunkList.Get(t);
          if (s?.IsValid()) {
            s.K2_DetachFromComponent(1, 1, 1, true);
          }
        }
        if (i.NewPoseableMeshComponent?.IsValid()) {
          i.NewPoseableMeshComponent.Activate();
        }
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.PbDataId);
        if ((i.KuroDestructibleDestructionAsset?.bTrunksKeepLinearVelocity || i.KuroDestructibleDestructionAsset?.bTrunksKeepAngularVelocity) && t?.Valid && t.Entity?.Valid && (t = t.Entity.CheckGetComponent(1)) && (t = t.Owner?.GetComponentByClass(UE.PrimitiveComponent.StaticClass())) && t.IsSimulatingPhysics() && (i.KuroDestructibleDestructionAsset?.bTrunksKeepLinearVelocity && i.ProxyMeshComponent?.SetPhysicsLinearVelocity(t.GetPhysicsLinearVelocity()), i.KuroDestructibleDestructionAsset?.bTrunksKeepAngularVelocity)) {
          i.ProxyMeshComponent?.SetPhysicsAngularVelocityInDegrees(t.GetPhysicsAngularVelocityInDegrees());
        }
        if (this.HitLocation) {
          t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.HitLocation);
          i.ApplyDamage(t, this.HitDirection);
        } else {
          t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(i.D_K2_GetActorLocation());
          i.ApplyDamage(t, this.HitDirection);
        }
        this.SkeletalDestructibleTickIdList ||= [];
        const h = TickSystem_1.TickSystem.Add(t => {
          SceneInteractionActor.DestructiblePostPhysicsStat.Start();
          i.ApplyTransformToPoseableMeshComponent(0);
          SceneInteractionActor.DestructiblePostPhysicsStat.Stop();
        }, "SkeletalDestructibleTickId", 4, true).Id;
        this.SkeletalDestructibleTickIdList.push(h);
        TimerSystem_1.TimerSystem.Delay(() => {
          var t;
          if (this.SkeletalDestructibleTickIdList && (t = this.SkeletalDestructibleTickIdList.indexOf(h), this.SkeletalDestructibleTickIdList.splice(t, 1), TickSystem_1.TickSystem.Has(h) && TickSystem_1.TickSystem.Remove(h), i.NewPoseableMeshComponent?.IsValid())) {
            i.NewPoseableMeshComponent.Deactivate();
          }
        }, MAX_PHYSICS_SIMULATION_TIME);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 72, "可破坏物SceneInteractionActor配置有错", ["LevelName", this.LevelName], ["CurrentState", this.CurrentState]);
    }
  }
  GetActiveSequencePlaybackProgress(i) {
    var i = this.GetDirectorBySequence(i);
    var e = i?.SequencePlayer;
    if (i && e?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var s = e.GetDuration().Time;
        var s = s.FrameNumber.Value + s.SubFrame;
        if (!(s < 1)) {
          var h = e.GetStartTime().Time;
          var r = e.GetEndTime().Time;
          var h = h.FrameNumber.Value + h.SubFrame;
          var r = r.FrameNumber.Value + r.SubFrame;
          if (!(r < h)) {
            e = e.GetCurrentTime().Time;
            e = e.FrameNumber.Value + e.SubFrame;
            let t = 0;
            t = i.Reverse ? r - e : e - h;
            t = MathUtils_1.MathUtils.Clamp(t, h, r);
            return MathUtils_1.MathUtils.Clamp(t / s, 0, 1);
          }
        }
      }
    }
  }
  SetActiveSequencePlaybackProgress(i, e) {
    var i = this.GetDirectorBySequence(i);
    var s = i?.SequencePlayer;
    if (i && s?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var h = s.GetDuration().Time;
        var h = h.FrameNumber.Value + h.SubFrame;
        var e = h * MathUtils_1.MathUtils.Clamp(e, 0, 1);
        if (!(h < 1) && !(h < e)) {
          var h = s.GetStartTime().Time;
          var r = s.GetEndTime().Time;
          var h = h.FrameNumber.Value + h.SubFrame;
          var r = r.FrameNumber.Value + r.SubFrame;
          if (!(r < h)) {
            let t = 0;
            t = i.Reverse ? r - e : h + e;
            t = MathUtils_1.MathUtils.Clamp(t, h, r);
            i = Math.floor(t);
            e = t - i;
            h = new UE.FrameTime(new UE.FrameNumber(i), e);
            r = s.GetCurrentTime().Time;
            i = r.FrameNumber.Value + r.SubFrame;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 39, "SetActiveSequencePlaybackProgress", ["current", i], ["new", t]);
            }
            if (!MathUtils_1.MathUtils.IsNearlyEqual(i, t, MathUtils_1.MathUtils.KindaSmallNumber)) {
              e = new UE.MovieSceneSequencePlaybackParams(h, 0, "", 0, 0);
              s.SetPlaybackPosition(e);
            }
          }
        }
      }
    }
  }
  SetActorCollisionProfile(i) {
    if (i) {
      for (let t = 0; t < i.Num(); t++) {
        var e = i.GetKey(t);
        var s = i.Get(e);
        if (e && s) {
          let t = undefined;
          if ((t = e.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) || (t = e.GetComponentByClass(UE.ShapeComponent.StaticClass()))) {
            if (t.GetCollisionProfileName() === s.Name) {
              return;
            }
            t.SetCollisionProfileName(s.Name, true);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Interaction", 79, "场景交互物状态机碰撞预设配置不合法, 检查配置", ["交互物Actor", this.LevelName], ["碰撞Actor", e], ["碰撞Profile", s]);
        }
      }
    }
  }
  GetActiveTagSequencePlaybackProgress(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      return this.GetActiveSequencePlaybackProgress(t);
    }
  }
  SetActiveTagSequencePlaybackProgress(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      this.SetActiveSequencePlaybackProgress(t, i);
    }
  }
  GetActiveSequenceDurationTime(t) {
    var t = this.GetDirectorBySequence(t);
    var i = t?.SequencePlayer;
    if (t && i?.IsValid() && this.DirectorConfigMap?.get(t)) {
      t = i.GetDuration();
      i = t.Time.FrameNumber.Value + t.Time.SubFrame;
      if (!(i < 1)) {
        return i * (t.Rate.Denominator / t.Rate.Numerator);
      }
    }
  }
  GetActiveSequenceRemainTime(e) {
    var s;
    var e = this.GetDirectorBySequence(e);
    var h = e?.SequencePlayer;
    if (e && h?.IsValid() && this.DirectorConfigMap?.get(e)) {
      let t = 0;
      let i = 0;
      i = h.IsReversed() ? (e = h.GetStartTime(), s = h.GetCurrentTime(), t = s.Time.FrameNumber.Value + s.Time.SubFrame - e.Time.FrameNumber.Value - e.Time.SubFrame, s.Rate.Denominator / s.Rate.Numerator) : (e = h.GetEndTime(), s = h.GetCurrentTime(), t = e.Time.FrameNumber.Value + e.Time.SubFrame - s.Time.FrameNumber.Value - s.Time.SubFrame, s.Rate.Denominator / s.Rate.Numerator);
      if (!(t < 1)) {
        return t * i;
      }
    }
  }
  GetActiveTagSequenceDurationTime(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      return this.GetActiveSequenceDurationTime(t);
    }
  }
  SetActiveSequenceDurationTime(t, i) {
    var e;
    var s;
    var t = this.GetDirectorBySequence(t);
    var h = t?.SequencePlayer;
    if (t && h?.IsValid()) {
      if (!!(t = this.DirectorConfigMap?.get(t)) && !((s = (e = h.GetDuration()).Time.FrameNumber.Value + e.Time.SubFrame) < 1)) {
        if ((s = s * (e.Rate.Denominator / e.Rate.Numerator) / i) && isFinite(s) && !isNaN(s) && !MathUtils_1.MathUtils.IsNearlyZero(s)) {
          t.PlayRateOverride = s;
          h.SetPlayRate(s * this.CustomTimeDilation);
        }
      }
    }
  }
  SetActiveTagSequenceDurationTime(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      this.SetActiveSequenceDurationTime(t, i);
    }
  }
  PauseActiveSequence(t) {
    var t = this.GetDirectorBySequence(t);
    var i = t?.SequencePlayer;
    if (t && i?.IsValid()) {
      if (!i.IsPaused()) {
        i.Pause();
      }
    }
  }
  PauseActiveTagSequence(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      this.PauseActiveSequence(t);
    }
  }
  ResumeActiveSequence(t, i = false) {
    var t = this.GetDirectorBySequence(t);
    var e = t?.SequencePlayer;
    if (t && e?.IsValid() && (t = this.DirectorConfigMap?.get(t))) {
      if (e.IsPlaying()) {
        e.Pause();
      }
      t.ReverseOverride = i ? !t.UeConfig.Reverse : t.UeConfig.Reverse;
      if (t.Reverse) {
        if (t.IsLoop) {
          e.PlayReverseLooping();
        } else {
          e.PlayReverse();
        }
      } else if (t.IsLoop) {
        e.PlayLooping();
      } else {
        e.Play();
      }
    }
  }
  ResumeActiveTagSequence(t, i = false) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      this.ResumeActiveSequence(t, i);
    }
  }
  GetIsActiveSequencePlayReverseFromConfig(t) {
    var t = this.GetDirectorBySequence(t);
    var i = t?.SequencePlayer;
    if (t && i?.IsValid()) {
      i = this.DirectorConfigMap?.get(t);
      if (i) {
        return i.Reverse !== i.UeConfig.Reverse;
      }
    }
  }
  GetIsActiveTagSequencePlayReverseFromConfig(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      return this.GetIsActiveSequencePlayReverseFromConfig(t);
    }
  }
  PlayActiveSequenceTo(i, e, s = false) {
    var i = this.GetDirectorBySequence(i);
    var h = i?.SequencePlayer;
    if (i && h?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var r = h.GetDuration().Time;
        var r = r.FrameNumber.Value + r.SubFrame;
        var e = r * MathUtils_1.MathUtils.Clamp(e, 0, 1);
        if (!(r < 1) && !(r < e)) {
          var r = h.GetStartTime().Time;
          var o = h.GetEndTime().Time;
          var r = r.FrameNumber.Value + r.SubFrame;
          var o = o.FrameNumber.Value + o.SubFrame;
          if (!(o < r)) {
            let t = 0;
            i.ReverseOverride = s ? !i.UeConfig.Reverse : i.UeConfig.Reverse;
            t = i.Reverse ? o - e : r + e;
            t = MathUtils_1.MathUtils.Clamp(t, r, o);
            s = Math.floor(t);
            e = t - s;
            r = new UE.FrameTime(new UE.FrameNumber(s), e);
            o = h.GetCurrentTime().Time;
            s = o.FrameNumber.Value + o.SubFrame;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 39, "PlayActiveSequenceTo", ["current", s], ["target", t]);
            }
            if (!MathUtils_1.MathUtils.IsNearlyEqual(s, t, MathUtils_1.MathUtils.KindaSmallNumber)) {
              e = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0);
              h.PlayTo_Circle(e, false, !i.Reverse);
            }
          }
        }
      }
    }
  }
  PlayActiveTagSequenceTo(t, i, e = false) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) {
      this.PlayActiveSequenceTo(t, i, e);
    }
  }
  PlayState(t, i, e, s) {
    if (t) {
      this.PlayStateSequence(t, e);
      this.PlayStateMontage(t, i);
      this.PlayStateEffect(t);
      this.PlayStateMaterialController(t, e);
      this.PlayStateCharMaterialControllerNew(t);
      this.PlayStateCrossStateEffects(t);
      this.PostStateAkEvent(t, e);
      this.SetStateActorShow(t);
      this.SetStateActorHide(t);
      this.PlayStateBasedEffect(t, s);
      this.PlayStateSkeletalMeshDestruction(t, e);
      this.PlayStateBpMaterialRuntimeParUpdate(t);
      this.SetStateActorCollisionProfile(t, i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderScene", 13, "场景交互物切换状态", ["Actor", this.LevelName], ["HandleID", this.HandleId], ["已切换状态到:", this.CurrentStateKey + 1]);
      }
      this.CurrentState = t;
      this.IsAbpAnimPlayEnd = false;
    }
  }
  PlayStateSequence(t, i) {
    var e;
    if (t.Sequence.Sequence && ((e = this.ActiveSequencePlayer?.Sequence) && e !== t.Sequence.Sequence && this.StopSequence(e), e = this.CreateDirectorBySequence(t.Sequence.Sequence))) {
      this.ActiveSequencePlayer = e.SequencePlayer;
      this.PlaySequence(e, t.Sequence, t.Actors, i);
    }
  }
  PlayStateMontage(i, e) {
    if (i.AnimMontage.SkeletalMesh && i.AnimMontage.Montage && (!e?.AnimMontage.Montage || e.AnimMontage.Montage !== i.AnimMontage.Montage)) {
      if (this.SkeletalMontageConfigMap === undefined) {
        this.SkeletalMontageConfigMap = new Map();
      }
      let t = this.SkeletalMontageConfigMap.get(i.AnimMontage.SkeletalMesh);
      if (!t) {
        t = new SkeletalMontageConfig(i.AnimMontage);
        this.SkeletalMontageConfigMap.set(i.AnimMontage.SkeletalMesh, t);
      }
      var s;
      var h = i.AnimMontage.SkeletalMesh.SkeletalMeshComponent;
      if (e === undefined || i.AnimMontage.SkeletalMesh.bHidden || h.bHiddenInGame) {
        if (!t.IsPendingApplyProps()) {
          t.PendingCompHiddenInGame = h.bHiddenInGame;
          t.PendingCompVisibilityBasedAnimTickOption = h.VisibilityBasedAnimTickOption;
        }
        t.PendingFrameCount = 2;
        h.VisibilityBasedAnimTickOption = 0;
        h.SetHiddenInGame(true);
      }
      if (h.GetAnimationMode() === 0 && (e = h.GetAnimInstance())) {
        if (s = e) {
          s.SetState(i.Name);
          s.SetPlayRate(this.CustomTimeDilation);
        } else {
          e.Montage_Play(i.AnimMontage.Montage, i.AnimMontage.PlayRate * this.CustomTimeDilation);
        }
      } else {
        h.PlayAnimation(i.AnimMontage.Montage, i.AnimMontage.Loop);
        h.SetPlayRate(i.AnimMontage.PlayRate * this.CustomTimeDilation);
      }
    }
  }
  ApplyAnimOptimizationParams(i = true) {
    if (this.AllSkeletalMeshActors) {
      var e = Info_1.Info.IsMobilePlatform();
      var s = new UE.AnimUpdateRateParameters();
      for (let t = 0; t < this.AllSkeletalMeshActors.Num(); t++) {
        var h = this.AllSkeletalMeshActors.Get(t);
        if (h) {
          h = h.SkeletalMeshComponent;
          if (h) {
            var r = h.LODInfo.Num();
            if (i) {
              s.bShouldUseDistanceMap = true;
              s.BaseVisibleDistanceThresholds.Empty();
              s.BaseVisibleDistanceThresholds.Add(e ? 500 : 800);
              s.BaseVisibleDistanceThresholds.Add(e ? 1000 : 1500);
              s.BaseVisibleDistanceThresholds.Add(e ? 1500 : 4000);
              s.BaseVisibleDistanceThresholds.Add(e ? 2000 : 5000);
              s.BaseVisibleDistanceThresholds.Add(e ? 3000 : 8000);
            } else {
              s.bShouldUseLodMap = true;
              s.LODToFrameSkipMap.Empty();
              for (let t = 0; t < r; t++) {
                var o = t < 2 ? 0 : t - 1;
                s.LODToFrameSkipMap.Add(t, o);
              }
            }
            s.BaseNonRenderedUpdateRate = e ? 15 : 8;
            s.MaxEvalRateForInterpolation = 8;
            var a = (0, puerts_1.$ref)(s);
            h.SetAnimUpdateRateParameters(a);
            (0, puerts_1.$unref)(a);
            h.bEnableUpdateRateOptimizations = true;
            h.VisibilityBasedAnimTickOption = 3;
            h.bUpdateOverlapsOnAnimationFinalize = false;
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Interaction", 31, "AllSkeletalMeshActors中有空的值，请找对应策划进行修改", ["LevelName", this.LevelName]);
        }
      }
    }
  }
  PlayStateEffect(i) {
    if (i.Effects) {
      for (let t = 0; t < i.Effects.Num(); t++) {
        this.PendingStateEffects.push(i.Effects.Get(t));
      }
      this.PendingStateEffectTickId = TickSystem_1.TickSystem.Add(t => {
        this.PendingPlayStateEffect();
      }, "SceneInteractionActor.PendingStateEffectTick", 0, true).Id;
    }
  }
  PendingPlayStateEffect() {
    var t;
    if (this.PendingStateEffects.length === 0) {
      this.RemovePendingStateEffectTick();
      if (this.CheckAllEffectPlaying()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.HandleId);
      }
    } else if (t = this.PendingStateEffects?.shift()) {
      this.PlayEffect(t, "[SceneInteractionActor.PendingPlayStateEffect]");
    }
  }
  RemovePendingStateEffectTick() {
    if (this.PendingStateEffectTickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.PendingStateEffectTickId);
      this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    }
  }
  PlayStateMaterialController(t, e) {
    var s;
    var h = t.MaterialControllers;
    if (h) {
      for (let i = 0; i < h.Num(); i++) {
        if (h.Get(i).Materials) {
          var r = h.Get(i).Materials;
          var o = h.Get(i).Actors;
          for (let t = 0; t < o.Num(); t++) {
            var a = o.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
            for (let t = 0; t < a.Num(); t++) {
              var n = a.Get(t);
              if (!h.Get(i).IsRevertMaterial) {
                this.RevertMaterialComponentsMaps?.set(n, new Map());
              }
              var c = n.GetNumMaterials();
              var f = n.GetMaterials();
              for (let t = 0; t < c; t++) {
                if (!h.Get(i).IsRevertMaterial) {
                  this.RevertMaterialComponentsMaps?.get(n)?.set(t, f.Get(t));
                }
                n.SetMaterial(t, r);
              }
            }
          }
        }
        for (let t = 0; t < h.Get(i).Actors.Num(); t++) {
          if (h.Get(i).Actors.Get(t) && h.Get(i).Data && (s = ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.get(h.Get(i).TailIndex = ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(h.Get(i).Actors.Get(t), h.Get(i).Data))?.GetLifeTimeController(), e)) {
            s?.JumpToEnd();
          }
        }
      }
    }
  }
  PlayStateCharMaterialControllerNew(i) {
    if (i.CharacterDataGroupForOrgan?.IsValid() && this.CharRenderingComponents) {
      var t = this.CharRenderingComponents.keys();
      var e = Array.from(t);
      var s = e.length;
      for (let t = 0; t < s; t++) {
        var h = e[t].AddMaterialControllerDataGroup(i.CharacterDataGroupForOrgan);
        this.CharRenderingComponents.set(e[t], h);
      }
    }
  }
  PlayTagCharMaterialControllerNew(t) {
    if (this.TagsAndCorrespondingEffects) {
      var i = this.TagsAndCorrespondingEffects.Get(t)?.CharacterDataGroupForOrgan;
      if (i?.IsValid() && this.CharRenderingComponents) {
        var t = this.CharRenderingComponents.keys();
        var e = Array.from(t);
        var s = e.length;
        for (let t = 0; t < s; t++) {
          var h = e[t].AddMaterialControllerDataGroup(i);
          this.CharRenderingComponents.set(e[t], h);
          this.TagCharDaHandleList ||= [];
          this.TagCharDaHandleList.push(h);
        }
      }
    }
  }
  PlayStateCrossStateEffects(i) {
    if (i.CrossStateEffects) {
      const o = new Set();
      for (let t = 0; t < i.CrossStateEffects.Num(); t++) {
        var e;
        var s;
        var h;
        var r = i.CrossStateEffects.Get(t);
        if (r && r.Effect?.IsValid()) {
          e = r.Effect;
          o.add(e);
          s = (0, puerts_1.$ref)(undefined);
          e.GetHandle(s);
          s = (0, puerts_1.$unref)(s);
          if (EffectSystem_1.EffectSystem.IsValid(s)) {
            h = r.EffectExtraState;
            EffectSystem_1.EffectSystem.SetEffectExtraState(s, h);
          } else {
            this.PendingCrossStateEffects.set(e, r.EffectExtraState);
          }
        }
      }
      this.CrossStateEffectActors?.forEach(t => {
        if (!o.has(t)) {
          if (this.PendingCrossStateEffects.has(t)) {
            this.PendingCrossStateEffects.delete(t);
          }
          this.StopEffect(t, "[SceneInteractionActor.PlayStateCrossStateEffects]", false);
        }
      });
      if (this.PendingCrossStateEffects.size > 0 && this.PendingCrossStateEffectTickId === TickSystem_1.TickSystem.InvalidId) {
        this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.Add(t => {
          this.PendingPlayCrossStateEffect();
        }, "SceneInteractionActor.PendingCrossStateEffectTick", 0, true).Id;
      }
    }
  }
  PendingPlayCrossStateEffect() {
    var t;
    var i;
    var e;
    if (this.PendingCrossStateEffects.size === 0) {
      this.RemovePendingCrossStateEffectTick();
      if (this.CheckAllEffectPlaying()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.HandleId);
      }
    } else if (t = this.PendingCrossStateEffects?.entries().next().value) {
      e = t[0];
      t = t[1];
      this.PendingCrossStateEffects.delete(e);
      this.PlayEffect(e, "[SceneInteractionActor.PendingPlayCrossStateEffect]");
      i = (0, puerts_1.$ref)(undefined);
      e.GetHandle(i);
      e = (0, puerts_1.$unref)(i);
      EffectSystem_1.EffectSystem.SetEffectExtraState(e, t);
    }
  }
  RemovePendingCrossStateEffectTick() {
    if (this.PendingCrossStateEffectTickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.PendingCrossStateEffectTickId);
      this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId;
    }
  }
  PlayStateSkeletalMeshDestruction(i, e) {
    var s = i.SkeletalMeshDestructible.PlayDestructionAllImmediately.Num();
    if (!(s <= 0)) {
      for (let t = 0; t < s; t++) {
        var h = i.SkeletalMeshDestructible.PlayDestructionAllImmediately.Get(t);
        this.PlaySkeletalMeshDestruction(h, e);
      }
    }
  }
  PlayTagSkeletalMeshDestruction(t, e) {
    if (this.TagsAndCorrespondingEffects) {
      var s = this.TagsAndCorrespondingEffects.Get(t)?.SkeletalMeshDestructibleActors;
      if (s) {
        for (let t = 0, i = s.Num(); t < i; t++) {
          var h = s.Get(t);
          this.PlaySkeletalMeshDestruction(h, e);
        }
      }
    }
  }
  PlayTagSequence(t, i) {
    var e;
    var s;
    if (this.TagsAndCorrespondingEffects && (t = this.TagsAndCorrespondingEffects.Get(t)) && (e = t.Sequence) && (s = e.Sequence) && (s = this.CreateDirectorBySequence(s))) {
      this.PlaySequence(s, e, t.Actors, i);
    }
  }
  StopTagSequence(t) {
    if (this.TagsAndCorrespondingEffects && (t = this.TagsAndCorrespondingEffects.Get(t)?.Sequence?.Sequence)) {
      this.StopSequence(t);
    }
  }
  PlayTagEffect(t) {
    if (this.TagsAndCorrespondingEffects) {
      var i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i) {
        var e = [];
        for (let t = 0; t < i.Num(); t++) {
          e.push(i.Get(t));
        }
        this.PendingTagEffects.set(t, e);
        this.PendingTagEffectTickId = TickSystem_1.TickSystem.Add(() => {
          this.PendingPlayTagEffect();
        }, "SceneInteractionActor.PendingTagEffectTick", 0, true).Id;
      }
    }
  }
  PendingPlayTagEffect() {
    if (this.PendingTagEffects.size === 0) {
      this.RemovePendingTagEffectTick();
      if (this.CheckAllEffectPlaying() && this.IsValid()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.HandleId);
      }
    } else {
      var i;
      var e;
      var s;
      var h = [];
      let t = undefined;
      for ([i, e] of this.PendingTagEffects) {
        if (e.length !== 0) {
          t = e;
          break;
        }
        h.push(i);
      }
      for (const r of h) {
        this.PendingTagEffects.delete(r);
      }
      if (t === undefined || t.length === 0) {
        this.RemovePendingTagEffectTick();
      } else if (s = t.shift()) {
        this.PlayEffect(s, "[SceneInteractionActor.PendingPlayTagEffect]");
      }
    }
  }
  RemovePendingTagEffectTick() {
    if (this.PendingTagEffectTickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.PendingTagEffectTickId);
      this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId;
    }
  }
  StopTagEffect(t) {
    if (this.TagsAndCorrespondingEffects) {
      this.PendingTagEffects.delete(t);
      var i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i) {
        for (let t = 0; t < i.Num(); t++) {
          this.StopEffect(i.Get(t), "[SceneInteractionActor.StopTagEffect]", false);
        }
      }
      var e = this.TagsAndCorrespondingEffects.Get(t)?.EndEffects;
      if (e) {
        for (let t = 0; t < e.Num(); t++) {
          this.PlayEffect(e.Get(t), "[SceneInteractionActor.StopTagEffect:PlayingEndEffects]");
        }
      }
    }
  }
  PlayTagMaterialController(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (e) {
        for (let i = 0; i < e.Num(); i++) {
          if (e.Get(i).Materials) {
            var s = e.Get(i).Materials;
            var h = e.Get(i).Actors;
            for (let t = 0; t < h.Num(); t++) {
              var r = (0, puerts_1.$ref)(undefined);
              h.Get(t).GetAttachedActors(r);
              var o = (0, puerts_1.$unref)(r);
              for (let t = 0; t < o.Num(); t++) {
                var a = o.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
                for (let t = 0; t < a.Num(); t++) {
                  var n = a.Get(t);
                  if (!e.Get(i).IsRevertMaterial) {
                    this.RevertMaterialComponentsMaps?.set(n, new Map());
                  }
                  var c = n.GetNumMaterials();
                  var f = n.GetMaterials();
                  for (let t = 0; t < c; t++) {
                    if (!e.Get(i).IsRevertMaterial) {
                      this.RevertMaterialComponentsMaps?.get(n)?.set(t, f.Get(t));
                    }
                    n.SetMaterial(t, s);
                  }
                }
              }
              var l = h.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < l.Num(); t++) {
                var v = l.Get(t);
                if (!e.Get(i).IsRevertMaterial) {
                  this.RevertMaterialComponentsMaps?.set(v, new Map());
                }
                var S = v.GetNumMaterials();
                var d = v.GetMaterials();
                for (let t = 0; t < S; t++) {
                  if (!e.Get(i).IsRevertMaterial) {
                    this.RevertMaterialComponentsMaps?.get(v)?.set(t, d.Get(t));
                  }
                  v.SetMaterial(t, s);
                }
              }
            }
          }
          for (let t = 0; t < e.Get(i).Actors.Num(); t++) {
            if (e.Get(i).Actors.Get(t) && e.Get(i).Data) {
              e.Get(i).TailIndex = ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(e.Get(i).Actors.Get(t), e.Get(i).Data);
            }
          }
        }
      }
    }
  }
  StopTagMaterialController(t) {
    if (this.TagsAndCorrespondingEffects) {
      var i = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (i) {
        for (let t = 0; t < i.Num(); t++) {
          var e = i.Get(t);
          if (i.Get(t).IsRevertMaterial) {
            if (i.Get(t).Materials) {
              var s = i.Get(t).Actors;
              for (let t = 0; t < s.Num(); t++) {
                var h = s.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
                for (let t = 0; t < h.Num(); t++) {
                  var r = h.Get(t);
                  var o = this.RevertMaterialComponentsMaps?.get(r);
                  var a = r.GetNumMaterials();
                  for (let t = 0; t < a; t++) {
                    r.SetMaterial(t, o?.get(t));
                  }
                }
              }
            }
            if (this.CurrentState) {
              this.PlayStateMaterialController(this.CurrentState, true);
            }
          }
          if (e.Actors) {
            for (let t = 0; t < e.Actors.Num(); t++) {
              var n = e.TailIndex - t;
              if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(n)) {
                ItemMaterialManager_1.ItemMaterialManager.DisableActorData(n);
              }
            }
          }
        }
      }
    }
  }
  PostTagAkEvent(i, t) {
    if (this.PlayingTagAkEventHandle === undefined) {
      this.PlayingTagAkEventHandle = new Map();
    }
    var e = this.TagsAndCorrespondingEffects?.Get(i)?.AkEvent;
    if (e?.AkEvent) {
      var s = e.AkEvent.IsInfinite;
      if ((s || !t) && !this.PlayingTagAkEventHandle.has(i)) {
        let t = undefined;
        if ((t = e.IsFollow ? AudioSystem_1.AudioSystem.PostEvent(e.AkEvent.GetName(), this) : AudioSystem_1.AudioSystem.PostEvent(e.AkEvent.GetName(), this.D_GetTransform())) !== undefined) {
          this.PlayingTagAkEventHandle.set(i, t);
        }
      }
    }
  }
  StopTagAkEvent(t) {
    var i;
    if (this.PlayingTagAkEventHandle !== undefined && (i = this.TagsAndCorrespondingEffects?.Get(t)?.AkEvent)?.AkEvent && this.PlayingTagAkEventHandle.has(t)) {
      this.PlayingTagAkEventHandle.delete(t);
      AudioSystem_1.AudioSystem.ExecuteAction(i.AkEvent.GetName(), 0);
    }
  }
  PlayStateBasedEffect(i, e) {
    if (i.StateBasedEffect) {
      for (let t = 0; t < i.StateBasedEffect.Num(); t++) {
        var s = i.StateBasedEffect.Get(t).StateBasedEffect;
        if (s?.IsValid()) {
          if (e === 0) {
            s.SetState(0);
          } else if (e === 1) {
            s.SetState(1);
          } else if (e === 2) {
            s.SetState(2);
          } else if (e === 3) {
            s.SetState(3);
          } else if (e === 4) {
            s.SetState(4);
          }
        }
      }
    }
  }
  PostStateAkEvent(t, i) {
    t = t.AkEvent;
    if (!!t.AkEvent && (!!t.AkEvent.IsInfinite || !i)) {
      if (t.IsFollow) {
        this.CurrentStateAkEventHandle = AudioSystem_1.AudioSystem.PostEvent(t.AkEvent.GetName(), this);
      } else {
        this.CurrentStateAkEventHandle = AudioSystem_1.AudioSystem.PostEvent(t.AkEvent.GetName(), this.D_GetTransform());
      }
    }
  }
  SetStateActorHide(t) {
    var e = t.HideActors;
    if (e) {
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        if (s) {
          s.SetActorHiddenInGame(true);
          s.SetActorEnableCollision(false);
        }
        if (s instanceof UE.BP_EffectActor_C) {
          if (this.PendingStateEffects.includes(s)) {
            this.PendingStateEffects.splice(this.PendingStateEffects.indexOf(s), 1);
          }
          for (const h of this.PendingTagEffects.values()) {
            if (h.includes(s)) {
              h.splice(h.indexOf(s), 1);
            }
          }
          if (this.PendingCrossStateEffects.has(s)) {
            this.PendingCrossStateEffects.delete(s);
          }
        }
      }
    }
  }
  SetStateActorShow(t) {
    var e = t.Actors;
    if (e) {
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        if (s) {
          s.SetActorHiddenInGame(false);
          s.SetActorEnableCollision(true);
        }
      }
    }
  }
  SetStateActorCollisionProfile(t, i) {
    if (i &&= i.ExitStateActorCollisionProfile) {
      this.SetActorCollisionProfile(i);
    }
    i = t.EnterStateActorCollisionProfile;
    if (i) {
      this.SetActorCollisionProfile(i);
    }
  }
  MakeActorProjection(t, i) {
    if (this.IsProjecting) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 31, "当前已经在投影中，重复调用投影接口");
      }
    } else {
      var e = this.ActorsForProjection;
      if (!this.ProjectionRootActor?.IsValid()) {
        this.ProjectionRootActor = UE.KuroActorManager.D_SpawnActor(this.GetWorld(), UE.StaticMeshActor.StaticClass(), this.D_GetTransform());
        this.ProjectionRootActor.RootComponent.SetMobility(2);
      }
      if (e && e?.Num() && t) {
        this.IsProjecting = true;
        for (let t = 0; t < e.Num(); t++) {
          var s = UE.KuroStaticLibrary.SpawnActorFromAnother(e.Get(t));
          if (s?.IsValid) {
            s.K2_AttachToActor(this.ProjectionRootActor, undefined, 1, 1, 1, true);
            if (this.MaterialForProjection) {
              var h = (0, puerts_1.$ref)(undefined);
              s.GetAttachedActors(h);
              var r = (0, puerts_1.$unref)(h);
              for (let t = 0; t < r.Num(); t++) {
                var o = r.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
                for (let t = 0; t < o.Num(); t++) {
                  var a = o.Get(t);
                  var n = a.GetNumMaterials();
                  for (let t = 0; t < n; t++) {
                    a.SetMaterial(t, this.MaterialForProjection);
                  }
                }
              }
              var c = s.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < c.Num(); t++) {
                var f = c.Get(t);
                var l = f.GetNumMaterials();
                for (let t = 0; t < l; t++) {
                  f.SetMaterial(t, this.MaterialForProjection);
                }
              }
            }
            if (i) {
              this.AddMatrialDataForChildrenActor(s, i);
            }
          }
        }
        this.ProjectionRootActor.D_K2_SetActorTransform(t, false, undefined, false);
      }
    }
  }
  UpdateProjectionActorTransform(t) {
    if (this.IsProjecting) {
      if (this.ProjectionRootActor?.IsValid()) {
        this.ProjectionRootActor.D_K2_SetActorTransform(t, false, undefined, false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 31, "找不到投影的Root Actor");
      }
    } else {
      this.MakeActorProjection(t);
    }
  }
  AddMatrialDataForChildrenActor(t, i) {
    if (t.IsValid()) {
      var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
      t.GetAttachedActors(e);
      var s = (0, puerts_1.$unref)(e);
      for (let t = 0; t < s.Num(); t++) {
        var h = s.Get(t);
        if (h.IsValid()) {
          ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(h, i);
        }
      }
      ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(t, i);
    }
  }
  RemoveStaticMeshDestructibleTicker() {
    if (this.SkeletalMeshDestructibleTickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.SkeletalMeshDestructibleTickId);
      this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.InvalidId;
    }
  }
  RemoveSkeletalDestructibleTicker() {
    if (!!this.SkeletalDestructibleTickIdList && !(this.SkeletalDestructibleTickIdList.length <= 0)) {
      this.SkeletalDestructibleTickIdList.forEach(t => {
        TickSystem_1.TickSystem.Remove(t);
      });
      this.SkeletalDestructibleTickIdList.length = 0;
    }
  }
  RemoveActorProjection() {
    if (this.IsProjecting) {
      if (this.ProjectionRootActor?.IsValid()) {
        this.IsProjecting = false;
        this.DestroyActor(this.ProjectionRootActor);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 31, "找不到投影的Root Actor");
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 31, "当前不在投影中，无法移除投影");
    }
  }
  DestroyActor(t) {
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    t.GetAttachedActors(i);
    var e = (0, puerts_1.$unref)(i);
    for (let t = 0; t < e.Num(); t++) {
      this.DestroyActor(e.Get(t));
    }
    if (t instanceof UE.BP_EffectActor_C) {
      t.StopEffect();
      t.RemoveHandle();
    }
    t.K2_DestroyActor();
  }
  DestroySelf() {
    this.SkeletalMeshDestructibleActorsInternal = undefined;
    this.SkeletalMeshDestructibleActorsList = undefined;
    this.SkeletalMeshDestructibleCellListMap = undefined;
    this.RemoveStaticMeshDestructibleTicker();
    this.RemoveSkeletalDestructibleTicker();
    this.DestroyActor(this);
  }
  SetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e) {
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          if (s) {
            s.SetActorHiddenInGame(true);
            s.SetActorEnableCollision(false);
          }
          if (s instanceof UE.BP_EffectActor_C) {
            if (this.PendingStateEffects.includes(s)) {
              this.PendingStateEffects.splice(this.PendingStateEffects.indexOf(s), 1);
            }
            for (const h of this.PendingTagEffects.values()) {
              if (h.includes(s)) {
                h.splice(h.indexOf(s), 1);
              }
            }
            if (this.PendingCrossStateEffects.has(s)) {
              this.PendingCrossStateEffects.delete(s);
            }
          }
        }
      }
    }
  }
  ResetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e) {
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          if (s) {
            s.SetActorHiddenInGame(false);
            s.SetActorEnableCollision(true);
          }
        }
      }
    }
  }
  SetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e) {
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          if (s) {
            s.SetActorHiddenInGame(false);
            s.SetActorEnableCollision(true);
          }
        }
      }
    }
  }
  ResetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e) {
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          if (s) {
            s.SetActorHiddenInGame(true);
            s.SetActorEnableCollision(false);
          }
        }
      }
    }
  }
  SetTagStaticMehActorCollisionProfile(t) {
    if (this.TagsAndCorrespondingEffects && (t = this.TagsAndCorrespondingEffects.Get(t)?.AddTagActorCollisionProfile)) {
      this.SetActorCollisionProfile(t);
    }
  }
  ResetTagStaticMehActorCollisionProfile(t) {
    if (this.TagsAndCorrespondingEffects && (t = this.TagsAndCorrespondingEffects.Get(t)?.RemoveTagActorCollisionProfile)) {
      this.SetActorCollisionProfile(t);
    }
  }
  DoSwitchState(i) {
    if (i) {
      let t = false;
      var i = this.ActiveSequencePlayer;
      var e = i?.Sequence;
      if (i && e && i.IsPlaying()) {
        if (i.IsReversed()) {
          i.PlayReverseLooping(0);
        } else {
          i.PlayLooping(0);
        }
        t = true;
      }
      if (this.CurrentState && (e = this.CurrentState.AnimMontage.SkeletalMesh?.SkeletalMeshComponent)) {
        i = e.GetAnimInstance();
        if ((e = this.CurrentState.AnimMontage.Montage) && i?.Montage_IsPlaying(e) && i?.IsA(UE.AnimSingleNodeInstance.StaticClass())) {
          i.SetLooping(false);
          t = true;
        } else if (i?.IsA(UE.ABP_LevelPrefabDaiyu_C.StaticClass())) {
          t = true;
        }
      }
      if (t) {
        this.InWaitingForPlayableFinished = true;
        return;
      }
    }
    this.InWaitingForPlayableFinished = false;
    if (this.TransitionState) {
      this.InTransition = true;
      if (this.CurrentState) {
        this.StopState(this.CurrentState, this.TransitionState);
      }
      this.CurrentStateKey = this.TransitionStateKey;
      this.PlayState(this.TransitionState, this.CurrentState, this.TransitionStateJumpToEnd, this.TransitionStateKey);
      this.SwitchingStateRemainTime = this.TransitionState.TransitionTime;
      this.IsUseTransitionTime = !this.CheckActivePlayable();
      this.TransitionState = undefined;
      this.TransitionStateKey = undefined;
    } else if (this.NextState) {
      this.SwitchingStateRemainTime = 0;
      this.InTransition = false;
      if (this.CurrentState) {
        this.StopState(this.CurrentState, this.NextState);
      }
      this.CurrentStateKey = this.NextStateKey;
      this.PlayState(this.NextState, this.CurrentState, false, this.NextStateKey);
      this.NextState = undefined;
      this.NextStateKey = undefined;
    } else {
      this.TransitionState = undefined;
      this.TransitionStateKey = undefined;
      this.NextState = undefined;
      this.NextStateKey = undefined;
      this.InTransition = false;
      this.SwitchingStateRemainTime = 0;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 80, "Nothing to Switch, should not happened!");
      }
    }
  }
  DetermineState(t, i, e, s) {
    this.NextState = t;
    this.NextStateKey = i;
    s = s && !t.NeedExpressionAnyway;
    if (e) {
      if (this.CurrentState && (t = this.CurrentState.TransitionMap.Get(i)) !== undefined && (e = this.States.Get(t))) {
        this.TransitionState = e;
        this.TransitionStateKey = t;
        this.TransitionStateJumpToEnd = s;
      }
    } else {
      this.TransitionStateJumpToEnd = false;
      this.TransitionState = undefined;
      this.TransitionStateKey = undefined;
    }
  }
  SetState(t, i, e) {
    if (!this.States) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderScene", 39, "状态为Undefined", ["Actor", this.LevelName], ["HandleID", this.HandleId]);
      }
    }
    var s = this.States.Get(t);
    if (s) {
      if (this.InTransition && !s.IsForceSetState || this.NextState && !s.IsForceSetState) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderScene", 13, "正在过渡状态, 不可设置其他状态", ["Actor", this.LevelName], ["HandleID", this.HandleId]);
        }
      } else if (t === this.CurrentStateKey) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderScene", 13, "不可转换到目标状态,因为目标状态即为当前状态", ["Actor", this.LevelName], ["HandleID", this.HandleId]);
        }
      } else if (this.CurrentState?.WaitForPlayableFinished && this.InWaitingForPlayableFinished) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderScene", 80, "不可转换到目标状态，因为当前状态正在等待播放完成", ["Actor", this.LevelName], ["HandleID", this.HandleId]);
        }
      } else {
        this.DetermineState(s, t, i, e);
        s = !!this.CurrentState?.WaitForPlayableFinished;
        this.DoSwitchState(s);
      }
    } else if (t !== 20 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderScene", 13, "状态未配置", ["未配置状态", t + 1], ["Actor", this.LevelName], ["HandleID", this.HandleId]);
    }
  }
  StopState(e, t) {
    if (e) {
      this.RemovePendingStateEffectTick();
      this.PendingStateEffects = [];
      var i = this.ActiveSequencePlayer?.Sequence;
      if (i && i === e.Sequence.Sequence && e.Sequence.Sequence !== t?.Sequence.Sequence) {
        this.StopSequence(i);
      }
      for (let t = 0; t < e.HideActors.Num(); t++) {
        var s = e.HideActors.Get(t);
        if (s) {
          s.SetActorHiddenInGame(false);
          s.SetActorEnableCollision(true);
        }
      }
      for (let t = 0; t < e.Effects.Num(); t++) {
        e.Effects.Get(t)?.Stop("[SceneInteractionActor.StopState]", false);
      }
      var h = e.MaterialControllers;
      if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap && h) {
        for (let t = 0; t < h.Num(); t++) {
          if (h.Get(t).IsRevertMaterial && h.Get(t).Materials) {
            var r = h.Get(t).Actors;
            for (let t = 0; t < r.Num(); t++) {
              var o = r.Get(t).K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < o.Num(); t++) {
                var a = o.Get(t);
                var n = this.RevertMaterialComponentsMaps?.get(a);
                var c = a.GetNumMaterials();
                for (let t = 0; t < c; t++) {
                  a.SetMaterial(t, n?.get(t));
                }
              }
            }
          }
        }
        if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap) {
          for (let i = 0; i < h.Num(); i++) {
            for (let t = 0; t < h.Get(i).Actors.Num(); t++) {
              var f = e.MaterialControllers.Get(i).TailIndex - t;
              if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(f)) {
                ItemMaterialManager_1.ItemMaterialManager.DisableActorData(f);
              }
            }
          }
        }
      }
      if (this.CharRenderingComponents) {
        var l;
        var t = this.CharRenderingComponents.keys();
        var v = Array.from(t);
        var S = v.length;
        for (let t = 0; t < S; t++) {
          if (this.CharRenderingComponents.get(v[t]) && (l = this.CharRenderingComponents.get(v[t])) && !this.TagCharDaHandleList?.includes(l)) {
            v[t].RemoveMaterialControllerDataGroupWithEnding(l);
          }
        }
      }
      if (this.CurrentStateAkEventHandle !== undefined) {
        AudioSystem_1.AudioSystem.ExecuteAction(this.CurrentStateAkEventHandle, 0);
      }
    }
  }
  OnAnimPlayEnd(t) {
    this.IsAbpAnimPlayEnd = true;
  }
  CheckActivePlayable() {
    let t = false;
    if (this.ActiveSequencePlayer) {
      t ||= this.ActiveSequencePlayer.IsPlaying();
    }
    var i;
    var e = this.CurrentState?.AnimMontage;
    if (e?.SkeletalMesh && (i = e.SkeletalMesh?.SkeletalMeshComponent) && (i = i.GetAnimInstance())) {
      e = e.Montage;
      if (i.IsA(UE.ABP_LevelPrefabDaiyu_C.StaticClass())) {
        t ||= !this.IsAbpAnimPlayEnd;
      } else if (e) {
        t ||= i.Montage_IsPlaying(e);
      }
    }
    return t;
  }
  CheckPlaying(t, i) {
    return !!this.CheckActivePlayable() || !!this.IsUseTransitionTime && this.SwitchingStateRemainTime !== 0 && (this.SwitchingStateRemainTime -= t, this.SwitchingStateRemainTime >= 0);
  }
  GetKuroSceneInteractionActorSystem() {
    this.KuroSceneInteractionActorSystem ||= UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroSceneInteractionActorSystem.StaticClass());
    return this.KuroSceneInteractionActorSystem;
  }
  GetDirectorBySequence(t) {
    return this.ActiveSequenceDirectorMap?.get(t);
  }
  CreateDirectorBySequence(s) {
    if (this.ActiveSequenceDirectorMap === undefined) {
      this.ActiveSequenceDirectorMap = new Map();
    }
    if (this.GetDirectorBySequence(s)) {
      this.StopSequence(s);
    }
    const h = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), this.D_GetTransform(), undefined, false);
    var t = h?.SequencePlayer;
    if (t) {
      h.bOverrideInstanceData = true;
      (h.DefaultInstanceData.TransformOriginActor = this).ActiveSequenceDirectorMap.set(s, h);
      const r = () => {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataId);
        if (t?.Entity?.Valid && h && h.SequencePlayer) {
          EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionSequencePlay, this.HandleId, h.SequencePlayer);
        }
      };
      const o = () => {
        const t = h;
        var i;
        var e;
        if (t && ((i = t.SequencePlayer) && (i.OnStop.Remove(o), i.OnFinished.Remove(o), i.OnPlay.Remove(r), i.OnPlayReverse.Remove(r), (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataId))?.Entity?.Valid && EventSystem_1.EventSystem.EmitWithTarget(e.Entity, EventDefine_1.EEventName.OnSceneInteractionSequenceOver, this.HandleId, i), ModelManager_1.ModelManager.MechanismTimelineModel.UnRegisterSequenceContext(i)), this.ActiveSequenceDirectorMap && this.ActiveSequenceDirectorMap.get(s) === t && this.ActiveSequenceDirectorMap.delete(s), this.DirectorConfigMap?.delete(t), this.ActiveSequencePlayer === i && (this.ActiveSequencePlayer = undefined), t.IsValid())) {
          TimerSystem_1.TimerSystem.Next(() => {
            ActorSystem_1.ActorSystem.Put("SceneInteractionActor.CreateDirectorBySequence", t);
          });
        }
      };
      t.OnPlay.Add(r);
      t.OnPlayReverse.Add(r);
      t.OnStop.Add(o);
      t.OnFinished.Add(o);
      return h;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderScene", 39, "LevelSequenceActor.SequencePlayer invalid", ["Actor", this.LevelName], ["HandleID", this.HandleId]);
    }
  }
  PlayExtraEffectOnTagsChange(t, i = false) {
    this.PlayTagEffect(t);
    this.PlayTagCharMaterialControllerNew(t);
    this.PlayTagMaterialController(t);
    this.PostTagAkEvent(t, i);
    this.SetTagActorShow(t);
    this.SetTagActorHide(t);
    this.PlayTagSequence(t, i);
    this.PlayTagSkeletalMeshDestruction(t, i);
    this.SetTagStaticMehActorCollisionProfile(t);
  }
  StopExtraEffectOnTagsChange(t) {
    this.StopTagEffect(t);
    this.StopTagMaterialController(t);
    this.StopTagAkEvent(t);
    this.ResetTagActorShow(t);
    this.ResetTagActorHide(t);
    this.StopTagSequence(t);
    this.ResetTagStaticMehActorCollisionProfile(t);
  }
  UpdateHitInfo(t, i) {
    this.HitLocation = t;
    this.HitDirection = i;
  }
  TryStopCurrentState() {
    if (this.CurrentState) {
      this.StopState(this.CurrentState, undefined);
    }
  }
  使用字段值切换状态() {
    this.ChangeStateInternal(this.模拟状态);
  }
  ChangeState1() {
    var t = "/Game/Aki/GamePlay/Mechanism/Test.Test";
    MechanismUtils_1.MechanismUtils.GetAllAnimNotifyEventsByPath(t, t => {
      if (t) {
        for (const i of t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Temp", 1, "测试输出AN事件", ["data", i]);
          }
        }
      }
    });
    MechanismUtils_1.MechanismUtils.GetAllAnimNotifyStateEventsByPath(t, t => {
      if (t) {
        for (const i of t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Temp", 1, "测试输出ANS事件", ["data", i]);
          }
        }
      }
    });
  }
  ChangeState2() {
    this.ChangeStateInternal(1);
  }
  ChangeState3() {
    this.ChangeStateInternal(2);
  }
  ChangeState4() {
    this.ChangeStateInternal(3);
  }
  ChangeState5() {
    this.ChangeStateInternal(4);
  }
  ChangeState6() {
    this.ChangeStateInternal(5);
  }
  ChangeState7() {
    this.ChangeStateInternal(6);
  }
  ChangeState8() {
    this.ChangeStateInternal(7);
  }
  模拟Tag添加() {
    if (this.模拟Tag) {
      this.PlayExtraEffectOnTagsChange(this.模拟Tag, this.跳过表现过程);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "SimulationTagChange:没有设置SimulationTag");
    }
  }
  模拟Tag移除() {
    var t;
    var i;
    var e;
    if (this.模拟Tag) {
      this.StopExtraEffectOnTagsChange(this.模拟Tag);
      if (this.TagsAndCorrespondingEffects && (i = (t = this.TagsAndCorrespondingEffects.Get(this.模拟Tag))?.Sequence) && (e = (i = new UE.SSceneInteractionSequence(i.Sequence, i.IsLoop, !i.Reverse, i.PlayRate)).Sequence) && (e = this.CreateDirectorBySequence(e))) {
        this.PlaySequence(e, i, t.Actors, true);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "SimulationTagChange:没有设置SimulationTag");
    }
  }
  PreviewFullDestructible() {
    var t = (0, puerts_1.$ref)(undefined);
    this.GetAttachedActorDescendants(t, true);
    var i = (0, puerts_1.$unref)(t);
    for (let t = i.Num() - 1; t >= 0; --t) {
      var e = i.Get(t);
      if (e.IsA(UE.KuroDestructibleActor.StaticClass())) {
        e.ShowStaticMeshChunkList();
      }
    }
  }
  ChangeStateInternal(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "change state", ["stateId", t]);
    }
    this.Active = true;
    this.SetState(t, this.需要过渡状态, this.跳过表现过程);
  }
  重置() {
    var i = UE.KismetSystemLibrary.GetPathName(this.GetLevel()).split("/");
    let e = "";
    for (let t = 1; t < i.length - 1; t++) {
      var s = i[t];
      e = e + "/" + s;
    }
    var t = i[i.length - 1].split(":")[0].split(".");
    var t = t[t.length - 1];
    e = e + "/" + t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 18, "ResetState", ["levelName", e]);
    }
    Global_1.Global.CharacterController?.ClientTravel(e, 0, true, undefined);
  }
}
SceneInteractionActor.DestructibleInitStat = Stats_1.Stat.Create("DestructibleInitStat");
SceneInteractionActor.DestructiblePostPhysicsStat = Stats_1.Stat.Create("DestructiblePostPhysicsStat");
SceneInteractionActor.TempTransform = new UE.Transform();
exports.default = SceneInteractionActor; //# sourceMappingURL=SceneInteractionActor.js.map