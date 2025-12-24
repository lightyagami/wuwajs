"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowResourceManager = exports.EXPLOSION_EFFECT_PATH = exports.STONE_TRAIL_EFFECT_PATH = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const Queue_1 = require("../../Core/Container/Queue");
const GameplayCueById_1 = require("../../Core/Define/ConfigQuery/GameplayCueById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const EffectSystem_1 = require("../Effect/EffectSystem");
const Global_1 = require("../Global");
const SimpleLevelSequenceActor_1 = require("../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const GameplayCueHookCommonItem_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/CommonItem/GameplayCueHookCommonItem");
const RefCompDefine_1 = require("../NewWorld/SceneItem/RefCompController/RefCompDefine");
const LevelFlowAddBuffAction_1 = require("./Action/LevelFlowAddBuffAction");
const AUTO_AIM_TAG = "关卡.Common.表现.摩托车浮游炮.辅助瞄准";
class ResourceLoadCallbackHandle {
  constructor(e, t) {
    this.Path = e;
    this.Callback = t;
    this.ResourceSystemId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Asset = undefined;
    this.LoadAsyncFinished = false;
  }
}
const stopTrackTargetEffectParam = {
  AttachLocation: false,
  AttachRotation: false,
  AttachScale: false,
  DetachOnEnd: false,
  EffectModelPath: FNameUtil_1.FNameUtil.GetDynamicFName("/Game/Aki/Effect/DataAsset/Niagara/Scene/3_0/3_0LuXin/DA_Fx_Sc1_LuXin_ExploderSmoke_02.DA_Fx_Sc1_LuXin_ExploderSmoke_02"),
  Offset: new UE.Transform(),
  Socket: FNameUtil_1.FNameUtil.EMPTY
};
const DEFAULT_AK_EVENT_NAME = "play_interact_seq_luxin_fireball_explode";
exports.STONE_TRAIL_EFFECT_PATH = "/Game/Aki/Effect/DataAsset/Niagara/Scene/3_0/3_0LuXin/DA_FX_SC1_LuXin_YunShiTrail_02.DA_FX_SC1_LuXin_YunShiTrail_02";
exports.EXPLOSION_EFFECT_PATH = "/Game/Aki/Effect/DataAsset/Niagara/Scene/3_0/3_0LuXin/DA_Fx_Sc1_LuXin_ExploderSmoke_03.DA_Fx_Sc1_LuXin_ExploderSmoke_03";
class LevelFlowResourceManager {
  static HandleSequence(o) {
    if (o.LevelSequencePath && o.LevelSequencePath !== "None") {
      let t = this.p1m.get(o.LevelSequencePath);
      if (t) {
        t.UpdateSettings(o.KeepUI);
        this.lwr(t, o);
      } else {
        this.G2_(o.LevelSequencePath, UE.LevelSequence, e => {
          if (e?.IsValid()) {
            (t = new SimpleLevelSequenceActor_1.default(e)).UpdateSettings(o.KeepUI);
            this.p1m.set(o.LevelSequencePath, t);
            this.lwr(t, o);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 7, "LevelSequence");
    }
  }
  static GetLevelSequenceActor(e) {
    return this.p1m.get(e);
  }
  static ReleaseSequence(e) {
    var t = this.p1m.get(e);
    if (t) {
      t.Clear();
      this.p1m.delete(e);
    }
  }
  static ReleaseAllSequence() {
    for (var [, e] of this.p1m) {
      e.Clear();
    }
    this.p1m.clear();
  }
  static lwr(e, t) {
    let o = undefined;
    let r = undefined;
    let a = undefined;
    r = t.Intro ? t.Intro?.Type === 0 ? (o = t.Intro, new RefCompDefine_1.TransitStruct(0, o.Duration && o.Duration > 0 ? o.Duration : 0, 0, 0, true)) : (o = t.Intro, new RefCompDefine_1.TransitStruct(1, o.Duration && o.Duration > 0 ? o.Duration : 0, o.FadeIn && o.FadeIn.Duration > 0 ? o.FadeIn.Duration : 1, o.FadeOut && o.FadeOut.Duration > 0 ? o.FadeOut.Duration : 1, true, o.Mask)) : new RefCompDefine_1.TransitStruct(0, 0, 0, 0, false);
    a = t.Outro ? t.Outro?.Type === 0 ? (o = t.Outro, new RefCompDefine_1.TransitStruct(0, o.Duration && o.Duration > 0 ? o.Duration : 0, 0, 0, true)) : (o = t.Outro, new RefCompDefine_1.TransitStruct(1, o.Duration && o.Duration > 0 ? o.Duration : 0, o.FadeIn && o.FadeIn.Duration > 0 ? o.FadeIn.Duration : 1, o.FadeOut && o.FadeOut.Duration > 0 ? o.FadeOut.Duration : 1, true, o.Mask)) : new RefCompDefine_1.TransitStruct(0, 0, 0, 0, false);
    var i = new RefCompDefine_1.PlayRateStruct(Math.abs(t.Rate ?? 1), 0, t.RateEase?.Duration);
    switch (t.RateEase?.Type) {
      case IAction_1.EEaseType.Transient:
        i.EaseType = 0;
        i.EaseDuration = 0;
        break;
      case IAction_1.EEaseType.InOutCubic:
        i.EaseType = 3;
        i.EaseExponent = 3;
        break;
      case IAction_1.EEaseType.OutQuart:
        i.EaseType = 2;
        i.EaseExponent = 4;
        break;
      case IAction_1.EEaseType.OutSine:
        i.EaseType = 5;
        break;
      default:
        IAction_1.EEaseType.Linear;
        i.EaseType = 0;
    }
    switch (t.PlayMode) {
      case "shortestPath":
        e.PlayToMarkByCheckWay(t.Mark, r, a, i, false);
        break;
      case "instant":
        e.PlayToMark(t.Mark, r, a, i, true);
        break;
      case "loop":
        if (t.LoopRange) {
          e.PlayLoopBetweenMarks(t.LoopRange, (t.Rate ?? 1) < 0, r, a, i, false);
        } else {
          e.PlayLoop((t.Rate ?? 1) < 0, -1, r, a, i);
        }
        break;
      default:
        e.PlayToMark(t.Mark, r, a, i, false);
    }
  }
  static G2_(e, t, o, r = 100) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：开始加载", ["Path", e]);
    }
    this.O2_ ||= new Queue_1.Queue();
    const a = new ResourceLoadCallbackHandle(e, o);
    this.O2_.Push(a);
    a.ResourceSystemId = ResourceSystem_1.ResourceSystem.LoadAsync(e, t, e => {
      this.F2_(a, e);
    }, r);
    return a.ResourceSystemId;
  }
  static F2_(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：加载完成", ["Path", e.Path]);
    }
    e.Asset = t;
    e.LoadAsyncFinished = true;
    while (this.O2_ && !this.O2_.Empty && this.O2_.Front?.LoadAsyncFinished) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：执行回调", ["Path", e.Path]);
      }
      var o = this.O2_.Pop();
      o?.Callback?.(o.Asset, o.Path);
    }
  }
  static Edm(e) {
    for (var [, t] of this.p1m) {
      t.SetTimeDilation(e);
    }
  }
  static ShowHookEffect(t, e, o) {
    if (this.v1m.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "HookCue已经存在", ["EntityId", t]);
      }
    } else {
      var r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 0);
      if (r) {
        var a = GameplayCueById_1.configGameplayCueById.GetConfig(o);
        if (a) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
          if (i) {
            var s = i.Entity.GetComponent(0);
            if (s) {
              var s = s.GetEntityType();
              if (s !== Protocol_1.Aki.Protocol.kks.Proto_Player && s !== Protocol_1.Aki.Protocol.kks.HI_) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelFlow", 58, "Entity不是Character或Vehicle", ["EntityId", t]);
                }
              } else {
                let e = undefined;
                e = s === Protocol_1.Aki.Protocol.kks.HI_ ? (s = i.Entity.GetComponent(247), GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(s.Actor, FNameUtil_1.FNameUtil.GetDynamicFName(a.Socket), r.D_K2_GetActorLocation(), a.Resources)) : (s = i.Entity.GetComponent(3), GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(s.Actor, FNameUtil_1.FNameUtil.GetDynamicFName(a.Socket), r.D_K2_GetActorLocation(), a.Resources));
                this.v1m.set(t, e);
                this.y1m.set(t, r);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelFlow", 58, "Entity没有ActorComponent", ["EntityId", t]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "Entity加载超时或已被移除", ["EntityId", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "Invalid GamePlayCue Id", ["CueId", o]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "Actor加载超时或已被移除", ["TargetTag", e]);
      }
    }
  }
  static HideHookEffect(e) {
    var t = this.v1m.get(e);
    if (t) {
      t.Destroy();
      this.v1m.delete(e);
      this.y1m.delete(e);
    }
  }
  static TickHookEffect(e) {
    for (var [t, o] of this.v1m) {
      t = this.y1m.get(t);
      if (t && t.IsValid()) {
        o.Tick(t.D_K2_GetActorLocation());
      }
    }
  }
  static Rpm() {
    for (var [, e] of this.v1m) {
      e.Destroy();
    }
    this.v1m.clear();
    this.y1m.clear();
  }
  static async LoadDestructibleActor(o, r) {
    if (this.rTm.has(o)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "DestructibleActor已经存在", ["Key", o]);
      }
    } else {
      await this.tJ();
      var a = ActorSystem_1.ActorSystem.Spawn(UE.BP_KuroTrackTargetWhileRotate_C.StaticClass(), r.SpawnDestructibleParam.StartTransform, undefined);
      if (a?.IsValid()) {
        this.rTm.set(o, a);
        var i = await this.JMm(r.SpawnDestructibleParam.KuroDestructibleAsset, UE.KuroDestructibleAsset);
        var e = await this.oTm(r.SpawnDestructibleParam.KuroDestructibleDestructionAsset, UE.KuroDestructibleDestructionAsset);
        if (i && e) {
          const s = this.ZMm(o, r.SpawnDestructibleParam.StartTransform, i, e);
          if (s?.IsValid() && s.ProxyMeshComponent?.IsValid()) {
            s.Tags.Add(FNameUtil_1.FNameUtil.GetDynamicFName(AUTO_AIM_TAG));
            let t = undefined;
            t = TimerSystem_1.TimerSystem.Forever(e => {
              if (s?.IsValid()) {
                s.InsertToGamePartition();
              } else if (t) {
                TimerSystem_1.TimerSystem.Remove(t);
                t = undefined;
              }
            }, 100);
            this.nTm.set(o, s);
            s.StartDestruction.Bind(() => {
              if (t) {
                TimerSystem_1.TimerSystem.Remove(t);
                t = undefined;
              }
              LevelFlowResourceManager.cTa(o);
              if (s?.IsValid() && s.KuroDestructibleDestructionAsset?.IsValid()) {
                this.czm(s, s.KuroDestructibleDestructionAsset.DestructionEffect, o);
              }
              this.sTm(o, false, 0, 0);
            });
            i = a.GetComponentByClass(UE.KuroFauxPhysicsTrackTargetComponent.StaticClass());
            const c = r.SpawnDestructibleParam;
            if (i?.IsValid() && c.TargetToTrack?.IsValid()) {
              i.ResetPhysics();
              i.InitLinearSpeed = c.TrackSpeed;
              i.TrackMethod = c.TrackMethod;
              i.PredictionFactor = c.TrackPredictionFactor;
              i.StopTrackTargetDistance = c.StopTrackTargetDistance;
              i.StartTrackTarget(c.TargetToTrack);
              i.OnStopTrackTarget.Add(e => {
                if (s?.IsValid()) {
                  if (t) {
                    TimerSystem_1.TimerSystem.Remove(t);
                    t = undefined;
                  }
                  this.sTm(o, true, c.HitBuff, c.RevertMaxHp);
                  LevelFlowResourceManager.cTa(o);
                  this.czm(s, stopTrackTargetEffectParam, o);
                  s.StartDestruction.Unbind();
                  s.ApplyDamage(c.DamageAmount, s.K2_GetActorLocation(), e, 100);
                }
              });
            }
            let e = undefined;
            if (c.RotateParam.Type === 0 && (e = a.GetComponentByClass(UE.KuroFauxPhysicsAxisRotateComponent.StaticClass()), c.RotateParam.LocalRotationAxis !== undefined && (e.LocalRotationAxis = c.RotateParam.LocalRotationAxis), c.RotateParam.AngularForceRadians && e.ApplyAngularForce(c.RotateParam.AngularForceRadians), c.RotateParam.AngularImpulseRadians && e.ApplyAngularImpulse(c.RotateParam.AngularImpulseRadians), c.RotateParam.AngleMovementRadians)) {
              e.ApplyAngularMovement(c.RotateParam.AngleMovementRadians);
            }
            if (e?.IsValid()) {
              s.K2_AttachToComponent(e, undefined, 2, 2, 2, false);
            }
            s.K2_SetActorRelativeTransform(r.SpawnDestructibleParam.ModelTransform, false, undefined, false);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelFlow", 58, "DestructibleActor加载失败", ["Key", o]);
            }
            this.ReleaseDestructibleActor(o);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "DestructibleAsset加载失败", ["Key", o]);
          }
          this.ReleaseDestructibleActor(o);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "DestructibleActor加载失败", ["Key", o]);
      }
    }
  }
  static ReleaseDestructibleActor(e) {
    var t = this.nTm.get(e);
    if (t?.IsValid()) {
      t.K2_DetachFromActor(1, 1, 1);
      ActorSystem_1.ActorSystem.Put("LevelFlowReleaseDestructibleActor", t);
    }
    this.nTm.delete(e);
    var t = this.rTm.get(e);
    if (t?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("LevelFlowReleaseDestructibleRotateActor", t);
    }
    this.rTm.delete(e);
    LevelFlowResourceManager.cTa(e);
  }
  static aTm() {
    for (const e of this.nTm.keys()) {
      this.ReleaseDestructibleActor(e);
    }
  }
  static async tJ() {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_KuroTrackTargetWhileRotate_C", () => {
      e.SetResult();
    });
    await e.Promise;
  }
  static async JMm(e, t) {
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, t, (e, t) => {
      o.SetResult(e);
    });
    return o.Promise;
  }
  static async oTm(e, t) {
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, t, (e, t) => {
      o.SetResult(e);
    });
    return o.Promise;
  }
  static cTa(e) {
    e = LevelFlowResourceManager.uzm.get(e);
    if (e) {
      for (const t of e) {
        EffectSystem_1.EffectSystem.StopEffectById(t, "LevelFlowResourceManager.PlayEffectWhenStartDestruction", true);
      }
    }
  }
  static czm(e, t, o) {
    if (e?.IsValid()) {
      e = LevelFlowResourceManager.NQt(e, t);
      if (!LevelFlowResourceManager.uzm.has(o)) {
        LevelFlowResourceManager.uzm.set(o, new Set());
      }
      LevelFlowResourceManager.uzm.get(o).add(e);
    }
  }
  static ZMm(t, e, o, r) {
    const a = UE.GameplayStatics.D_BeginDeferredActorSpawnFromClass(Global_1.Global.BaseCharacter, UE.KuroDestructibleActor.StaticClass(), e, 2);
    if (a?.IsValid()) {
      a.PlayEffectPostInitialized.Bind(e => {
        LevelFlowResourceManager.czm(a, e, t);
      });
      a.KuroDestructibleAsset = o;
      a.KuroDestructibleDestructionAsset = r;
      UE.GameplayStatics.D_FinishSpawningActor(a, e);
      return a;
    }
  }
  static OnTick(e) {
    this.TickHookEffect(e);
  }
  static OnTimeDilationChange() {
    this.Edm(Time_1.Time.TimeDilation);
  }
  static Release() {
    this.ReleaseAllSequence();
    this.Rpm();
    this.aTm();
  }
}
exports.LevelFlowResourceManager = LevelFlowResourceManager;
(_a = LevelFlowResourceManager).p1m = new Map();
LevelFlowResourceManager.O2_ = undefined;
LevelFlowResourceManager.v1m = new Map();
LevelFlowResourceManager.y1m = new Map();
LevelFlowResourceManager.rTm = new Map();
LevelFlowResourceManager.uzm = new Map();
LevelFlowResourceManager.nTm = new Map();
LevelFlowResourceManager.NQt = (e, t) => {
  var o = EffectSystem_1.EffectSystem.SpawnEffect(e, e.D_GetTransform(), t.EffectModelPath.toString(), "LevelFlowResourceManager.SpawnEffect");
  var r = EffectSystem_1.EffectSystem.GetEffectActor(o);
  if (t.AttachLocation || t.AttachRotation || t.AttachScale) {
    r?.K2_AttachToActor(e, t.Socket, t.AttachLocation ? 2 : 1, t.AttachRotation ? 2 : 1, t.AttachScale ? 2 : 1, false);
  }
  r?.K2_AddActorLocalTransform(t.Offset, false, undefined, false);
  return o;
};
LevelFlowResourceManager.sTm = (e, t, o, r) => {
  var a = _a.nTm.get(e);
  if (a?.IsValid()) {
    a.K2_DetachFromActor(1, 1, 1);
    AudioSystem_1.AudioSystem.PostEvent(DEFAULT_AK_EVENT_NAME, a);
  }
  var a = _a.rTm.get(e);
  if (a?.IsValid()) {
    ActorSystem_1.ActorSystem.Put("LevelFlowReleaseDestructibleRotateActor", a);
  }
  _a.rTm.delete(e);
  if (!!t && !!o && !!r && !(o <= 0) && !(r <= 0)) {
    if ((a = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(182)?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life)) && r < a) {
      ModelManager_1.ModelManager.LevelFlowModel.PushDynamicAction(new LevelFlowAddBuffAction_1.LevelFlowAddBuffAction().Init(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.Id, [o]));
    }
  }
}; //# sourceMappingURL=LevelFlowResourceManager.js.map