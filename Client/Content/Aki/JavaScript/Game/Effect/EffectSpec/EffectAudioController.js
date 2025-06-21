"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EffectAudioController = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SPECIAL_MAP_ID = 9300,
  SPECIAL_MAP_AUDIO_CD = 80,
  SPECIAL_MAP_EVENT_SPAWN_CD = 100,
  DELTA_TIME_INTERNAL = 25,
  PRELOAD_ACTOR_COUNT = 20,
  SPAWN_ACTOR_COUNT = 2;
class EffectAudioController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    for (let o = 0; o < PRELOAD_ACTOR_COUNT; o++) {
      var t = ActorSystem_1.ActorSystem.Get(UE.BP_EffectAudio_C.StaticClass(), EffectAudioController.S2c.ToUeTransform(), void 0);
      t && (t.bIsPermanentActor = !0, ActorSystem_1.ActorSystem.Put("特效音频播放Actor预创建回池", t))
    }
    return !0
  }
  static OnTick(o) {
    EffectAudioController.mie += o, EffectAudioController.mie < DELTA_TIME_INTERNAL || (EffectAudioController.mie = 0, EffectAudioController.M2c(), EffectAudioController.E2c())
  }
  static E2c() {
    if (0 !== EffectAudioController.I2c.size) {
      EffectAudioController.T2c.Start();
      for (const r of EffectAudioController.I2c) {
        var t = r[1];
        for (const f of t.EffectUidList) {
          var o = EffectAudioController.MQe.get(f);
          if (o && o.EffectActor?.IsValid()) {
            var o = o.EffectActor.D_K2_GetActorLocation(),
              e = new UE.Vector;
            if (e.Set(o.X, o.Y, o.Z), 0 === t.EffectModel.LocationOffsets.Num()) t.Locations.Add(e);
            else
              for (let o = 0; o < t.EffectModel.LocationOffsets.Num(); o++) t.Locations.Add(e.op_Addition(t.EffectModel.LocationOffsets.Get(o)))
          }
        }
        0 < t.Locations.Num() && (t.AkComponent.SetLocationOffsets(t.Locations), t.Locations.Empty())
      }
      EffectAudioController.T2c.Stop()
    }
  }
  static AddPlayEffectAudio(o, t, e, r) {
    var f = o.AudioEvent?.GetName();
    return !f || EffectAudioController.CheckSpecialInstanceDungeonEvent(f) || EffectAudioController.CheckHitEffectCooldownTime(e, f) || EffectAudioController.m81(f) ? 0 : (e = ++EffectAudioController.b2c, t = {
      ActorUid: 0,
      EffectActor: t
    }, EffectAudioController.L2c.set(e, t), EffectAudioController.w2c.set(e, {
      EffectModel: o,
      Priority: r
    }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] 加入待处理列表", ["EffectUid", e], ["AudioEvent", f]), e)
  }
  static OnStopEffectAudio(o, t) {
    var e, r;
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] Stop", ["EffectUid", o], ["Context", t]), EffectAudioController.L2c.has(o) ? (EffectAudioController.L2c.delete(o), EffectAudioController.w2c.delete(o), Log_1.Log.CheckWarn() && Log_1.Log.Warn("Audio", 42, "[EffectAudioCtrl] Audio还在待处理列表中就Stop了", ["EffectUid", o])) : EffectAudioController.MQe.has(o) ? (t = EffectAudioController.MQe.get(o).ActorUid, EffectAudioController.I2c.has(t) ? (e = EffectAudioController.I2c.get(t)).EffectModel?.IsValid() ? (e.EffectUidList.delete(o), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][维护AudioMap] - DeleteAudioItem", ["ActorUid", t], ["EffectUid", o], ["AudioEvent", e.EffectModel.AudioEvent?.GetName()], ["AudioCount", EffectAudioController.MQe.size - 1]), 0 === e.EffectUidList.size && (e.EffectModel.AudioEvent && (r = e.EffectModel.AudioEvent.GetName(), EffectAudioController.K6.has(r)) && EffectAudioController.K6.delete(r), EffectAudioController.gTt(e), EffectAudioController.R2c(e, e.Priority), EffectAudioController.I2c.delete(t)), EffectAudioController.MQe.delete(o)) : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] EffectModel无效", ["ActorUid", t], ["EffectUid", o]) : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] ActorInfoMap没有指定ActorUid", ["ActorUid", t], ["EffectUid", o])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] AudioInfoMap中不存在指定的Uid", ["EffectUid", o])
  }
  static CheckInSpecialInstanceDungeon() {
    return ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId === SPECIAL_MAP_ID
  }
  static CheckSpecialInstanceDungeonEvent(o) {
    if (ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId === SPECIAL_MAP_ID) {
      if (o.includes("play_role_com_imp_texture") || o.includes("play_enm_com_imp_texture")) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过音频", ["AudioEvent", o]), !0;
      if (o.includes("DA_Au_Role_Common_Imp_Texture")) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过特效DA", ["AudioEvent", o]), !0
    }
    return !1
  }
  static CheckHitEffectCooldownTime(o, t) {
    var e, r;
    return !(ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId !== SPECIAL_MAP_ID || !o || 1 === o) && ((r = (e = Time_1.Time.Now - (EffectAudioController.f81.get(o) ?? 0)) < SPECIAL_MAP_AUDIO_CD) ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip]跳过，受击音频CD中", ["HitEffectType", EffectAudioController.g81(o)], ["AudioEvent", t], ["Time", e]) : EffectAudioController.f81.set(o, Time_1.Time.Now), r)
  }
  static M2c() {
    if (0 !== EffectAudioController.L2c.size) {
      EffectAudioController.A2c.Start();
      for (const e of EffectAudioController.L2c) {
        var o = e[0],
          t = e[1];
        EffectAudioController.P2c(o, t)
      }
      for (const r of EffectAudioController.x2c) EffectAudioController.L2c.delete(r), EffectAudioController.w2c.delete(r);
      EffectAudioController.x2c.length = 0, EffectAudioController.U2c >= SPAWN_ACTOR_COUNT && 0 !== EffectAudioController.L2c.size && (EffectAudioController.mie = DELTA_TIME_INTERNAL), EffectAudioController.U2c = 0, EffectAudioController.D2c.clear(), EffectAudioController.B2c.clear(), EffectAudioController.A2c.Stop()
    }
  }
  static P2c(o, t) {
    var e, r, f;
    EffectAudioController.w2c.has(o) ? (e = EffectAudioController.w2c.get(o)).EffectModel.AudioEvent?.IsValid() ? EffectAudioController.U2c >= SPAWN_ACTOR_COUNT && EffectAudioController.k2c(e.EffectModel, e.Priority) ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] 本帧SpawnActor数量超额度,下一帧处理", ["EffectUid", o]) : (EffectAudioController.x2c.push(o), r = EffectAudioController.O2c(e.EffectModel, e.Priority), t.ActorUid = r, EffectAudioController.I2c.has(r) ? ((f = EffectAudioController.I2c.get(r)).EffectUidList.add(o), EffectAudioController.MQe.set(o, t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][维护AudioMap] ---- AddAudioItem", ["ActorUid", r], ["EffectUid", o], ["AudioEvent", f.EffectModel.AudioEvent?.GetName()], ["AudioCount", EffectAudioController.MQe.size])) : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 未能正常获取指定ActorInfo", ["ActorUid", r], ["EffectUid", o], ["AudioEvent", e.EffectModel.AudioEvent?.GetName()])) : EffectAudioController.x2c.push(o) : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] PendingEffectModelMap不含指定UID", ["EffectUid", o])
  }
  static k2c(o, t) {
    return 2 === t ? !EffectAudioController.B2c.has(o) : !EffectAudioController.D2c.has(o)
  }
  static O2c(o, t) {
    return 2 === t ? EffectAudioController.q2c(o, EffectAudioController.B2c, t) : EffectAudioController.q2c(o, EffectAudioController.D2c, t)
  }
  static q2c(o, t, e) {
    if (!t.has(o)) {
      EffectAudioController.U2c++;
      var r = EffectAudioController.G2c(o, e);
      if (!r) return Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 未能正常SpawnActor", ["AudioEvent", o.AudioEvent?.GetName()]), 0;
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][合批] -------------- SpawnActor", ["ActorUid", r.ActorUid], ["AudioEvent", o.AudioEvent?.GetName()], ["EffectActor", r.Actor?.GetName()], ["Priority", e], ["ActorMapCount", EffectAudioController.I2c.size + 1]), void 0 !== e && ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(e, r.Actor), t.set(o, r.ActorUid), EffectAudioController.I2c.set(r.ActorUid, r), o.AudioEvent && (e = o.AudioEvent.GetName(), EffectAudioController.K6.set(e, Time_1.Time.Now)), EffectAudioController.e0e(r, o, o.AudioEvent)
    }
    return t.get(o)
  }
  static G2c(o, t) {
    var e = ActorSystem_1.ActorSystem.Get(UE.BP_EffectAudio_C.StaticClass(), EffectAudioController.S2c.ToUeTransform(), void 0);
    if (e) {
      e.bIsPermanentActor = !0;
      var r = e.GetComponentByClass(UE.AkComponent.StaticClass());
      if (r) return {
        ActorUid: ++EffectAudioController.F2c,
        Actor: e,
        AkComponent: r,
        Locations: UE.NewArray(UE.Vector),
        EffectUidList: new Set,
        AudioHandle: 0,
        EffectModel: o,
        Priority: t
      };
      Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 获取AkComponent失败"), ActorSystem_1.ActorSystem.Put("获取AkComponent失败", e)
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "GetActor失败")
  }
  static R2c(o, t) {
    void 0 !== t && ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(0, o.Actor), o.AkComponent.SetComponentTickEnabled(!1), ActorSystem_1.ActorSystem.Put("特效音频播放完成Actor回池", o.Actor), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][合批] ------------ RecycleActor", ["ActorUid", o.ActorUid], ["AudioEvent", o.EffectModel.AudioEvent?.GetName()], ["ActorMapCount", EffectAudioController.I2c.size - 1])
  }
  static e0e(r, o, t, e = !1) {
    var f = r.AkComponent;
    if (f) {
      var i = t.GetName();
      if (f) {
        if (e) {
          if (t.IsInfinite) return void(Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] AudioEvent事件IsInfinite", ["ActorUid", r.ActorUid], ["AudioHandle", r.AudioHandle], ["EventName", i], ["EffectModel", o?.GetName()], ["EffectActor", r.Actor?.GetName()]));
          e = new UE.TransformDouble(f.D_K2_GetComponentLocation());
          AudioSystem_1.AudioSystem.PostEvent(i, e, {
            CallbackMask: 1,
            CallbackHandler: (o, t) => {
              if (r.AudioHandle || 0 === o)
                for (const e of r.EffectUidList) EffectAudioController.OnStopEffectAudio(e, "Callback")
            }
          })
        } else r.AudioHandle = AudioSystem_1.AudioSystem.PostEvent(i, f, {
          StopWhenOwnerDestroyed: !Info_1.Info.IsGameRunning(),
          CallbackMask: 1,
          CallbackHandler: (o, t) => {
            if (r.AudioHandle)
              for (const e of r.EffectUidList) EffectAudioController.OnStopEffectAudio(e, "Callback")
          }
        });
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Audio事件] ---------- PostEvent", ["ActorUid", r.ActorUid], ["AudioHandle", r.AudioHandle], ["EffectModel", o?.GetName()], ["EffectActor", r.Actor?.GetName()])
      }
    }
  }
  static gTt(o) {
    var t;
    0 !== o.AudioHandle && (o.EffectModel.KeepAlive || (AudioSystem_1.AudioSystem.ExecuteAction(o.AudioHandle, 0, {
      TransitionDuration: o.EffectModel.FadeOutTime,
      TransitionFadeCurve: o.EffectModel.FadeOutCurve
    }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Audio事件] ---------- StopEvent", ["ActorUid", o.ActorUid], ["AudioHandle", o.AudioHandle], ["EffectModel", o.EffectModel?.GetName()], ["EffectActor", o.Actor?.GetName()]), o.AudioHandle = 0), (t = o.EffectModel?.TrailingAudioEvent)?.IsValid()) && EffectAudioController.e0e(o, o.EffectModel, t, !0)
  }
  static m81(o) {
    var t = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId;
    if (t === SPECIAL_MAP_ID && EffectAudioController.K6.has(o)) return (t = Time_1.Time.Now - EffectAudioController.K6.get(o)) < SPECIAL_MAP_EVENT_SPAWN_CD && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过，音频事件Spawn处于CD中", ["AudioEvent", o], ["Time", t]), t < SPECIAL_MAP_EVENT_SPAWN_CD;
    return !1
  }
  static g81(o) {
    switch (o) {
      case 4:
        return "子弹的命中音效";
      case 3:
        return "受击音效";
      case 2:
        return "受击特效";
      default:
        return o.toString()
    }
  }
}(exports.EffectAudioController = EffectAudioController).IsTickEvenPausedInternal = !0, EffectAudioController.F2c = 0, EffectAudioController.b2c = 0, EffectAudioController.mie = 0, EffectAudioController.S2c = Transform_1.Transform.Create(Quat_1.Quat.Identity, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector), EffectAudioController.I2c = new Map, EffectAudioController.MQe = new Map, EffectAudioController.K6 = new Map, EffectAudioController.A2c = Stats_1.Stat.Create("EffectAudioController.HandlePendingMap"), EffectAudioController.T2c = Stats_1.Stat.Create("EffectAudioController.UpdateLocationOffsets"), EffectAudioController.L2c = new Map, EffectAudioController.w2c = new Map, EffectAudioController.f81 = new Map, EffectAudioController.D2c = new Map, EffectAudioController.B2c = new Map, EffectAudioController.x2c = [], EffectAudioController.U2c = 0;
//# sourceMappingURL=EffectAudioController.js.map