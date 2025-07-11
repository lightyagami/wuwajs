"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectAudioController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SPECIAL_MAP_ID = 9300;
const SPECIAL_MAP_AUDIO_CD = 80;
const SPECIAL_MAP_EVENT_SPAWN_CD = 100;
const DELTA_TIME_INTERVAL = 25;
const PRELOAD_ACTOR_COUNT = 20;
const SPAWN_ACTOR_COUNT = 2;
class EffectAudioController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    for (let o = 0; o < PRELOAD_ACTOR_COUNT; o++) {
      var t = ActorSystem_1.ActorSystem.Get(UE.BP_EffectAudio_C.StaticClass(), EffectAudioController.S2c.ToUeTransform(), undefined);
      if (t) {
        t.bIsPermanentActor = true;
        ActorSystem_1.ActorSystem.Put("特效音频播放Actor预创建回池", t);
      }
    }
    return true;
  }
  static OnTick(o) {
    EffectAudioController.mie += o * (ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1);
    if (!(EffectAudioController.mie < DELTA_TIME_INTERVAL)) {
      EffectAudioController.mie = 0;
      EffectAudioController.M2c();
      EffectAudioController.E2c();
    }
  }
  static E2c() {
    if (EffectAudioController.I2c.size !== 0) {
      EffectAudioController.T2c.Start();
      for (const r of EffectAudioController.I2c) {
        var t = r[1];
        for (const f of t.EffectUidList) {
          var o = EffectAudioController.MQe.get(f);
          if (o && o.EffectActor?.IsValid()) {
            var o = o.EffectActor.D_K2_GetActorLocation();
            var e = new UE.Vector();
            e.Set(o.X, o.Y, o.Z);
            if (t.EffectModel.LocationOffsets.Num() === 0) {
              t.Locations.Add(e);
            } else {
              for (let o = 0; o < t.EffectModel.LocationOffsets.Num(); o++) {
                t.Locations.Add(e.op_Addition(t.EffectModel.LocationOffsets.Get(o)));
              }
            }
          }
        }
        if (t.Locations.Num() > 0) {
          t.AkComponent.SetLocationOffsets(t.Locations);
          t.Locations.Empty();
        }
      }
      EffectAudioController.T2c.Stop();
    }
  }
  static AddPlayEffectAudio(o, t, e, r) {
    var f = o.AudioEvent?.GetName();
    if (!f || EffectAudioController.CheckSpecialInstanceDungeonEvent(f) || EffectAudioController.CheckHitEffectCooldownTime(e, f) || EffectAudioController.X81(f)) {
      return 0;
    } else {
      e = ++EffectAudioController.b2c;
      t = {
        ActorUid: 0,
        EffectActor: t
      };
      EffectAudioController.L2c.set(e, t);
      EffectAudioController.w2c.set(e, {
        EffectModel: o,
        Priority: r
      });
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] 加入待处理列表", ["EffectUid", e], ["AudioEvent", f]);
      }
      return e;
    }
  }
  static OnStopEffectAudio(o, t) {
    var e;
    var r;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] Stop", ["EffectUid", o], ["Context", t]);
    }
    if (EffectAudioController.L2c.has(o)) {
      EffectAudioController.L2c.delete(o);
      EffectAudioController.w2c.delete(o);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 42, "[EffectAudioCtrl] Audio还在待处理列表中就Stop了", ["EffectUid", o]);
      }
    } else if (EffectAudioController.MQe.has(o)) {
      t = EffectAudioController.MQe.get(o).ActorUid;
      if (EffectAudioController.I2c.has(t)) {
        if ((e = EffectAudioController.I2c.get(t)).EffectModel?.IsValid()) {
          e.EffectUidList.delete(o);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][维护AudioMap] - DeleteAudioItem", ["ActorUid", t], ["EffectUid", o], ["AudioEvent", e.EffectModel.AudioEvent?.GetName()], ["AudioCount", EffectAudioController.MQe.size - 1]);
          }
          if (e.EffectUidList.size === 0) {
            if (e.EffectModel.AudioEvent && (r = e.EffectModel.AudioEvent.GetName(), EffectAudioController.K6.has(r))) {
              EffectAudioController.K6.delete(r);
            }
            EffectAudioController.gTt(e);
            EffectAudioController.R2c(e, e.Priority);
            EffectAudioController.I2c.delete(t);
          }
          EffectAudioController.MQe.delete(o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] EffectModel无效", ["ActorUid", t], ["EffectUid", o]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] ActorInfoMap没有指定ActorUid", ["ActorUid", t], ["EffectUid", o]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] AudioInfoMap中不存在指定的Uid", ["EffectUid", o]);
    }
  }
  static CheckInSpecialInstanceDungeon() {
    return ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId === SPECIAL_MAP_ID;
  }
  static CheckSpecialInstanceDungeonEvent(o) {
    if (ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId === SPECIAL_MAP_ID) {
      if (o.includes("play_role_com_imp_texture") || o.includes("play_enm_com_imp_texture")) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过音频", ["AudioEvent", o]);
        }
        return true;
      }
      if (o.includes("DA_Au_Role_Common_Imp_Texture")) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过特效DA", ["AudioEvent", o]);
        }
        return true;
      }
    }
    return false;
  }
  static CheckHitEffectCooldownTime(o, t) {
    var e;
    var r;
    return ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId === SPECIAL_MAP_ID && !!o && o !== 1 && ((r = (e = Time_1.Time.Now - (EffectAudioController.Y81.get(o) ?? 0)) < SPECIAL_MAP_AUDIO_CD) ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip]跳过，受击音频CD中", ["HitEffectType", EffectAudioController.z81(o)], ["AudioEvent", t], ["Time", e]) : EffectAudioController.Y81.set(o, Time_1.Time.Now), r);
  }
  static M2c() {
    if (EffectAudioController.L2c.size !== 0) {
      EffectAudioController.A2c.Start();
      for (const e of EffectAudioController.L2c) {
        var o = e[0];
        var t = e[1];
        EffectAudioController.P2c(o, t);
      }
      for (const r of EffectAudioController.x2c) {
        EffectAudioController.L2c.delete(r);
        EffectAudioController.w2c.delete(r);
      }
      EffectAudioController.x2c.length = 0;
      if (EffectAudioController.U2c >= SPAWN_ACTOR_COUNT && EffectAudioController.L2c.size !== 0) {
        EffectAudioController.mie = DELTA_TIME_INTERVAL;
      }
      EffectAudioController.U2c = 0;
      EffectAudioController.D2c.clear();
      EffectAudioController.B2c.clear();
      EffectAudioController.A2c.Stop();
    }
  }
  static P2c(o, t) {
    var e;
    var r;
    var f;
    if (EffectAudioController.w2c.has(o)) {
      if ((e = EffectAudioController.w2c.get(o)).EffectModel.AudioEvent?.IsValid()) {
        if (EffectAudioController.U2c >= SPAWN_ACTOR_COUNT && EffectAudioController.k2c(e.EffectModel, e.Priority)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl] 本帧SpawnActor数量超额度,下一帧处理", ["EffectUid", o]);
          }
        } else {
          EffectAudioController.x2c.push(o);
          r = EffectAudioController.O2c(e.EffectModel, e.Priority);
          t.ActorUid = r;
          if (EffectAudioController.I2c.has(r)) {
            (f = EffectAudioController.I2c.get(r)).EffectUidList.add(o);
            EffectAudioController.MQe.set(o, t);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][维护AudioMap] ---- AddAudioItem", ["ActorUid", r], ["EffectUid", o], ["AudioEvent", f.EffectModel.AudioEvent?.GetName()], ["AudioCount", EffectAudioController.MQe.size]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 未能正常获取指定ActorInfo", ["ActorUid", r], ["EffectUid", o], ["AudioEvent", e.EffectModel.AudioEvent?.GetName()]);
          }
        }
      } else {
        EffectAudioController.x2c.push(o);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] PendingEffectModelMap不含指定UID", ["EffectUid", o]);
    }
  }
  static k2c(o, t) {
    if (t === 2) {
      return !EffectAudioController.B2c.has(o);
    } else {
      return !EffectAudioController.D2c.has(o);
    }
  }
  static O2c(o, t) {
    if (t === 2) {
      return EffectAudioController.q2c(o, EffectAudioController.B2c, t);
    } else {
      return EffectAudioController.q2c(o, EffectAudioController.D2c, t);
    }
  }
  static q2c(o, t, e) {
    if (!t.has(o)) {
      EffectAudioController.U2c++;
      var r = EffectAudioController.G2c(o, e);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 未能正常SpawnActor", ["AudioEvent", o.AudioEvent?.GetName()]);
        }
        return 0;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][合批] -------------- SpawnActor", ["ActorUid", r.ActorUid], ["AudioEvent", o.AudioEvent?.GetName()], ["EffectActor", r.Actor?.GetName()], ["Priority", e], ["ActorMapCount", EffectAudioController.I2c.size + 1]);
      }
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(e, r.Actor);
      }
      t.set(o, r.ActorUid);
      EffectAudioController.I2c.set(r.ActorUid, r);
      if (o.AudioEvent) {
        e = o.AudioEvent.GetName();
        EffectAudioController.K6.set(e, Time_1.Time.Now);
      }
      EffectAudioController.e0e(r, o, o.AudioEvent);
    }
    return t.get(o);
  }
  static G2c(o, t) {
    var e = ActorSystem_1.ActorSystem.Get(UE.BP_EffectAudio_C.StaticClass(), EffectAudioController.S2c.ToUeTransform(), undefined);
    if (e) {
      e.bIsPermanentActor = true;
      var r = e.GetComponentByClass(UE.AkComponent.StaticClass());
      if (r) {
        return {
          ActorUid: ++EffectAudioController.F2c,
          Actor: e,
          AkComponent: r,
          Locations: UE.NewArray(UE.Vector),
          EffectUidList: new Set(),
          AudioHandle: 0,
          EffectModel: o,
          Priority: t
        };
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 获取AkComponent失败");
      }
      ActorSystem_1.ActorSystem.Put("获取AkComponent失败", e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "GetActor失败");
    }
  }
  static R2c(o, t) {
    if (t !== undefined) {
      ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(0, o.Actor);
    }
    o.AkComponent.SetComponentTickEnabled(false);
    ActorSystem_1.ActorSystem.Put("特效音频播放完成Actor回池", o.Actor);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][合批] ------------ RecycleActor", ["ActorUid", o.ActorUid], ["AudioEvent", o.EffectModel.AudioEvent?.GetName()], ["ActorMapCount", EffectAudioController.I2c.size - 1]);
    }
  }
  static e0e(r, o, t, e = false) {
    var f = r.AkComponent;
    if (f) {
      var i = t.GetName();
      if (f) {
        if (e) {
          if (t.IsInfinite) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] AudioEvent事件IsInfinite", ["ActorUid", r.ActorUid], ["AudioHandle", r.AudioHandle], ["EventName", i], ["EffectModel", o?.GetName()], ["EffectActor", r.Actor?.GetName()]);
            }
            return;
          }
          e = new UE.TransformDouble(f.D_K2_GetComponentLocation());
          AudioSystem_1.AudioSystem.PostEvent(i, e, {
            CallbackMask: 1,
            CallbackHandler: (o, t) => {
              if (r.AudioHandle || o === 0) {
                for (const e of r.EffectUidList) {
                  EffectAudioController.OnStopEffectAudio(e, "Callback");
                }
              }
            }
          });
        } else {
          r.AudioHandle = AudioSystem_1.AudioSystem.PostEvent(i, f, {
            StopWhenOwnerDestroyed: !Info_1.Info.IsGameRunning(),
            CallbackMask: 1,
            CallbackHandler: (o, t) => {
              if (r.AudioHandle) {
                for (const e of r.EffectUidList) {
                  EffectAudioController.OnStopEffectAudio(e, "Callback");
                }
              }
            }
          });
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Audio事件] ---------- PostEvent", ["ActorUid", r.ActorUid], ["AudioHandle", r.AudioHandle], ["EffectModel", o?.GetName()], ["EffectActor", r.Actor?.GetName()]);
        }
      }
    }
  }
  static gTt(o) {
    var t;
    if (o.AudioHandle !== 0 && (o.EffectModel.KeepAlive || (AudioSystem_1.AudioSystem.ExecuteAction(o.AudioHandle, 0, {
      TransitionDuration: o.EffectModel.FadeOutTime,
      TransitionFadeCurve: o.EffectModel.FadeOutCurve
    }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Audio事件] ---------- StopEvent", ["ActorUid", o.ActorUid], ["AudioHandle", o.AudioHandle], ["EffectModel", o.EffectModel?.GetName()], ["EffectActor", o.Actor?.GetName()]), o.AudioHandle = 0), (t = o.EffectModel?.TrailingAudioEvent)?.IsValid())) {
      EffectAudioController.e0e(o, o.EffectModel, t, true);
    }
  }
  static X81(o) {
    var t = ModelManager_1.ModelManager.GameModeModel?.InstanceDungeon?.MapConfigId;
    if (t === SPECIAL_MAP_ID && EffectAudioController.K6.has(o)) {
      if ((t = Time_1.Time.Now - EffectAudioController.K6.get(o)) < SPECIAL_MAP_EVENT_SPAWN_CD && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EffectAudioCtrl][Skip] 跳过，音频事件Spawn处于CD中", ["AudioEvent", o], ["Time", t]);
      }
      return t < SPECIAL_MAP_EVENT_SPAWN_CD;
    }
    return false;
  }
  static z81(o) {
    switch (o) {
      case 4:
        return "子弹的命中音效";
      case 3:
        return "受击音效";
      case 2:
        return "受击特效";
      default:
        return o.toString();
    }
  }
}
(exports.EffectAudioController = EffectAudioController).IsTickEvenPausedInternal = true;
EffectAudioController.F2c = 0;
EffectAudioController.b2c = 0;
EffectAudioController.mie = 0;
EffectAudioController.S2c = Transform_1.Transform.Create(Quat_1.Quat.Identity, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector);
EffectAudioController.I2c = new Map();
EffectAudioController.MQe = new Map();
EffectAudioController.K6 = new Map();
EffectAudioController.A2c = Stats_1.Stat.Create("EffectAudioController.HandlePendingMap");
EffectAudioController.T2c = Stats_1.Stat.Create("EffectAudioController.UpdateLocationOffsets");
EffectAudioController.L2c = new Map();
EffectAudioController.w2c = new Map();
EffectAudioController.Y81 = new Map();
EffectAudioController.D2c = new Map();
EffectAudioController.B2c = new Map();
EffectAudioController.x2c = [];
EffectAudioController.U2c = 0; //# sourceMappingURL=EffectAudioController.js.map